import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { uatEmails } from './uatEmails'
import { union, xor } from 'lodash'
import * as crypto from 'crypto'
import { Request } from 'firebase-functions/v1/https'
import { shopifyOrders } from './shopifyOrders'

admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

const secrets = functions.config().doppler

export interface UserData {
  _id: string
  email: string
  displayName: string
  photoURL: string | null
  emailVerified: boolean
  products?: string[]
}

function isSimilarArray(a: string[], b: string[]) {
  return a.length === b.length && xor(a, b).length === 0
}

export const getPurchases = functions.https.onCall(async (data, context) => {
  const uid = context?.auth?.uid
  if (uid == null) return { message: 'Bad input' }
  const userDoc = db.doc(`users/${uid}`)
  if (userDoc == null) return { message: 'User not found' }
  const userData = await userDoc.get()
  const user = userData.data() as UserData
  // don't bother if they already have everything
  if (!user.products?.includes('ultimate-ableton-templates')) {
    const result = user.products ?? []
    // check clickfunnels data
    if (uatEmails.includes(user.email))
      result.push('ultimate-ableton-templates')
    if (isSimilarArray(result, user.products ?? []))
      userDoc.set({ products: result }, { merge: true })
  }
  return { message: 'ok', user }
})

export const refreshClickfunnelOrders = functions.https.onCall(
  async (data, context) => {
    const callerEmail = context?.auth?.token.email
    if (callerEmail !== 'dj.mikeallison@gmail.com')
      return { message: 'Bad input' }
    for (let i = 0; i < uatEmails.length; i++) {
      const email = uatEmails[i]
      await addToOrder(email, ['ultimate-ableton-templates'])
    }
    return { message: 'ok' }
  }
)

async function addToOrder(email: string, products: string[]) {
  let orderRef = db.doc(`orders/${email}`)
  if (orderRef == null) {
    db.collection('orders').doc(email).set({ products })
    return
  }
  const orderData = await orderRef.get()
  const order = orderData.data()
  const existingProducts = order?.products ?? []
  const result = union(existingProducts, products)
  if (!isSimilarArray(result, existingProducts))
    orderRef.set({ products: result }, { merge: true })
}

export const refreshShopifyOrders = functions.https.onCall(
  async (data, context) => {
    const callerEmail = context?.auth?.token.email
    if (callerEmail !== 'dj.mikeallison@gmail.com')
      return { message: 'Bad input' }
    for (let key in shopifyOrders) {
      await addToOrder(key, shopifyOrders[key])
    }
    return { message: 'ok' }
  }
)

function verifyShopify(hmacHeader: string, req: Request): boolean {
  let computedHash = crypto
    .createHmac('sha256', secrets.SHOPIFY_WEBHOOK_HMAC)
    .update(req.rawBody)
    .digest('base64')
  return crypto.timingSafeEqual(
    Buffer.from(computedHash, 'base64'),
    Buffer.from(hmacHeader, 'base64')
  )
}
export const shopifyOrderWebhook = functions.https.onRequest(
  async (req, res) => {
    let hmacHeader = req.get('X-Shopify-Hmac-Sha256') as string
    if (verifyShopify(hmacHeader, req)) {
      const { body } = req
      if (body?.contact_email && body?.line_items?.length > 0) {
        addToOrder(
          body.contact_email,
          body.line_items.map((item: any) => item.sku)
        )
      }
      res.status(200).send('ok')
    } else {
      res.status(403).end()
    }
  }
)

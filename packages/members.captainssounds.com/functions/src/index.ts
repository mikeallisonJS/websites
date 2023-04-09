import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { uatEmails } from './uat-emails'
import { union, xor } from 'lodash'
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api'
import * as crypto from 'crypto'

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

interface OrderData {
  _id: string
  products: string[]
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
  (data, context) => {
    const callerEmail = context?.auth?.token.email
    if (callerEmail !== 'dj.mikeallison@gmail.com')
      return { message: 'Bad input' }
    uatEmails.forEach((email) => {
      console.log(email)
      addToOrder(email, ['ultimate-ableton-templates'])
    })
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
  const order = orderData.data() as OrderData
  const result = union(order?.products ?? [], products)
  if (!isSimilarArray(result, order.products ?? []))
    orderRef.set({ products: result }, { merge: true })
}

export const refreshShopifyOrders = functions.https.onCall(
  async (data, context) => {
    const callerEmail = context?.auth?.token.email
    if (callerEmail !== 'dj.mikeallison@gmail.com')
      return { message: 'Bad input' }
    const shopify = shopifyApi({
      // The next 4 values are typically read from environment variables for added security
      apiKey: secrets.SHOPIFY_ADMIN_API_KEY,
      apiSecretKey: secrets.SHOPIFY_ADMIN_API_SECRET,
      scopes: ['read_orders'],
      hostName: 'captain-productions.myshopify.com',
      apiVersion: LATEST_API_VERSION,
      isEmbeddedApp: false
    })
    let pageInfo: any = true
    do {
      const orders: any = await shopify.rest.Order.list({
        ...pageInfo?.nextPage?.query,
        api_version: LATEST_API_VERSION,
        limit: 250,
        fields: ['contact_email', 'line_items']
      })
      orders.forEach((order: any) => {
        if (order?.contact_email && order?.line_items?.length > 0) {
          addToOrder(
            order.contact_email,
            order.line_items.map((item: any) => item.sku)
          )
        }

        pageInfo = orders.pageInfo
      })
    } while (pageInfo?.nextPage)
    return { message: 'ok' }
  }
)

export const shopifyOrderWebhook = functions.https.onRequest(
  async (req, res) => {
    let hmacHeader = req.get('X-Shopify-Hmac-Sha256') as string
    let computedHash = crypto
      .createHmac('sha256', secrets.SHOPIFY_ADMIN_API_SECRET)
      .update(req.rawBody)
      .digest('base64')
    if (
      crypto.timingSafeEqual(
        Buffer.from(computedHash, 'base64'),
        Buffer.from(hmacHeader, 'base64')
      )
    ) {
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

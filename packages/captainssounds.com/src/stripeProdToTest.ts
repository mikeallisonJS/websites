// Replace with your own Stripe keys
// Using Stripe.js library (https://github.com/stripe/stripe-js)
const Stripe = require('stripe')

const stripeLiveSecretKey = process.env.PROD_STRIPE_SECRET_KEY as string
const stripeTestSecretKey = process.env.STRIPE_SECRET_KEY as string
const stripeLiveInstance = new Stripe(stripeLiveSecretKey)
const stripeTestInstance = new Stripe(stripeTestSecretKey)

const isEmptyValue = (obj: any, key: string) =>
  [null, '', undefined].includes(obj[key])
const deleteIfEmpty = (obj: any, key: string) => {
  if (isEmptyValue(obj, key)) delete obj[key]
}
const deleteAllIfEmpty = (obj: any, keys: string[]) =>
  keys.forEach((k) => deleteIfEmpty(obj, k))

async function stripeCopyLiveToTest(stripeProd: any, stripeTest: any) {
  const productMapping: Record<string, string> = {}

  try {
    const products = await stripeProd.products.list({ limit: 100 })

    for (const product of products.data) {
      // Check if the product already exists in the test environment
      let testProduct
      try {
        testProduct = await stripeTest.products.retrieve(product.id)
        console.log(`Product already exists: ${testProduct.id}`)
      } catch (error) {
        // Product does not exist, create it
        const productData = { ...product }
        delete productData.livemode
        delete productData.object
        delete productData.created
        delete productData.updated
        delete productData.default_price
        // update according to your products!
        deleteAllIfEmpty(productData, [
          'shippable',
          'url',
          'package_dimensions',
          'unit_label',
          'description'
        ])
        testProduct = await stripeTest.products.create(productData)
        console.log(`Created Product: ${testProduct.id}`)
      }
      productMapping[product.id] = testProduct.id
    }
  } catch (error) {
    console.error(error)
    return `Error copying products: ${error}`
  }

  // try {
  //   const plans = await stripeProd.plans.list({
  //     limit: 100,
  //     expand: ['data.tiers']
  //   })

  //   for (const plan of plans.data) {
  //     // Check if the plan already exists in the test environment
  //     try {
  //       const testPlan = await stripeTest.plans.retrieve(plan.id)
  //       console.log(`Plan already exists: ${testPlan.id}`)
  //     } catch (error) {
  //       // Plan does not exist, create it
  //       const planData = { ...plan }
  //       deleteIfEmpty(planData, 'amount')
  //       deleteIfEmpty(planData, 'amount_decimal')
  //       if (
  //         planData.hasOwnProperty('amount') &&
  //         planData.hasOwnProperty('amount_decimal')
  //       ) {
  //         delete planData.amount
  //       }
  //       delete planData.livemode
  //       delete planData.object
  //       delete planData.created
  //       delete planData.updated
  //       // update according to your plans!
  //       deleteAllIfEmpty(planData, [
  //         'trial_period_days',
  //         'meter',
  //         'tiers_mode',
  //         'aggregate_usage',
  //         'transform_usage',
  //         'nickname'
  //       ])

  //       if (
  //         planData.hasOwnProperty('tiers') &&
  //         planData.tiers &&
  //         planData.tiers.length > 0
  //       ) {
  //         planData.tiers.forEach((tier: any) => {
  //           deleteIfEmpty(tier, 'unit_amount')
  //           deleteIfEmpty(tier, 'unit_amount_decimal')
  //           if (
  //             tier.hasOwnProperty('unit_amount') &&
  //             tier.hasOwnProperty('unit_amount_decimal')
  //           ) {
  //             delete tier.unit_amount
  //           }

  //           deleteIfEmpty(tier, 'flat_amount')
  //           deleteIfEmpty(tier, 'flat_amount_decimal')
  //           if (
  //             tier.hasOwnProperty('flat_amount') &&
  //             tier.hasOwnProperty('flat_amount_decimal')
  //           ) {
  //             delete tier.flat_amount
  //           }

  //           if (isEmptyValue(tier, 'up_to')) tier.up_to = 'inf'
  //         })
  //       }

  //       planData.product = productMapping[plan.product]
  //       const testPlan = await stripeTest.plans.create(planData)
  //       console.log(`Created Plan: ${testPlan.id}`)
  //     }
  //   }
  // } catch (error) {
  //   console.error(error)
  //   return `Error copying plans: ${error}`
  // }

  try {
    const prices = await stripeProd.prices.list({ limit: 100 })

    for (const price of prices.data) {
      // Ensure the product for this price was copied to the test environment
      if (productMapping.hasOwnProperty(price.product)) {
        const testProductId = productMapping[price.product]

        // Retrieve all prices for the test product to check for existence
        const testPrices = await stripeTest.prices.list({
          product: testProductId,
          limit: 100
        })
        let priceExists = false

        for (const testPrice of testPrices.data) {
          // Compare relevant attributes to determine if the price already exists
          if (
            testPrice.unit_amount === price.unit_amount &&
            testPrice.currency === price.currency
          ) {
            console.log(
              `Price already exists for product ${testProductId}: ${testPrice.id}`
            )
            priceExists = true
            break
          }
        }

        if (!priceExists) {
          // Price does not exist, create it
          const priceData = { ...price }
          deleteIfEmpty(priceData, 'unit_amount')
          deleteIfEmpty(priceData, 'unit_amount_decimal')
          if (
            priceData.hasOwnProperty('unit_amount') &&
            priceData.hasOwnProperty('unit_amount_decimal')
          ) {
            delete priceData.unit_amount
          }
          delete priceData.id
          delete priceData.type
          delete priceData.livemode
          delete priceData.object
          delete priceData.created
          delete priceData.updated
          deleteIfEmpty(priceData, 'custom_unit_amount')
          deleteIfEmpty(priceData, 'tiers_mode')
          deleteIfEmpty(priceData, 'transform_quantity')
          deleteIfEmpty(priceData, 'recurring')
          if (priceData.custom_unit_amount != null) {
            deleteIfEmpty(priceData.custom_unit_amount, 'minimum')
            deleteIfEmpty(priceData.custom_unit_amount, 'maximum')
            priceData.custom_unit_amount.enabled = true
          }
          // Ensure the product ID is mapped to the test environment's product ID
          priceData.product = testProductId
          const testPrice = await stripeTest.prices.create(priceData)
          console.log(
            `Created Price: ${testPrice.id} for Product: ${testProductId}`
          )
        }
      }
    }
  } catch (error: any) {
    console.error(error)
    return `Error copying prices: ${error.message}`
  }

  return 'Products, plans, and prices copied successfully.'
}

stripeCopyLiveToTest(stripeLiveInstance, stripeTestInstance)
  .then(console.log)
  .catch(console.error)

// import * as functions from 'firebase-functions'
// import fetch from 'node-fetch'
// import * as cors from 'cors'

// const corsHelper = cors({ origin: 'https://offer.captainssounds.com' })

// export const aweberSignUp = functions.https.onRequest((request, response) => {
//   corsHelper(request, response, () => {
//     const { name, email } = request.body
//     fetch('https://www.aweber.com/scripts/addlead.pl', {
//       method: 'POST',
//       body: JSON.stringify({
//         name,
//         email,
//         listname: 'awlist5507214',
//         meta_required: 'name,email'
//       })
//     }).then((result) => {
//       if (result.ok) {
//         response.send({ result: true })
//       } else {
//         response.send({ result: false })
//       }
//     })
//   })
// })

import * as functions from 'firebase-functions'
import fetch from 'node-fetch'

export const aweberSignUp = functions.https.onRequest((request, response) => {
  const { name, email } = request.body
  fetch('https://www.aweber.com/scripts/addlead.pl', {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      listname: 'captainssounds'
    })
  }).then((result) => {
    if (result.ok) {
      response.send(true)
    } else {
      response.send(false)
    }
  })
})

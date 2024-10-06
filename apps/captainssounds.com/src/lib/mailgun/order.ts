import formData from 'form-data'
import Mailgun from 'mailgun.js'
const mailgun = new Mailgun(formData)
import { render } from '@react-email/render'
import OrderSuccess from '../../emails/orderSuccess'
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY as string
})

interface sendEmailProps {
  firstName: string
  email: string
  productDownloads: Array<{
    name: string
    url: string
  }>
}

export async function sendEmail({
  firstName,
  email,
  productDownloads
}: sendEmailProps) {
  const html = await render(
    OrderSuccess({
      firstName,
      email,
      productDownloads
    }),
    {
      pretty: true
    }
  )

  const text = await render(
    OrderSuccess({
      firstName,
      email,
      productDownloads
    }),
    {
      plainText: true
    }
  )
  mg.messages
    .create('orders.captainssounds.com', {
      from: 'Captain <captain@orders.captainssounds.com>',
      to: [email],
      subject: `${firstName}, thank you for your purchase. Here are your download links.`,
      text,
      html
    })
    .then((msg) => console.log(msg)) // logs response data
    .catch((err) => console.log(err)) // logs any error
}

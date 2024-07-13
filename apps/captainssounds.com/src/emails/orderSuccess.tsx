import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text
} from '@react-email/components'
import * as React from 'react'

interface OrderSuccessProps {
  email?: string
  firstName?: string
  productDownloads: Array<{
    name: string
    url: string
  }>
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://captainssounds.com'

export const OrderSuccess = ({
  firstName,
  productDownloads
}: OrderSuccessProps) => {
  const previewText =
    'Thank you for your purchase. Here are your download links.'

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/images/cpt-border.png`}
                width="300"
                height="130"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              {firstName}, thank you so much for your purchase!
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Here are links to your available downloads.
            </Text>
            <Section>
              {productDownloads.map((productDownload, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <Row key={index}>
                  <Column>
                    <Link href={productDownload.url} className="no-underline">
                      {productDownload.name}
                    </Link>
                  </Column>
                </Row>
              ))}
            </Section>
            <Text>
              If you ever need to access your downloads again, you can find the
              latest download links at{' '}
              <Link href={`${baseUrl}/  user/orders`}>
                {baseUrl}/user/orders
              </Link>
            </Text>
            <Text>
              If you have any questions, please don't hesitate to reach out to
              us at{' '}
              <Link href="mailto:info@captainssounds.com">
                info@captainssounds.com
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

OrderSuccess.PreviewProps = {
  firstName: 'Mike',
  email: 'mike@captainofbass.com',
  productDownloads: [
    {
      name: 'Download 1',
      url: 'https://captainssounds.com/download1.zip'
    },
    {
      name: 'Download 2',
      url: 'https://captainssounds.com/download2.zip'
    }
  ]
} as OrderSuccessProps

export default OrderSuccess

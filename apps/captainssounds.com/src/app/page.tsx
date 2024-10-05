import { PageContainer } from '@mikeallisonjs/shared-react-components'
import Link from 'next/link'

export const runtime = 'edge'

export const metadata = {
  openGraph: {
    type: 'website'
  }
}

export default async function HomePage() {
  return (
    <PageContainer>
      <div className="mx-auto flex max-w-screen-2xl flex-col  pb-4 text-black dark:text-white">
        <h1>Shop offline for rebuild.</h1>
        <h2>Some products are available on gumroad in the meantime.</h2>
        <h1>
          <Link href="captainofbass.gumroad.com">Gumroad Store</Link>
        </h1>
      </div>
      <div>
        <h1>Existing user downloads available here:</h1>
        <h2>(login in the top right first)</h2>
        <h2>
          <Link href="/user/orders">Downloads</Link>
        </h2>
      </div>
    </PageContainer>
  )
}

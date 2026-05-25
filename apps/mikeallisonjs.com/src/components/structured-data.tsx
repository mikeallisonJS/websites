/**
 * Emits a JSON-LD <script> for Schema.org structured data. Search engines and
 * AI answer engines use this to understand Mike as an entity (Person), his
 * work (CreativeWork), and articles (BlogPosting) rather than guessing from
 * prose. Render one per schema; multiples on a page are fine.
 */
export function JsonLd({
  data
}: {
  data: Record<string, unknown> | Record<string, unknown>[]
}) {
  return (
    <script
      type="application/ld+json"
      // Content is built from our own typed data, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

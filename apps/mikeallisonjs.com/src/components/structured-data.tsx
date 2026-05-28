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
      // Content is built from our own typed data, but still escape `<` (so a
      // stray `</script>` can't break out of the tag) and the U+2028/U+2029
      // line separators.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
          .replace(/</g, '\\u003c')
          .replace(new RegExp(String.fromCharCode(0x2028), 'g'), '\\u2028')
          .replace(new RegExp(String.fromCharCode(0x2029), 'g'), '\\u2029')
      }}
    />
  )
}

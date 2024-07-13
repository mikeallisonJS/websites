import type { Connection } from './types'

export const removeEdgesAndNodes = (array: Connection<unknown>) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return array.edges.map((edge: any) => edge?.node)
}

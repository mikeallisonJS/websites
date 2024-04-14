import { Connection } from './types'

export const removeEdgesAndNodes = (array: Connection<any>): any => {
  return array.edges.map((edge: any) => edge?.node)
}

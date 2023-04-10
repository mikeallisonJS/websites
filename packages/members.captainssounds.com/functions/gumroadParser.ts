import * as Papa from 'papaparse'
const fs = require('fs')
import { union } from 'lodash'

const results: Record<string, string[]> = {}

function step(result: { data: [string, string] }) {
  return results.hasOwnProperty(result.data[0])
    ? (results[result.data[0]] = union(results[result.data[0]], [
        result.data[1]
      ]))
    : (results[result.data[0]] = [result.data[1]])
}

const file = fs.createReadStream('./gumroad-sales.csv')
Papa.parse(file, {
  step,
  complete: function () {
    fs.writeFile('./src/gumroadSales.json', JSON.stringify(results), () => {
      console.log('done')
    })
  }
})

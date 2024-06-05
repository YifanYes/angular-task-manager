/**
 * Apply given transformer for each element on the data array
 *
 * @param data Array of data
 * @param transformer Transformer
 * @returns Array of transformed data
 */
const getCollection = (data: any[], transformer: any): any[] =>
  data.map((element: any) => transformer(element))

const TransformerHelper = {
  getCollection,
}

export default TransformerHelper

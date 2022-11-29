export function formatCurrency(number: number, currency: string) {
  let options = { currency, style: 'currency'}
  console.log("options: ", options)
  return new Intl.NumberFormat(undefined, options).format(number)
}

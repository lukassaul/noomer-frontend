export function formatCurrency(number: number, currency: string) {
  let options = { currency, style: 'currency'}
  return new Intl.NumberFormat(undefined, options).format(number)
}

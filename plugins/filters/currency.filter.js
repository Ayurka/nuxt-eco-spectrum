export default function currencyFilter (value, currency = 'RUB') {
  return new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(value)
}

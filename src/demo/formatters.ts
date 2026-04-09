export const SEEDED_BALANCE_DISPLAY = '3 469.52 ЦР'

function addThousandsSeparators(value: string) {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function formatDecimalValue(value: number, fractionDigits: number) {
  const [integerPart, fractionalPart] = value.toFixed(fractionDigits).split('.')
  const groupedIntegerPart = addThousandsSeparators(integerPart)

  if (!fractionalPart) {
    return groupedIntegerPart
  }

  return `${groupedIntegerPart}.${fractionalPart}`
}

export function formatAmountWithCurrency(value: number, currencyLabel: string) {
  return `${formatDecimalValue(value, 2)} ${currencyLabel}`
}

export function formatRateValue(value: number) {
  return formatDecimalValue(value, 3).replace(/\.?0+$/, '')
}

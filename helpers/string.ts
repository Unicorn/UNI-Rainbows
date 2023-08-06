/** @format */

export function parseCurrency(string: number | string) {
  const s = string.toString()
  // Remove any whitespace from the string
  string = s.replace(/\s/g, '')

  // Check if the string is a valid number
  if (!/^\d+(\.\d+)?$/.test(string)) {
    return null
  }

  // Convert the string to a number
  const number = parseFloat(string)

  // Add the dollar sign and commas
  const formattedNumber = number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  // Return the formatted number
  return formattedNumber
}

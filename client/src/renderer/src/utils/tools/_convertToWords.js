export default function _convertToWords(amount) {
  const units = ['   ', ' 一', ' 二', ' 三', ' 四', ' 五', ' 六', ' 七', ' 八', ' 九']
  const scales = ['', '十', '百', '千', '万']

  if (amount === 0) {
    return '零元'
  }

  let numStr = amount.toString()

  if (numStr.length > 5) {
    throw new Error('超出转换范围')
  }

  numStr = '0'.repeat(5 - numStr.length) + numStr
  const digits = numStr.split('').map(Number)

  const result = `${units[digits[0]] ?? '  '}万${units[digits[1]] ?? '  '}千${
    units[digits[2]] ?? '  '
  }百${units[digits[3]] ?? '  '}十${units[digits[4]] ?? '  '}元`

  return result
}
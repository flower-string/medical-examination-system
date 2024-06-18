export default function _timeFormate(date) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  return year + '年' + month + '月' + day + '日'
}
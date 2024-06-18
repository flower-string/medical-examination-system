import _timeFormate from './_timeFormat'
import _convertToWords from './_convertToWords'

export default function _drawInvoices(canvas, value) {
  return new Promise(async (resolve) => {
    canvas.width = 1150
    canvas.height = 700
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, 1150, 700)
    // 绘制背景图像
    console.log(value)
    const backgroundImage = new Image()
    const InvoiceMode = await import('@renderer/assets/收费单据模板.png')
    backgroundImage.src = InvoiceMode.default
    backgroundImage.onload = () => {
      ctx.drawImage(backgroundImage, 0, 0, 1150, 700)
      // 客户名称
      ctx.font = '35px 宋体'
      ctx.fillStyle = '#000'
      ctx.fillText(value.user.name, 180, 150)
      // 体检时间
      console.log(value.createTime)
      ctx.fillText(_timeFormate(value.createTime), 830, 150)
      // 体检项目
      let total = 0
      for (let i = 0; i < value.records.length; i++) {
        const record = value.records[i]
        ctx.fillText(record.item.name, 200, 250 + i * 55)
        ctx.fillText(record.item.price, 660, 250 + i * 55)
        total += record.item.price
      }
      // 合计
      ctx.fillText(value.pay, 950, 600)
      ctx.fillText(_convertToWords(value.pay), 250, 600)
      // 备注
      if (value.pay < total) {
        ctx.fontSize = '20px'
        ctx.fillText(`优惠：${total - value.pay}`, 800, 300)
      }
      const url = canvas.toDataURL()
      resolve(url);
    }
  })
}
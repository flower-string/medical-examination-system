import _timeFormate from "./_timeFormat";

export default function _drawReport(canvas, value) {
  const width = 1150
  const height = 100 + 60 + 100 + value.records.length * 200;
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  let currentHeight = 0
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = '#31869B'
  ctx.fillRect(currentHeight, 0, width, 100)
  ctx.fillStyle = '#000'
  ctx.font = '50px Arial'
  ctx.fillText('体检报告', 450, currentHeight + 70)
  currentHeight += 100

  ctx.font = '30px Arial'
  ctx.strokeStyle = '#000'
  for (let i = 0; i < 6; i++) {
    ctx.strokeRect((width / 6) * i, currentHeight, width / 6, 60)
  }
  ctx.fillText('姓名', (width / 6) * (1 - 1) + 20, currentHeight + 40);
  ctx.fillText(value.user.name, (width / 6) * (2 - 1) + 20, currentHeight + 40);
  // ctx.fillText('年龄', (width / 6) * (3 - 1) + 20, currentHeight + 40)
  // ctx.fillText('性别', (width / 6) * (5 - 1) + 20, currentHeight + 40)
  currentHeight += 60;

  for (let i = 0; i < value.records.length; i++) {
    ctx.strokeRect(0, currentHeight, width / 4, 200)
    ctx.strokeRect(width / 4, currentHeight, (width / 4) * 3, 100)
    ctx.strokeRect(width / 4, currentHeight + 100, (width / 4) * 3 - 150, 100)
    ctx.strokeRect(width - 150, currentHeight + 100, 150, 100);
    ctx.fillText(value.records[i].item.name, 20, currentHeight + 40);
    ctx.fillText(value.records[i].result, (width / 4) + 20, currentHeight + 40);
    ctx.fillText(value.records[i].advice, (width / 4) * 1 + 20, currentHeight + 140);
    ctx.fillText(value.records[i].doctor.name, width - 150, currentHeight + 140);
    currentHeight += 200
  }

  ctx.strokeRect(0, currentHeight, width, 100)
  ctx.fillText('体检时间' + _timeFormate(value.updataTime), 20, currentHeight + 40)
  currentHeight += 100;
  const url = canvas.toDataURL('image/png')
  return url
}
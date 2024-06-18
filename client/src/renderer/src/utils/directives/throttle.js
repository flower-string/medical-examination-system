export default {
  mounted(el, binding) {
    let throttleTime = binding.value // 节流时间
    if (!throttleTime) {
      // 用户若不设置节流时间，则默认5s
      throttleTime = 5000
    }
    let cbFun
    el.addEventListener(
      'click',
      () => {
        if (!el.disabled) {
          el.disabled = true
          cbFun = setTimeout(() => {
            el.disabled = false
            cbFun = null
          }, throttleTime)
        }
      },
      true
    )
  },
  unmounted(el, binding) {}
}

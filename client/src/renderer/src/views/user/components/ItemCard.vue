<template>
  <div class="card">
    <h1>{{ props.name }}</h1>
    <h2>价格：￥{{ props.price }}</h2>
    <p>{{ props.desc }}</p>
    <div>
      <slot></slot>
    </div>
    <b @click="handelClick">{{ btnText }}</b>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  price: Number,
  desc: String,
  id: Number
})

const isyuyue = ref(false);
const btnText = computed(() => {
  return isyuyue.value ? '已预约' : '预约';
})

const emits = defineEmits(['yuyue'])
const handelClick = () => {
  isyuyue.value = !isyuyue.value;
  emits('yuyue', isyuyue, { id: props.id, name: props.name, price: props.price })
}
</script>

<style scoped>
.card {
  /* 相对定位 */
  position: relative;
  width: 260px;
  height: 250px;
  padding: 20px;
  margin: 20px;
  background-color: #758a99;
  border-radius: 20px;
  /* 溢出隐藏 */
  overflow: hidden;
  /* 弹性布局 */
  display: flex;
  /* 元素纵向排列 */
  flex-direction: column;
  /* 居中 */
  align-items: center;
  color: #fff;
  /* 阴影 */
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  /* 不让其被挤压 */
  flex-shrink: 0;
}

.card h2 {
  width: 80%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
.card p {
  width: 90%;
  text-indent: 32px;
  font-size: 16px;
  margin-bottom: 15px;
  line-height: 30px;
}
.card b {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 8px 32px;
  border-radius: 8px;
  position: absolute;
  bottom: 10px;
  cursor: pointer;
}
.card b:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.2);
}

div {
  position: absolute;
  right: 0;
  top: 0;
}
</style>

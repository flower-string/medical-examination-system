<template>
  <main>
    <h2>体检项目</h2>
    <div class="items">
      <ItemCard
        v-for="item in items"
        :id="item.id"
        :name="item.name"
        :price="item.price"
        :desc="item.desc"
        @yuyue="yuyue"
      >
        <el-popover
          placement="top-start"
          title="负责医师"
          :width="200"
          trigger="hover"
          :content="item.doctor.name"
        >
          <template #reference>
            <el-button class="m-2">负责医师</el-button>
          </template>
        </el-popover>
      </ItemCard>
    </div>
    <h2>体检套餐</h2>
    <div class="items">
      <ItemCard
        v-for="item in groups"
        :id="item.id"
        :name="item.name"
        :price="item.price"
        :desc="item.desc"
        @yuyue="yuyueGroup"
      >
        <el-popover
          placement="top-start"
          title="包含项目"
          :width="200"
          trigger="hover"
          :content="item.items.map((item) => item.name).join('\n')"
        >
          <template #reference>
            <el-button class="m-2">包含项目</el-button>
          </template>
        </el-popover>
      </ItemCard>
    </div>
  </main>
  <aside>
    <h5>
      体检项目
      <span>总价：{{ tprice }}</span>
      <button @click="createRecord">提交</button>
    </h5>
    <ul>
      <li v-for="(value, key) in zhong">{{ value.name }} - 价格：{{ value.price }}</li>
    </ul>
  </aside>
</template>

<script setup>
import { logApi, itemApi, groupApi, userApi } from '../../http/api/crud'
import ItemCard from './components/ItemCard.vue'
import { useUserStore } from '@renderer/store/user';

const userStore = useUserStore();
const activeName = ref(1)
const items = ref([])
const groups = ref([])
const zhong = ref({})

function yuyue(status, data) {
  if (status.value) {
    zhong.value[data.name] = data
  } else {
    delete zhong.value[data.name]
  }
}

async function yuyueGroup(status, data) {
  try {
    if(!status.value) {
      return;
    }
    await await ElMessageBox.confirm(`您确定要预约这些${data.name}吗，这一共将花费${data.price}元`, 'Warning', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
    if(userStore.balance < data.price) {
      ElMessage.error('余额不足');
      return;
    }
    const items = groups.value.find((el) => el.id === data.id).items.map((el) => el.id);
    await logApi.create({
      userId: parseInt(localStorage.getItem('userId')),
      pay: data.price,
      items
    })
    ElMessage.success('预约成功');
  } catch (error) {
    ElMessage.error("预约失败");
    status.value = false;
  }
}

const tprice = computed(() => {
  let total = 0
  const values = Object.values(zhong.value)
  values.forEach((item) => {
    total += item.price
  })
  return total
})

async function createRecord() {
  try {
    await ElMessageBox.confirm(`您确定要预约这些体检项目吗，这一共将花费${tprice.value}元`, 'Warning', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await logApi.create({
      userId: parseInt(localStorage.getItem('userId')),
      pay: tprice.value,
      items: Object.values(zhong.value).map((item) => item.id)
    })
    zhong.value = {}
    ElMessage.success('预约成功')
  } catch (error) {
    console.log("预约失败");
    ElMessage.error("预约失败")
  }
  
}

onMounted(async () => {
  items.value = await itemApi.findAll()
  groups.value = await groupApi.findAll()
})
</script>

<style scoped>
main {
  padding: 20px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.el-descriptions {
  margin: 5px;
  border: 1px solid white;
  padding: 5px;
  border-radius: 10px;
}

aside {
  position: fixed;
  right: 20px;
  top: 0px;
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px;
  width: 200px;
  background-color: #111111;
}

h5 {
  display: flex;
  justify-content: space-between;
}

button {
  background-color: black;
}
</style>

<template>
  这里是数据统计
  医生业绩为：
  <!-- <ul>
    <li v-for="item in counts">
      <div>医生名称：{{ item.name }}</div>
      <div>今日记录：{{ item.todayCount }}</div>
      <div>本月记录：{{ item.monthCount }}</div>
      <hr>
    </li>
  </ul> -->
  <div class="view">
    <div id="chart1"></div>
    <div id="chart2"></div>
  </div>

</template>

<script setup>
import { recordApi } from '../../http/api/crud'
import * as echarts from 'echarts';

const counts = ref([]);
const count1 = ref([]);
const count2 = ref([]);
onMounted(async () => {
  const logList = await recordApi.findAll();
  const groups = groupByDoctorId(logList);
  counts.value = countTodayAndMonth(groups);
  console.log(counts.value);
  Object.values(counts.value).forEach(item => {
    count1.value.push({
      value: item.todayCount,
      name: item.name
    });
    count2.value.push({
      value: item.monthCount,
      name: item.name
    })
  })
  const myChart1 = echarts.init(document.getElementById('chart1'));
  const myChart2 = echarts.init(document.getElementById('chart2'));
  const option1 = {
  title: {
    text: '医生体检数据汇总(每日)',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '本日体检次数',
      type: 'pie',
      radius: '50%',
      data: count2.value,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

const option2 = {
  title: {
    text: '医生体检数据汇总（每月）',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '本月体检次数',
      type: 'pie',
      radius: '50%',
      data: count1.value,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
  myChart1.setOption(option1);
  myChart2.setOption(option2);
})

function groupByDoctorId(objects) {
  const groups = {};

  for (const obj of objects) {
    const doctorId = obj.doctor.id;

    if (!groups[doctorId]) {
      groups[doctorId] = [];
    }

    groups[doctorId].push(obj);
  }

  return groups;
}

function countTodayAndMonth(groupedObjects) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const today = currentDate.getDate();
  const result = {};

  for (const doctorId in groupedObjects) {
    const doctorObjects = groupedObjects[doctorId];
    let todayCount = 0;
    let monthCount = 0;
    console.log(doctorObjects);
    for (const obj of doctorObjects) {
      
      const createdTime = new Date(obj.createTime);

      if (createdTime.getDate() === today) {
        todayCount++;
      }

      if (createdTime.getMonth() === currentMonth) {
        monthCount++;
      }
    }

    result[doctorId] = {
      todayCount,
      monthCount,
      name: doctorObjects[0].doctor.name
    };
  }

  return result;
}
</script>

<style>
.view {
  display: flex;
  margin: auto;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 50px;
}

#chart1, #chart2 {
  width: 500px;
  height: 500px;
}
</style>
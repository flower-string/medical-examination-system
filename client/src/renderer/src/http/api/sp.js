import axios from 'axios';
import server from '../server'
import serverConfig from '../config';
import { ElMessage } from 'element-plus';
axios.defaults.baseURL = serverConfig.baseURL;
axios.defaults.withCredentials = true;

export function userEenewal(id, value) {
  server.patch(`/user/renewal/${id}`, { value })
}

export async function doctor_getUserInfoAndRecords(id) {
  const info = await server.get(`/user/${id}`);
  let records = await server.get(`/record/user/${id}`);
  records = records.filter(item => item.status !== 2);
  return { info, records };
}

export async function user_getUserLogs(id) {
  const logs = await server.get(`/log/user/${id}`);
  return logs; 
}

export async function user_book(data) {
  const { data: res } = await axios({
    method: 'post',
    url: '/log',
    data
  })
  const { code, message } = res;
  if (code === 1000) {
    ElMessage.success(message);
  } else {
    ElMessage.error(message);
    throw new Error(message);
  }
}

export async function cancelBook(id) {
  await server.patch(`/log/cancel/${id}`)
}

export async function auth_login(type, body) {
  let url = '';
  switch (type) {
    case 0: url = '/admin/login/'; break;
    case 1: url = '/doctor/login/'; break;
    case 2: url = '/user/login/'; break;
  }
  const { data } = await axios({
    method: 'post',
    url: url,
    data: body
  });
  const { code, message, data: info } = data;
  if (code === 1000) {
    ElMessage.error(message);
    throw new Error(message);
  } else if(code === 1001) {
    ElMessage.error(message);
    throw new Error(message);
  } else {
    return info;
  }
}

export async function user_pay(logId) { 
  try {
    const { data } = await axios({
      method: 'patch',
      url: serverConfig.baseURL + '/log/pay/' + logId,
    })
    const { code } = data;
    if (code === 200) { 
      ElMessage.success('支付成功');
    } else {
      throw new Error('支付失败');
    }
  } catch {
    ElMessage.error('支付失败');
  }
}

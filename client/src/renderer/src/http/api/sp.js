import server from '../server'

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

export async function cancelBook(id) {
  await server.patch(`/log/cancel/${id}`)
}


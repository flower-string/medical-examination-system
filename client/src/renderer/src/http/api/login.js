// 登录，获取token
export default async function login(json) {
  const token = await fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify(json),
  }).then((res) => res.json());
  localStorage.setItem('token', token);
}
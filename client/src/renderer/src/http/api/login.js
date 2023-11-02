// 登录，获取token
export default async function login(id, type) {
  const token = await fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify({
      id,
      type
    }),
  }).then((res) => res.json());
  localStorage.setItem('token', token);
}
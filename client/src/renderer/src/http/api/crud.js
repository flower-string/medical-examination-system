import server from '../server';

class Axios {
  constructor(url) {
    this.url = url;
  }

  async findOne(id) {
    const item = await server.get(this.url + '/' + id);
    return item;
  }

  async findAll() {
    const list = await server.get(this.url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return list;
  }

  async create(data) {
    const item = await server.post(this.url, data);
    return item;
  }

  async update(data) {
    console.log(data)
    const item = await server.patch(this.url + '/' + data.id, data);
  }

  async delete(id) {
    const item = await server.delete(this.url + '/' + id);
  }
}

export const userApi = new Axios('/user');
export const recordApi = new Axios('/record');
export const itemApi = new Axios('/item');
export const groupApi = new Axios('/group');
export const doctorApi = new Axios('/doctor');
export const adminApi = new Axios('/admin');
export const logApi = new Axios('/log')

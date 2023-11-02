import server from '../server';

class Axios {
  constructor(url) {
    this.url = url;
  }

  async findOne(id) {
    const item = await server.get(this.url + '/' + id);
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
    const item = await server.patch(this.url + '/' + data.id, data);
  }

  async delete(id) {
    const item = await server.delete(this.url + '/' + id);
  }
}

export default {
  userApi: new Axios('/user'),
  recordApi: new Axios('/record'),
  itemApi: new Axios('/item'),
  groupApi: new Axios('/group'),
  doctorApi: new Axios('/doctor'),
}
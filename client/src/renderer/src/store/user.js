import { defineStore } from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore('user', {
  // other options...
  state: () => ({
    name: '',
    password: '',
    id: '',
    balance: 0
  }),

  actions: {
    setName(name) {
      this.name = name
    },
    setPassword(password) {
      this.password = password
    },
    setId(id) {
      this.id = id;
    },
    setBalance(balance) {
      this.balance = balance;
    }
  }
})
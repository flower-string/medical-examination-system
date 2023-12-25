import { defineStore } from 'pinia';

export const useDoctor = defineStore('doctor', {
  state: () => ({
    doctors: {
      
    }
  }),

  actions: {
    addItem(id, name) {
      this.doctors[id] = name;
    },

    findItem(id) {
      return this.doctors[id];
    },

    findId(name) {
      return Object.keys(this.doctors).find(key => this.doctors[key] === name);
    }
  }
})
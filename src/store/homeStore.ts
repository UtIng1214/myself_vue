import axios from "axios";
import { defineStore } from "pinia";

export const useHomeStore = defineStore("homeStore", {
  state() {
    return {

    };
  },
  actions: {
    async getContactsData() {
      try {
        const { data } = await axios.get("http://localhost:3000/api/contact");
        return data;
      } catch (error) {
        console.log(error);
      }
    },

  },
});
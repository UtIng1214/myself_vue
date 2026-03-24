import axios from "axios";
import { defineStore } from "pinia";

export const useHomeStore = defineStore("homeStore", {
  state() {
    return {

    };
  },
  actions: {
    //------------------------學歷------------------------
    async getEducationData() {
      try {
        const { data } = await axios.get("http://localhost:3000/api/education");
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async postEducationData(payload: any) {
      try {
        await axios.post("http://localhost:3000/api/education", payload);
        return;
      } catch (error) {
        console.log(error);
      }
    },

    async putEducationData(data: any) {
      try {
        await axios.put("http://localhost:3000/api/education", data)
        return;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteEducationData(id: number) {
      try {
        await axios.delete(`http://localhost:3000/api/education/${id}`);
      } catch (error) {
        console.log(error);
      }
    },

    //------------------------工作經歷------------------------
    async getJobData() {
      try {
        const { data } = await axios.get("http://localhost:3000/api/job");
        console.log(data);
        
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async postJobData(payload: any) {
      try {
        console.log(payload);
        
        await axios.post("http://localhost:3000/api/job", payload);
        return;
      } catch (error) {
        console.log(error);
      }
    },

    async putJobData(data: any) {
      try {
        await axios.put("http://localhost:3000/api/job", data);
        return;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteJobData(id: number) {
      try {
        await axios.delete(`http://localhost:3000/api/job/${id}`);
        return;
      } catch (error) {
        console.log(error);
      }
    },

    //------------------------專業技能------------------------
    async getSkillsData() {
      try {
        const { data } = await axios.get("http://localhost:3000/api/skills");
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async postSkillsData(data: any[]) {
      try {
        await axios.post("http://localhost:3000/api/skills", data);
        return;
      } catch (error) {
        console.log(error);
      }
    },

    //------------------------聯絡方式------------------------
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
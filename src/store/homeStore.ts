import axios from "axios";
import { defineStore } from "pinia";

const api = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
	withCredentials: true,
});

export default api;

export const useHomeStore = defineStore("homeStore", {
	state() {
		return {};
	},
	actions: {
		//------------------------登入登出------------------------
		async getUserData() {
			try {
				const { data } = await api.get("/api/user");
				return data;
			} catch (error) {
				console.log(error);
			}
		},

		async postUserData(payload: any) {
			try {
				const { data } = await api.post("/api/user", payload);
				return data.message === "login success";
			} catch (error) {
				console.log(error);
				return false;
			}
		},

		async getAuthStatus() {
			try {
				const { data } = await api.get("/api/auth/me");
				return data;
			} catch (error) {
				console.log(error);
			}
		},

		async logoutUser() {
			try {
				const { data } = await api.post(
					"/api/auth/logout",
					{},
					{
						withCredentials: true,
					}
				);
				return data.message === "logout success";
			} catch (error) {
				console.log(error);
				return false;
			}
		},

		//------------------------學歷------------------------
		async getEducationData() {
			try {
				const { data } = await api.get("/api/education");
				return data;
			} catch (error) {
				console.log(error);
			}
		},

		async postEducationData(payload: any) {
			try {
				await api.post("/api/education", payload);
				return;
			} catch (error) {
				console.log(error);
			}
		},

		async putEducationData(data: any) {
			try {
				await api.put("/api/education", data);
				return;
			} catch (error) {
				console.log(error);
			}
		},

		async deleteEducationData(id: number) {
			try {
				await api.delete(`api/education/${id}`);
			} catch (error) {
				console.log(error);
			}
		},

		//------------------------工作經歷------------------------
		async getJobData() {
			try {
				const { data } = await api.get("/api/job");
				console.log(data);

				return data;
			} catch (error) {
				console.log(error);
			}
		},

		async postJobData(payload: any) {
			try {
				console.log(payload);

				await api.post("/api/job", payload);
				return;
			} catch (error) {
				console.log(error);
			}
		},

		async putJobData(data: any) {
			try {
				await api.put("/api/job", data);
				return;
			} catch (error) {
				console.log(error);
			}
		},

		async deleteJobData(id: number) {
			try {
				await api.delete(`api/job/${id}`);
				return;
			} catch (error) {
				console.log(error);
			}
		},

		//------------------------專業技能------------------------
		async getSkillsData() {
			try {
				const { data } = await api.get("/api/skills");
				return data;
			} catch (error) {
				console.log(error);
			}
		},

		async postSkillsData(payload: { skill: string }[]) {
			try {
				await api.post("/api/skills", payload);
				return;
			} catch (error) {
				console.log(error);
			}
		},

		async putSkillsData(payload: { skill: string }[]) {
			try {
				await api.put("/api/skills", payload);
				return;
			} catch (error) {
				console.log(error);
			}
		},

		//------------------------聯絡方式------------------------
		async getContactsData() {
			try {
				const { data } = await api.get("/api/contact");
				return data;
			} catch (error) {
				console.log(error);
			}
		},

		async putContactsData(payload: any) {
			try {
				await api.put("/api/contact", payload);
				return;
			} catch (error) {
				console.log(error);
			}
		},

		//------------------------作品集------------------------
    async getWorksData() {
      try {
        const { data } = await api.get("/api/works");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
	},
});

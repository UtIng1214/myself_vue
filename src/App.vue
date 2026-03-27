<template>
	<nav>
		<div class="navLeft">
			<div class="weather">
				<p>天氣資訊</p>
				<div v-if="weather" class="weather-info">
					<p>地點: {{ weather.locationName }}</p>
					<p>溫度: {{ weather.temperature }} °C</p>
				</div>
				<div v-else>
					<p>載入中...</p>
				</div>
			</div>

			<div class="link">
				<router-link to="/" class="tag">
					<el-icon><UserFilled /></el-icon>
					<p>關於我</p>
				</router-link>

				<router-link to="/about" class="tag">
					<el-icon><Management /></el-icon>
					<p>作品集</p>
				</router-link>
			</div>
		</div>

		<div class="navRight">
			<el-icon v-if="!allEditState" @click.stop="loginBlock = true" :size="24"
				><Lock
			/></el-icon>
			<el-icon v-if="allEditState" @click.stop="loginBlock = true" :size="24"
				><Unlock
			/></el-icon>
		</div>

		<div class="login" v-if="loginBlock" ref="loginRef" @click.stop>
			<div v-if="!allEditState">
				<span>*如需修改內容請先登入</span>
				<div class="account">
					<p>帳號：</p>
					<el-input
						v-model="account"
						clearable
						placeholder="填寫帳號："
					></el-input>
				</div>
				<div class="password">
					<p>密碼：</p>
					<el-input
						v-model="password"
						placeholder="填寫密碼："
						show-password
					></el-input>
				</div>
				<button @click="checkLogin">登入</button>
			</div>

			<div v-if="allEditState" class="logout">
				已登入
				<button @click="checkLogout">登出</button>
			</div>
		</div>
	</nav>
	<router-view v-slot="{ Component }">
		<component :is="Component" :allEditState="allEditState" />
	</router-view>
	<!-- <router-view /> -->
</template>

<!-- <script src="./views/js/HomeView.js"></script> -->

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { getWeatherData } from "./views/js/api/weatherApi";
import { useHomeStore } from "@/store/homeStore";
import { ElMessage } from "element-plus";

const homeStore = useHomeStore();
const weather = ref();
const loginBlock = ref(false);
const account = ref("");
const password = ref("");
const allEditState = ref(false);
const loginRef = ref(null);

onMounted(async () => {
	await weatherData();
	await getAuthStatus();
	await homeStore.getUserData();
});

onBeforeUnmount(() => {
	document.removeEventListener("click", handleClickOutside);
});

const checkLogin = async () => {
	const payload = {
		account: account.value,
		password: password.value,
	};

	const success = await homeStore.postUserData(payload);

	if (success) {
		allEditState.value = true;
		ElMessage.success(`登入成功`);
	} else {
		ElMessage.error(`資料有誤`);
	}
};

const getAuthStatus = async () => {
	try {
		const data = await homeStore.getAuthStatus();
		allEditState.value = data.isAuthenticated;
	} catch (error) {
		console.log(error);
		allEditState.value = false;
	}
};

const checkLogout = async () => {
	const success = await homeStore.logoutUser();
	if (success) {
		account.value = "";
		password.value = "";
		ElMessage.success(`登出成功`);
	}
	allEditState.value = false;
};

const weatherData = async () => {
	try {
		const response = await getWeatherData("F-C0032-001", {
			locationName: "新北市",
		});
		const weatherData = response.data.records.location[0];
		weather.value = {
			locationName: weatherData.locationName,
			temperature:
				weatherData.weatherElement[4].time[0].parameter.parameterName,
		};
	} catch (error) {
		console.error("無法獲取天氣資訊", error);
	}
};

const handleClickOutside = (event) => {
	const el = loginRef.value;

	if (!el) return;

	// 👉 確保 target 是 Node
	if (!(event.target instanceof Node)) return;

	if (!el.contains(event.target)) {
		loginBlock.value = false;
	}
};

watch(loginBlock, (val) => {
	if (val) {
		document.addEventListener("click", handleClickOutside);
	} else {
		document.removeEventListener("click", handleClickOutside);
	}
});
</script>

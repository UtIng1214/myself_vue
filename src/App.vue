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
			<el-icon :size="24"><Lock /></el-icon>
			<el-icon :size="24"><Unlock /></el-icon>
		</div>

	</nav>
	<router-view />
</template>

<!-- <style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style> -->
<!-- <script src="./views/js/HomeView.js"></script> -->

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getWeatherData } from "./views/js/api/weatherApi";
import { useHomeStore } from "@/store/homeStore";

const homeStore = useHomeStore();
const weather = ref();
onMounted(async() => {
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

	await getUser();
});

const getUser = async () => {
	const data = await homeStore.getUserData();
	console.log('user: ', data);
};

// export default {
// 	data() {
// 		return {
// 			weather: null,
// 		};
// 	},
// 	async created() {
// 		try {
// 			const response = await getWeatherData("F-C0032-001", {
// 				locationName: "新北市",
// 			});
// 			const weatherData = response.data.records.location[0];
// 			this.weather = {
// 				locationName: weatherData.locationName,
// 				temperature:
// 					weatherData.weatherElement[4].time[0].parameter.parameterName,
// 			};
// 		} catch (error) {
// 			console.error("無法獲取天氣資訊", error);
// 		}
// 	},
// };
</script>

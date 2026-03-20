<template>
	<div class="content">
		<div class="portfolio">
			<div class="section-title">
				<h2>作品集</h2>
			</div>
			<div class="know_text">

				<el-select v-model="value" placeholder="全部">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>

				<ul class="know_items portfolio">
					<li
						v-for="item in filterWords"
						:key="item.id"
						class="know_item portfolio"
					>
						<a :href="item.href" target="_blank" rel="noopener">
							<img :src="item.imgSrc" :alt="item.projectName" />
							<span>{{ item.projectName }}</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/_HomeView.scss";
</style>
<!-- <script src="./js/HomeView.js"></script> -->
<!-- <script>
// export default {
// 	data() {
// 		return {
// 			works: [
// 				{
// 					company: "永豐",
// 					name: "首登網銀會員 最高拿300元",
// 					imgSrc:
// 						"https://bank.sinopac.com/sinopacBT/webevents/2024Q4_mma-loginfirst/images/FB.jpg",
// 					href: "https://bank.sinopac.com/sinopacBT/webevents/2024Q4_mma-loginfirst/",
// 				},
// 				{
// 					company: "永豐",
// 					name: "掌握easy app",
// 					imgSrc: require("@/assets/images/banner_easy.png"),
// 					href: "https://easy.sinopac.com/index_TW_HK.html",
// 				},
// 				{
// 					company: "永豐",
// 					name: "門轉享好康",
// 					imgSrc: require("@/assets/images/banner_BT.png"),
// 					href: "https://bank.sinopac.com/sinopacBT/webevents/ec/phonetransfer/event/",
// 				},
// 				{
// 					company: "永豐",
// 					name: "警覺詐騙 保護自己",
// 					imgSrc:
// 						"https://bank.sinopac.com/sinopacBT/webevents/fraudprevention/images/share.jpg",
// 					href: "https://bank.sinopac.com/sinopacBT/webevents/fraudprevention/",
// 				},
// 				{
// 					company: "永豐",
// 					name: "永豐ATM 存提e手掌",
// 					imgSrc:
// 						"https://bank.sinopac.com/sinopacBT/webevents/sinopacatm/images/og.jpg",
// 					href: "https://bank.sinopac.com/sinopacBT/webevents/sinopacatm/",
// 				},
// 				{
// 					company: "永豐",
// 					name: "成為永豐網銀會員",
// 					imgSrc:
// 						"https://bank.sinopac.com/sinopacBT/webevents/ec/mmapromotion/images/BN_1200x630.jpg",
// 					href: "https://bank.sinopac.com/sinopacBT/webevents/ec/mmapromotion/index.html",
// 				},
// 				{
// 					company: "永豐",
// 					name: "策略人才甄選計畫",
// 					imgSrc:
// 						"https://bank.sinopac.com/sinopacBT/webevents/ma/images/OK_FB.jpeg",
// 					href: "https://bank.sinopac.com/sinopacBT/webevents/ma/index.html#section-process",
// 				},
// 				{
// 					company: "緯育",
// 					name: "PLANET VOYAGER星際旅遊",
// 					imgSrc:
// 						"https://tibamef2e.com/chd103/g3/PlanetVoyager/img/banner.png",
// 					href: "https://tibamef2e.com/chd103/g3/PlanetVoyager/",
// 				},
// 				{
// 					company: "緯育",
// 					name: "艾凡酒店",
// 					imgSrc: require("@/assets/images/banner_aevum.jpg"),
// 					href: "https://uting1214.github.io/aevum/",
// 				},
// 				{
// 					company: "立達",
// 					name: "立達廣告整合行銷有限公司",
// 					imgSrc: "https://www.examorg.com.tw/images/logo_fb.jpg",
// 					href: "https://www.examorg.com.tw/",
// 				},
// 				{
// 					company: "立達",
// 					name: "立達清潔公司",
// 					imgSrc: "https://www.all.org.tw/images/index_fb.jpg",
// 					href: "https://www.all.org.tw/",
// 				},
// 				{
// 					company: "立達",
// 					name: "兆豐聯合電機技師事務所",
// 					imgSrc: require("@/assets/images/banner_eelinn.jpg"),
// 					href: "https://www.eelinn.com.tw/",
// 				},
// 			],
// 			options: [
// 				{
// 					value: '0',
// 					label: '全部'
// 				},
// 				{
// 					value: '1',
// 					label: '課程'
// 				},
// 				{
// 					value: '2',
// 					label: '立達'
// 				},
// 				{
// 					value: '3',
// 					label: '北祥'
// 				},
// 			],
// 			value: '',
// 		};
// 	},
// };
</script> -->

<script setup lang="ts">
import axios from "axios"
import { ref, onMounted, computed } from "vue"

const works = ref([]);
const value = ref('0');

onMounted(async () => {
  const data = await axios.get("http://localhost:3000/api/works");
  works.value = data.data;
})

const options = [
  { value: '0', label: "全部" },
  { value: '1', label: "立達" },
  { value: '2', label: "課程" },
  { value: '3', label: "北祥" }
];

const filterWords = computed(() => {
	let result = works.value

	if(value.value !== '0') {
		result = result.filter(item => item.company === value.value)
	} 

	// 2️⃣ 再做 imgSrc 轉換
	return result.map(item => {
		let img = item.imgSrc

		if (img.startsWith("@/assets/")) {
			img = new URL(img.replace("@", "/src"), import.meta.url).href
		}

		return {
			...item,
			imgSrc: img
		}
	})
});
</script>
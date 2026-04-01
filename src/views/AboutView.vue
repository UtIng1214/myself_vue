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
						v-loading="loading"
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

<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useHomeStore } from "@/store/homeStore";

interface WorkItem {
  id: number;
  company: string;
  href: string;
  imgSrc: string;
  projectName: string;
}

const homeStore = useHomeStore();
const works = ref<WorkItem[]>([]);
const value = ref('0');
const loading = ref(true);

onMounted( async() => {
  const data = await homeStore.getWorksData();
  works.value = data;
	loading.value = false;
})

const options = [
  { value: '0', label: "全部" },
  { value: '1', label: "立達" },
  { value: '2', label: "課程" },
  { value: '3', label: "北祥" },
  { value: '4', label: "天茶" },
];

const filterWords = computed(() => {
	let result = works.value

	if(value.value !== '0') {
		result = result.filter(item => item.company === value.value)
	} 

	result = result.slice().sort((b, a) => Number(a.company) - Number(b.company));

	// 2️⃣ 再做 imgSrc 轉換
	return result.map(item => {
		let img = item.imgSrc

		// if (img.startsWith("@/assets/")) {
		// 	img = new URL(img.replace("@", "/src"), import.meta.url).href
		// } else if (img.startsWith("/images/")) {
		// 	img = `YuTing${img}`
		// }
		if (img.startsWith("/images/")) {
			img = `YuTing${img}`
		}
		return {
			...item,
			imgSrc: img
		}
	})
});
</script>
<template>
	<div class="content">
		<div class="main">
			<div class="pic">
				<div class="bg"></div>
				<div class="my_pic">
					<!-- <img src="../assets/images/my_pic.png" alt="myslef" /> -->
				</div>
			</div>
			<div class="introduce">
				<div class="name">
					<h1>譚郁亭</h1>
					<div class="position">應徵職位<br />-前端工程師</div>
				</div>
				<div class="aboutMe">
					<div class="title">ABOUT ME</div>
					<div class="text">
						擁有2年網站與應用程式開發經驗。
						<br />
						在北祥服務科技期間，我負責開發永豐銀行內部資訊網站及行銷頁面，並參與新行動銀行
						App 的改版與測試工作。
						<br />
						在立達徵信社，我專注於舊網站優化、美化及 RWD、SEO
						改善，並成功製作多個委託網站。我注重細節與品質，能有效解決問題，為團隊創造價值。
					</div>
				</div>
			</div>
		</div>

		<!-- 學歷 -->
		<div class="educational">
			<div class="section-title">
				<h2>學歷</h2>
			</div>
			<div class="timelines">
				<div
					v-for="item in education"
					:key="item.id"
					class="timeline"
				>
					<div class="timeline-info">
						<div class="timeline-date">{{ item.startDate }}-{{ item.endDate }}</div>
						<div class="timeline-school">{{ item.school }}</div>
					</div>
					<ul class="timeline-details">
						<li>{{ item.details }}</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- 工作經歷 -->
		<div class="job">
			<div class="section-title">
				<h2>工作經歷</h2>
			</div>
			<div class="timelines">
				<div v-for="item in job" :key="item.id" class="timeline">
					<div class="timeline-info">
						<div class="timeline-date">{{ item.startData }}-{{ item.endData }}</div>
						<div class="timeline-company">{{ item.company }}</div>
						<div class="timeline-job">{{ item.job }}</div>
					</div>
					<ul class="timeline-details">
						<li
							v-for="(d,i) in item.details"
							:key="i"
						>
							{{ d }}
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- 專業技能 -->
		<div class="major">
			<div class="section-title">
				<h2>專業技能</h2>
			</div>
			<div class="know_text">
				<ul class="know_items">
					<li v-for="item in skills" :key="item.skill" class="know_item">
						{{ item.skill }}
					</li>
				</ul>
			</div>
		</div>

		<!-- 聯絡方式 -->
		<div class="info">
			<div class="section-title">
				<h2>聯絡方式</h2>
			</div>
			<div class="know_text" v-for="item in contacts" :key="item.mail">
				<ul class="contact_items">
					<!-- <li class="contact_item">📍 {{ contact.address }}</li> -->
					<!-- <li class="contact_item">📧 {{ contact.email }}</li> -->
					<!-- <li class="contact_item">📞 {{ contact.phone }}</li> -->
					<li class="contact_item">📧 {{ item.mail }}</li>
					<li class="contact_item">📞 {{ item.phone }}</li>
					<li class="contact_item">📍 {{ item.address }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/_HomeView.scss";
</style>

<!-- <script src="./js/HomeView.ts"></script> -->


<script setup lang="ts">
import axios from "axios"
import { ref, onMounted } from "vue"

const contacts = ref([]);
const education = ref([]);
const job = ref([]);
const skills = ref([]);

onMounted(async () => {
  const res1 = await axios.get("http://localhost:3000/api/contact");
  contacts.value = res1.data;

  const res2 = await axios.get("http://localhost:3000/api/education");
  education.value = res2.data;

  const res3 = await axios.get("http://localhost:3000/api/job");
  job.value = res3.data;

  const res4 = await axios.get("http://localhost:3000/api/skills");
  skills.value = res4.data;
	
})
</script>
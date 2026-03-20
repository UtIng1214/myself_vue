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
				<p>學歷</p>
				<div>
					<div v-if="!dataEditState && !dataAddNew && !dataDelete">
						<el-dropdown>
							<el-icon :size="20"><Edit /></el-icon>

							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item @click="addData"><el-icon><Plus /></el-icon>新增</el-dropdown-item>
									<el-dropdown-item @click="editData"><el-icon><EditPen /></el-icon>修改</el-dropdown-item>
									<el-dropdown-item @click="deleteData"><el-icon><DeleteFilled /></el-icon>刪除</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
					<div v-if="dataEditState">
						<el-icon :size="24" @click="finishEditData()"><Check /></el-icon>
						<el-icon :size="24" @click="cancelEditData"><Close /></el-icon>
					</div>
					<div v-if="dataAddNew">
						<el-icon :size="24" @click="confirmAddData"><Check /></el-icon>
						<el-icon :size="24" @click="cancelAddData"><Close /></el-icon>
					</div>
					<div v-if="dataDelete">
						<!-- <el-icon :size="24" @click="confirmAddData"><Check /></el-icon> -->
						<el-icon :size="24" @click="cancelDeleteData"><Close /></el-icon>
					</div>
				</div>
			</div>

			<div class="timelines">
				<!-- 新增 -->
				<div class="addNewBlock" v-if="dataAddNew">
					<div>
						<p>起始時間：</p>
						<el-input v-model="addStartDate" placeholder="填寫起始時間"></el-input>
					</div>
					<div>
						<p>結束時間：</p>
						<el-input v-model="addEndDate" placeholder="填寫結束時間"></el-input>
					</div>
					<div>
						<p>學校名稱：</p>
						<el-input v-model="addSchool" placeholder="填寫學校名稱"></el-input>
					</div>
					<div>
						<p>科系名稱：</p>
						<el-input v-model="addDetails" placeholder="填寫科系名稱"></el-input>
					</div>
				</div>

				<div
					v-for="item in copyEducation"
					:key="item.id"
					class="timeline"
				>
					<div v-if="!dataEditState">
						<div class="timeline-info">
							<div class="timeline-date">{{ item.startDate }}-{{ item.endDate }}</div>
							<div class="timeline-school">{{ item.school }}</div>
						</div>
						
						<ul class="timeline-details">
							<li>{{ item.details }}</li>
						</ul>
					</div>

					<el-icon v-if="dataDelete" @click="confirmDeleteData(item.id)"><DeleteFilled /></el-icon>

					<!-- 修改 -->
					<div class="timeline-edit" v-if="dataEditState">
						<div>
							<p>起始時間：</p>
							<el-input class="timeInput" v-model="item.startDate" placeholder="填寫起始時間"></el-input>
						</div>
						<div>
							<p>結束時間：</p>
							<el-input class="timeInput" v-model="item.endDate" placeholder="填寫結束時間"></el-input>
						</div>
						<div>
							<p>學校名稱：</p>
							<el-input v-model="item.school" placeholder="填寫學校名稱"></el-input>
						</div>
						<div>
							<p>科系名稱：</p>
							<el-input v-model="item.details" placeholder="填寫科系名稱"></el-input>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 工作經歷 -->
		<div class="job">
			<div class="section-title">
				<p>工作經歷</p>
			</div>
			<div class="timelines">
				<div v-for="item in copyJob" :key="item.id" class="timeline">
					<div>
						<div class="timeline-info">
							<div class="timeline-date">{{ item.startData }}-{{ item.endData }}</div>
							<div class="timeline-company">{{ item.company }}</div>
							<div class="timeline-job">{{ item.job }}</div>
						</div>
						<ul class="timeline-details">
							<li v-for="(d,i) in item.details" :key="i">
								{{ d }}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- 專業技能 -->
		<div class="major">
			<div class="section-title">
				<p>專業技能</p>
			</div>
			<div class="know_text">
				<ul class="know_items">
					<li v-for="item in copySkills" :key="item.skill" class="know_item">
						{{ item.skill }}
					</li>
				</ul>
			</div>
		</div>

		<!-- 聯絡方式 -->
		<div class="info">
			<div class="section-title">
				<p>聯絡方式</p>
			</div>
			<div class="know_text" v-for="item in copyContacts" :key="item.mail">
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
import { ElMessage, ElMessageBox } from "element-plus";
import { useHomeStore } from '@/store/homeStore';

const homeStore = useHomeStore();
const contacts = ref([]);
const copyContacts = ref([]);

const education = ref([]);
const copyEducation = ref([]);

const job = ref([]);
const copyJob = ref([]);

const skills = ref([]);
const copySkills = ref([]);

const dataEditState = ref(false);
const dataAddNew = ref(false);
const dataDelete = ref(false);

const addStartDate = ref('');
const addEndDate = ref('');
const addSchool = ref('');
const addDetails = ref('');

onMounted(async () => {
	await getContacts();
	await getEducation();
	await getJob();
	await getSkills();
});

const getContacts = async() => {
  // const res1 = await axios.get("http://localhost:3000/api/contact");
  // contacts.value = res1.data;
	// copyContacts.value = JSON.parse(JSON.stringify(res1.data));


	const data = await homeStore.getContactsData()
	console.log('123456:', data);
	contacts.value = data;
	copyContacts.value = JSON.parse(JSON.stringify(data));
};

const getEducation = async() => {
	const res2 = await axios.get("http://localhost:3000/api/education");
  education.value = res2.data;
  copyEducation.value = JSON.parse(JSON.stringify(res2.data));
};

const getJob = async() => {
  const res3 = await axios.get("http://localhost:3000/api/job");
  job.value = res3.data;
  copyJob.value = JSON.parse(JSON.stringify(res3.data));
};

const getSkills = async() => {
  const res4 = await axios.get("http://localhost:3000/api/skills");
  skills.value = res4.data;
  copySkills.value = JSON.parse(JSON.stringify(res4.data));
};

const addData = () => {
	dataAddNew.value = true;
};

const editData = () => {
	dataEditState.value = true;
};

const deleteData = () => {
	dataDelete.value = true;
};

const confirmAddData = async() => {
	try {
		const payload = {
			startDate: addStartDate.value,
			endDate: addEndDate.value,
			school: addSchool.value,
			details: addDetails.value,
		};
		await axios.post("http://localhost:3000/api/education", payload);

		addStartDate.value = '';
		addEndDate.value = '';
		addSchool.value = '';
		addDetails.value = '';
		
		await getEducation();
		dataAddNew.value = false;
		ElMessage.success(`新增成功`);
	} catch (error) {
		console.log(error);
	}
};

const cancelAddData = () => {
	dataAddNew.value = false;
	addStartDate.value = '';
	addEndDate.value = '';
	addSchool.value = '';
	addDetails.value = '';
};

const cancelEditData = () => {
	copyContacts.value = contacts.value;
	copyEducation.value = education.value;

	dataEditState.value = false;
};

const cancelDeleteData = () => {
	dataDelete.value = false;
};

const confirmDeleteData = async(id) => {
	await ElMessageBox.confirm( "是否確認刪除", "警告", {
		confirmButtonText: "確定",
		cancelButtonText: "取消",
		type: "warning",
		closeOnClickModal: false,
		closeOnPressEscape: false,
	})
		.then(async() => {
			try {
				await axios.delete(`http://localhost:3000/api/education/${id}`);
				await getEducation();
				dataDelete.value = false;
				ElMessage.success(`刪除成功`);
			} catch (error) {
				console.log(error);
				
			}
		})
		.catch(() => {
      // 使用者點擊取消或關閉對話框
    });
};

const finishEditData = async() => {	
	try {
		await axios.put("http://localhost:3000/api/education", copyEducation.value)

		await getEducation();
		dataEditState.value = false;
		ElMessage.success(`修改成功`);
	} catch (error) {
		console.log(error);
	}

};
</script>
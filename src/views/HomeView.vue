<template>
	<div class="content">
		<div class="main">
			<div class="pic">
				<div class="bg"></div>
				<div class="my_pic">
					<img src="../assets/images/my_pic.png" alt="myslef" />
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
						<p>擁有3年網站開發經驗。</p>
						<span>- 熟悉vue3、TypeScript 、HTML、SASS / SCSS、RWD</span>
						<span>- 熟悉 Git 使用操作</span>
						<span>- 熟悉串接 API</span>
						<span>- 具備資料庫MySQL使用經驗</span>
						<span>- 具備 Figma 使用經驗，基礎UI/UX觀念</span>
						<span>- 曾參與SEO優化</span>
					</div>
				</div>
			</div>
		</div>

		<!-- 學歷 -->
		<div class="educational">
			<div class="section-title">
				<p>學歷</p>
				<div>
					<div
						v-if="
							props.allEditState && !eduEditState && !eduAddNew && !eduDelete
						"
					>
						<el-dropdown>
							<el-icon :size="20"><Edit /></el-icon>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item @click="addEduData"
										><el-icon><Plus /></el-icon>新增</el-dropdown-item
									>
									<el-dropdown-item @click="editEduData"
										><el-icon><EditPen /></el-icon>修改</el-dropdown-item
									>
									<el-dropdown-item @click="deleteEduData"
										><el-icon><DeleteFilled /></el-icon>刪除</el-dropdown-item
									>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
					<div v-if="eduAddNew">
						<el-icon :size="24" @click="confirmAddEdu"><Check /></el-icon>
						<el-icon :size="24" @click="cancelAddEdu"><Close /></el-icon>
					</div>
					<div v-if="eduEditState">
						<el-icon :size="24" @click="finishEditEdu()"><Check /></el-icon>
						<el-icon :size="24" @click="cancelEditEdu"><Close /></el-icon>
					</div>
					<div v-if="eduDelete">
						<el-icon :size="24" @click="cancelDeleteEdu"><Close /></el-icon>
					</div>
				</div>
			</div>

			<div class="timelines">
				<!-- 新增 -->
				<div class="addNewBlock" v-if="eduAddNew">
					<div>
						<p>起始時間：</p>
						<el-input
							v-model="addEduStartDate"
							placeholder="填寫起始時間"
						></el-input>
					</div>
					<div>
						<p>結束時間：</p>
						<el-input
							v-model="addEduEndDate"
							placeholder="填寫結束時間"
						></el-input>
					</div>
					<div>
						<p>學校名稱：</p>
						<el-input v-model="addSchool" placeholder="填寫學校名稱"></el-input>
					</div>
					<div>
						<p>科系名稱：</p>
						<el-input
							v-model="addEduDetails"
							placeholder="填寫科系名稱"
						></el-input>
					</div>
				</div>

				<div v-for="item in copyEducation" :key="item.id" class="timeline">
					<div v-if="!eduEditState">
						<div class="timeline-info">
							<div class="timeline-date">
								{{ item.startDate }}-{{ item.endDate }}
							</div>
							<div class="timeline-school">{{ item.school }}</div>
						</div>
						<ul class="timeline-details">
							<li>{{ item.details }}</li>
						</ul>
					</div>

					<el-icon
						class="trash"
						v-if="eduDelete"
						@click="confirmDeleteEdu(item.id)"
						><DeleteFilled
					/></el-icon>

					<!-- 修改 -->
					<div class="timeline-edit" v-if="eduEditState">
						<div>
							<p>起始時間：</p>
							<el-input
								class="timeInput"
								v-model="item.startDate"
								placeholder="填寫起始時間"
							></el-input>
						</div>
						<div>
							<p>結束時間：</p>
							<el-input
								class="timeInput"
								v-model="item.endDate"
								placeholder="填寫結束時間"
							></el-input>
						</div>
						<div>
							<p>學校名稱：</p>
							<el-input
								v-model="item.school"
								placeholder="填寫學校名稱"
							></el-input>
						</div>
						<div>
							<p>科系名稱：</p>
							<el-input
								v-model="item.details"
								placeholder="填寫科系名稱"
							></el-input>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 工作經歷 -->
		<div class="job">
			<div class="section-title">
				<p>工作經歷</p>
				<div>
					<div
						v-if="
							props.allEditState && !jobEditState && !jobAddNew && !jobDelete
						"
					>
						<el-dropdown>
							<el-icon :size="20"><Edit /></el-icon>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item @click="addJobData"
										><el-icon><Plus /></el-icon>新增</el-dropdown-item
									>
									<el-dropdown-item @click="editJobData"
										><el-icon><EditPen /></el-icon>修改</el-dropdown-item
									>
									<el-dropdown-item @click="deleteJobData"
										><el-icon><DeleteFilled /></el-icon>刪除</el-dropdown-item
									>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
					<div v-if="jobAddNew">
						<el-icon :size="24" @click="confirmAddJob"><Check /></el-icon>
						<el-icon :size="24" @click="cancelAddJob"><Close /></el-icon>
					</div>
					<div v-if="jobEditState">
						<el-icon :size="24" @click="finishEditJob()"><Check /></el-icon>
						<el-icon :size="24" @click="cancelEditJob"><Close /></el-icon>
					</div>
					<div v-if="jobDelete">
						<el-icon :size="24" @click="cancelDeleteJob"><Close /></el-icon>
					</div>
				</div>
			</div>

			<div class="timelines">
				<!-- 新增 -->
				<div class="addNewBlock" v-if="jobAddNew">
					<div>
						<p>起始時間：</p>
						<el-input
							v-model="addJobStartDate"
							placeholder="填寫起始時間"
						></el-input>
					</div>
					<div>
						<p>結束時間：</p>
						<el-input
							v-model="addJobEndDate"
							placeholder="填寫結束時間"
						></el-input>
					</div>
					<div>
						<p>公司名稱：</p>
						<el-input
							v-model="addCompany"
							placeholder="填寫公司名稱"
						></el-input>
					</div>
					<div>
						<p>職位：</p>
						<el-input v-model="addJob" placeholder="填寫職位"></el-input>
					</div>
					<div>
						<p>工作內容：</p>
						<div
							v-for="(detail, index) in addJobDetails"
							:key="index"
							class="detail-item"
						>
							<el-input
								v-model="addJobDetails[index]"
								placeholder="填寫工作內容"
							/>
						</div>

						<div class="detail-add-row">
							<el-input
								v-model="addJobDetailsInput"
								placeholder="填寫工作內容"
								@keyup.enter="handleAddJobDetail"
							/>
							<el-icon class="add-icon" @click="handleAddJobDetail">
								<Plus />
							</el-icon>
						</div>
					</div>
				</div>

				<div v-for="item in copyJob" :key="item.id" class="timeline">
					<div v-if="!jobEditState">
						<div class="timeline-info">
							<div class="timeline-date">
								{{ item.startData }}-{{ item.endData }}
							</div>
							<div class="timeline-company">{{ item.company }}</div>
							<div class="timeline-job">{{ item.job }}</div>
						</div>
						<ul class="timeline-details">
							<li v-for="(d, i) in item.details" :key="i">
								{{ d }}
							</li>
						</ul>
					</div>

					<el-icon
						class="trash"
						v-if="jobDelete"
						@click="confirmDeleteJob(item.id)"
					>
						<DeleteFilled />
					</el-icon>

					<!-- 修改 -->
					<div class="timeline-edit" v-if="jobEditState">
						<div>
							<p>起始時間：</p>
							<el-input
								class="timeInput"
								v-model="item.startData"
								placeholder="填寫起始時間"
							></el-input>
						</div>
						<div>
							<p>結束時間：</p>
							<el-input
								class="timeInput"
								v-model="item.endData"
								placeholder="填寫結束時間"
							></el-input>
						</div>
						<div>
							<p>公司名稱：</p>
							<el-input
								v-model="item.company"
								placeholder="填寫公司名稱"
							></el-input>
						</div>
						<div>
							<p>職位：</p>
							<el-input v-model="item.job" placeholder="填寫職位"></el-input>
						</div>
						<div>
							<p>工作內容：</p>
							<div
								v-for="(detail, detailIndex) in item.details"
								:key="detailIndex"
								style="margin-bottom: 10px"
							>
								<el-input
									v-model="item.details[detailIndex]"
									placeholder="填寫工作內容"
								/>
							</div>
							<el-icon @click="addDetail(item)"><Plus /></el-icon>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 專業技能 -->
		<div class="major">
			<div class="section-title">
				<p>專業技能</p>
				<div>
					<div v-if="props.allEditState && !skillEditState && !skillAddNew">
						<el-dropdown>
							<el-icon :size="20"><Edit /></el-icon>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item @click="addSkillData"
										><el-icon><Plus /></el-icon>新增</el-dropdown-item
									>
									<el-dropdown-item @click="editSkillData"
										><el-icon><EditPen /></el-icon>修改</el-dropdown-item
									>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
					<div v-if="skillAddNew">
						<el-icon :size="24" @click="confirmAddSkill()"><Check /></el-icon>
						<el-icon :size="24" @click="cancelAddSkill"><Close /></el-icon>
					</div>
					<div v-if="skillEditState">
						<el-icon :size="24" @click="finishEditSkill()"><Check /></el-icon>
						<el-icon :size="24" @click="cancelEditSkill"><Close /></el-icon>
					</div>
				</div>
			</div>
			<div class="know_text">
				<ul class="know_items">
					<!-- 新增 -->
					<div class="addNewBlock" v-if="skillAddNew">
						<div>
							<div
								v-for="(detail, index) in addSkill"
								:key="index"
								class="detail-item"
							>
								<el-input
									v-model="addSkill[index]"
									placeholder="填寫專業技能"
								/>
							</div>
							<el-input
								v-model="addSkillInput"
								placeholder="填寫專業技能"
								@keyup.enter="handleAddSkill"
							>
							</el-input>
							<el-icon class="add-icon" @click="handleAddSkill">
								<Plus />
							</el-icon>
						</div>
					</div>
					<li v-for="item in copySkills" :key="item.skill" class="know_item">
						<span v-if="!skillEditState">{{ item.skill }}</span>
						<!-- 修改 -->
						<div v-if="skillEditState">
							<div>
								<el-input
									v-model="item.skill"
									placeholder="填寫專業技能"
									clearable
								></el-input>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<!-- 聯絡方式 -->
		<div class="info">
			<div class="section-title">
				<p>聯絡方式</p>
				<div>
					<div v-if="props.allEditState && !contactEditState">
						<el-dropdown>
							<el-icon :size="20"><Edit /></el-icon>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item @click="editContactData"
										><el-icon><EditPen /></el-icon>修改</el-dropdown-item
									>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
					<div v-if="contactEditState">
						<el-icon :size="24" @click="confirmAddContact()"><Check /></el-icon>
						<el-icon :size="24" @click="cancelAddContact"><Close /></el-icon>
					</div>
				</div>
			</div>
			<div class="know_text" v-for="item in copyContacts" :key="item.mail">
				<ul class="contact_items">
					<li class="contact_item">
						📧
						<span v-if="!contactEditState">{{ item.mail }}</span>
						<div v-if="contactEditState">
							<el-input
								v-model="item.mail"
								placeholder="填寫信箱"
								clearable
							></el-input>
						</div>
					</li>
					<li class="contact_item">
						📞
						<span v-if="!contactEditState">{{ item.phone }}</span>
						<div v-if="contactEditState">
							<el-input
								v-model="item.phone"
								placeholder="填寫電話"
								clearable
							></el-input>
						</div>
					</li>
					<li class="contact_item">
						📍
						<span v-if="!contactEditState">{{ item.address }}</span>
						<div v-if="contactEditState">
							<el-input
								v-model="item.address"
								placeholder="填寫地址"
								clearable
							></el-input>
						</div>
					</li>
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
import axios from "axios";
import { ref, onMounted, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useHomeStore } from "@/store/homeStore";

const homeStore = useHomeStore();
const contacts = ref([]);
const copyContacts = ref([]);

const education = ref([]);
const copyEducation = ref([]);

const job = ref([]);
const copyJob = ref([]);

const skills = ref([]);
const copySkills = ref([]);

const eduEditState = ref(false);
const eduAddNew = ref(false);
const eduDelete = ref(false);

const jobEditState = ref(false);
const jobAddNew = ref(false);
const jobDelete = ref(false);

const skillEditState = ref(false);
const skillAddNew = ref(false);

const contactEditState = ref(false);

const addEduStartDate = ref("");
const addEduEndDate = ref("");
const addSchool = ref("");
const addEduDetails = ref("");

const addJobStartDate = ref("");
const addJobEndDate = ref("");
const addCompany = ref("");
const addJob = ref("");
const addJobDetails = ref([]);
const addJobDetailsInput = ref("");

const addSkill = ref<string[]>([]);
const addSkillInput = ref("");

const props = defineProps<{
	allEditState: boolean;
}>();

onMounted(async () => {
	await getEducation();
	await getJob();
	await getSkills();
	await getContacts();
});

const getContacts = async () => {
	const data = await homeStore.getContactsData();
	contacts.value = data;
	copyContacts.value = JSON.parse(JSON.stringify(data));
};

const getEducation = async () => {
	const data = await homeStore.getEducationData();
	education.value = data;
	copyEducation.value = JSON.parse(JSON.stringify(data));
};

const getJob = async () => {
	const data = await homeStore.getJobData();
	job.value = data;
	copyJob.value = JSON.parse(JSON.stringify(data));
};

const getSkills = async () => {
	const data = await homeStore.getSkillsData();
	skills.value = data;
	copySkills.value = JSON.parse(JSON.stringify(data));
};

const addEduData = () => {
	eduAddNew.value = true;
};
const editEduData = () => {
	eduEditState.value = true;
};
const deleteEduData = () => {
	eduDelete.value = true;
};

const addJobData = () => {
	jobAddNew.value = true;
};
const editJobData = () => {
	jobEditState.value = true;
};
const deleteJobData = () => {
	jobDelete.value = true;
};

const addSkillData = () => {
	skillAddNew.value = true;
};
const editSkillData = () => {
	skillEditState.value = true;
};

const editContactData = () => {
	contactEditState.value = true;
};

const confirmAddEdu = async () => {
	if (
		!addEduStartDate.value ||
		!addEduEndDate.value ||
		!addSchool.value ||
		!addEduDetails.value
	) {
		ElMessage.error(`格子不可空白`);
		return;
	}

	const payload = {
		startDate: addEduStartDate.value,
		endDate: addEduEndDate.value,
		school: addSchool.value,
		details: addEduDetails.value,
	};
	await homeStore.postEducationData(payload);

	addEduStartDate.value = "";
	addEduEndDate.value = "";
	addSchool.value = "";
	addEduDetails.value = "";

	await getEducation();
	eduAddNew.value = false;
	ElMessage.success(`新增成功`);
};

const cancelAddEdu = () => {
	eduAddNew.value = false;
	addEduStartDate.value = "";
	addEduEndDate.value = "";
	addSchool.value = "";
	addEduDetails.value = "";
};

const cancelEditEdu = () => {
	// copyContacts.value = contacts.value;
	copyEducation.value = education.value;

	eduEditState.value = false;
};

const cancelDeleteEdu = () => {
	eduDelete.value = false;
};

const confirmDeleteEdu = async (id) => {
	await ElMessageBox.confirm("是否確認刪除", "警告", {
		confirmButtonText: "確定",
		cancelButtonText: "取消",
		type: "warning",
		closeOnClickModal: false,
		closeOnPressEscape: false,
	})
		.then(async () => {
			try {
				await homeStore.deleteEducationData(id);
				await getEducation();
				eduDelete.value = false;
				ElMessage.success(`刪除成功`);
			} catch (error) {
				console.log(error);
			}
		})
		.catch(() => {
			// 使用者點擊取消或關閉對話框
		});
};

const finishEditEdu = async () => {
	await homeStore.putEducationData(copyEducation.value);
	await getEducation();
	eduEditState.value = false;
	ElMessage.success(`修改成功`);
};

const confirmAddJob = async () => {
	handleAddJobDetail();

	if (
		!addJobStartDate.value ||
		!addJobEndDate.value ||
		!addCompany.value ||
		!addJob.value
	) {
		ElMessage.error(`格子不可空白`);
		return;
	}

	const payload = {
		startData: addJobStartDate.value,
		endData: addJobEndDate.value,
		company: addCompany.value,
		job: addJob.value,
		details: addJobDetails.value,
	};

	await homeStore.postJobData(payload);
	await getJob();
	jobAddNew.value = false;
	ElMessage.success(`新增成功`);
};

const handleAddJobDetail = () => {
	const value = addJobDetailsInput.value.trim();
	if (!value) return;

	addJobDetails.value.push(value);
	addJobDetailsInput.value = "";
};

const cancelAddJob = () => {
	(addJobStartDate.value = ""),
		(addJobEndDate.value = ""),
		(addCompany.value = ""),
		(addJob.value = ""),
		(addJobDetailsInput.value = "");
	(addJobDetails.value = []), (jobAddNew.value = false);
};

const addDetail = (item) => {
	if (!item.details) return;
	if (!Array.isArray(item.details)) {
		item.details = [];
	}
	item.details.push("");
};

const finishEditJob = async () => {
	await homeStore.putJobData(copyJob.value);
	await getJob();
	jobEditState.value = false;
	ElMessage.success(`修改成功`);
};

const cancelEditJob = () => {
	copyJob.value = job.value;
	jobEditState.value = false;
};

const cancelDeleteJob = () => {
	jobDelete.value = false;
};

const confirmDeleteJob = async (id: number) => {
	await ElMessageBox.confirm("是否確認刪除", "警告", {
		confirmButtonText: "確定",
		cancelButtonText: "取消",
		type: "warning",
		closeOnClickModal: false,
		closeOnPressEscape: false,
	})
		.then(async () => {
			try {
				await homeStore.deleteJobData(id);
				await getJob();
				jobDelete.value = false;
				ElMessage.success(`刪除成功`);
			} catch (error) {
				console.log(error);
			}
		})
		.catch(() => {
			// 使用者點擊取消或關閉對話框
		});
	jobDelete.value = false;
};

const handleAddSkill = () => {
	const value = addSkillInput.value.trim();
	if (!value) return;

	addSkill.value.push(value);
	addSkillInput.value = "";
};

const confirmAddSkill = async () => {
	handleAddSkill();
	console.log(addSkill.value);

	const payload = addSkill.value.map((item: any) => ({
		skill: item,
	}));

	await homeStore.postSkillsData(payload);

	await getSkills();
	skillAddNew.value = false;
	ElMessage.success(`新增成功`);
};

const cancelAddSkill = () => {
	addSkill.value = [];
	addSkillInput.value = "";
	skillAddNew.value = false;
};

const finishEditSkill = async () => {
	console.log(copySkills.value);

	await homeStore.putSkillsData(copySkills.value);

	await getSkills();
	skillEditState.value = false;
	ElMessage.success(`修改成功`);
};

const cancelEditSkill = () => {
	copySkills.value = JSON.parse(JSON.stringify(skills.value));
	skillEditState.value = false;
};

const confirmAddContact = async () => {
	console.log(copyContacts.value);

	await homeStore.putContactsData(copyContacts.value);

	await getContacts();
	contactEditState.value = false;
	ElMessage.success(`新增成功`);
};

const cancelAddContact = () => {
	copyContacts.value = contacts.value;
	contactEditState.value = false;
};

// const allEditState = ref(false);
// watch(
// 	() => props.allEditState,
// 	(newVal) => {
// 		allEditState.value = newVal;
// 		console.log(allEditState.value);
// 	}
// )
</script>

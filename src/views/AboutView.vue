<template>
	<div class="content">
		<div class="portfolio">
			<div class="section-title">
				<h2>作品集</h2>
			</div>
			<div class="know_text">
				<ul class="know_items portfolio">
					<li
						v-for="(item, index) in works"
						:key="index"
						class="know_item portfolio"
					>
						<a :href="item.href" target="_blank" rel="noopener">
							<img :src="item.imgSrc" :alt="item.name" />
							<span>{{ item.name }}</span>
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
<script>
export default {
	data() {
		return {
			works: [
				{
					name: "首登網銀會員 最高拿300元",
					imgSrc:
						"https://bank.sinopac.com/sinopacBT/webevents/2024Q4_mma-loginfirst/images/FB.jpg",
					href: "https://bank.sinopac.com/sinopacBT/webevents/2024Q4_mma-loginfirst/",
				},
				{
					name: "掌握easy app",
					imgSrc: require("@/assets/images/banner_easy.png"),
					href: "https://easy.sinopac.com/index_TW_HK.html",
				},
				{
					name: "門轉享好康",
					imgSrc: require("@/assets/images/banner_BT.png"),
					href: "https://bank.sinopac.com/sinopacBT/webevents/ec/phonetransfer/event/",
				},
				{
					name: "警覺詐騙 保護自己",
					imgSrc:
						"https://bank.sinopac.com/sinopacBT/webevents/fraudprevention/images/share.jpg",
					href: "https://bank.sinopac.com/sinopacBT/webevents/fraudprevention/",
				},
				{
					name: "永豐ATM 存提e手掌",
					imgSrc:
						"https://bank.sinopac.com/sinopacBT/webevents/sinopacatm/images/og.jpg",
					href: "https://bank.sinopac.com/sinopacBT/webevents/sinopacatm/",
				},
				{
					name: "成為永豐網銀會員",
					imgSrc:
						"https://bank.sinopac.com/sinopacBT/webevents/ec/mmapromotion/images/BN_1200x630.jpg",
					href: "https://bank.sinopac.com/sinopacBT/webevents/ec/mmapromotion/index.html",
				},
				{
					name: "策略人才甄選計畫",
					imgSrc:
						"https://bank.sinopac.com/sinopacBT/webevents/ma/images/OK_FB.jpeg",
					href: "https://bank.sinopac.com/sinopacBT/webevents/ma/index.html#section-process",
				},
				{
					name: "PLANET VOYAGER星際旅遊",
					imgSrc:
						"https://tibamef2e.com/chd103/g3/PlanetVoyager/img/banner.png",
					href: "https://tibamef2e.com/chd103/g3/PlanetVoyager/",
				},
				{
					name: "艾凡酒店",
					imgSrc: require("@/assets/images/banner_aevum.jpg"),
					href: "https://uting1214.github.io/aevum/",
				},
				{
					name: "立達廣告整合行銷有限公司",
					imgSrc: "https://www.examorg.com.tw/images/logo_fb.jpg",
					href: "https://www.examorg.com.tw/",
				},
				{
					name: "立達清潔公司",
					imgSrc: "https://www.all.org.tw/images/index_fb.jpg",
					href: "https://www.all.org.tw/",
				},
				{
					name: "兆豐聯合電機技師事務所",
					imgSrc: require("@/assets/images/banner_eelinn.jpg"),
					href: "https://www.eelinn.com.tw/",
				},
			],
		};
	},
};
</script>

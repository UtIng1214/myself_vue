// import { getWeatherData } from './api/weatherApi';
export default {
  name: "HomeView",
  data() {
    return {
      // weather: null,
      educationList: [
        {
          date: "2023/6-10",
          school: "培訓課程",
          details: "商研院前端工程師專業技術養成班",
        },
        {
          date: "2020 - 2022",
          school: "國立台北護理健康大學",
          details: "醫護教育暨數位學習系學士畢業",
        },
      ],
      jobList: [
        {
          date: "2023/12-2024/12",
          job: "北祥服務科技股份有限公司 前端工程師",
          details: [
            "開發永豐銀行內部資訊網站 - 永豐雲chat",
            "製作永豐銀行行銷頁面",
            "永豐銀行新行動銀行app專案整理",
            "永豐銀行新行動銀行app頁面改版製作",
            "永豐銀行新版網路銀行app ui測試",
          ],
        },
        {
          date: "2022/6-2023/6",
          job: "立達徵信社 前端助理工程師",
          details: [
            "舊有網站修改、更新、美化、新增RWD、SEO優化",
            "製作公司受委託之網站—立達廣告整合行銷有限公司、兆豐聯合電機技師事務所、立達清潔公司",
          ],
        },
      ],
      // works: [
      //   { name: "首登網銀會員 最高拿300元（請點選）", href: "https://bank.sinopac.com/sinopacBT/webevents/2024Q4_mma-loginfirst/" },
      //   { name: "掌握easy app（請點選）", href: "https://easy.sinopac.com/index_TW_HK.html" },
      //   { name: "門轉享好康（請點選）", href: "https://bank.sinopac.com/sinopacBT/webevents/ec/phonetransfer/event/" },
      //   { name: "警覺詐騙 保護自己（請點選）", href: "https://bank.sinopac.com/sinopacBT/webevents/fraudprevention/" },
      //   { name: "永豐ATM 存提e手掌（請點選）", href: "https://bank.sinopac.com/sinopacBT/webevents/sinopacatm/" },
      //   { name: "成為永豐網銀會員（請點選）", href: "https://bank.sinopac.com/sinopacBT/webevents/ec/mmapromotion/index.html" },
      //   { name: "策略人才甄選計畫（請點選）", href: "https://bank.sinopac.com/sinopacBT/webevents/ma/index.html#section-process" },
      //   { name: "PLANET VOYAGER星際旅遊（請點選）", href: "https://tibamef2e.com/chd103/g3/PlanetVoyager/" },
      //   { name: "艾凡酒店（請點選）", href: "https://uting1214.github.io/aevum/" },
      //   { name: "立達廣告整合行銷有限公司（請點選）", href: "https://www.examorg.com.tw/" },
      //   { name: "立達清潔公司（請點選）", href: "https://www.all.org.tw/" },
      //   { name: "兆豐聯合電機技師事務所（請點選）", href: "https://www.eelinn.com.tw/" },
      // ],
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "jQuery",
        "Vue",
        "MySQL",
        "PHP",
        "SASS",
        "Git",
        "Bootstrap",
      ],
      contact: {
        address: "新北市三峽區中園街86巷4號4樓",
        email: "tyting.ut@gmail.com",
        phone: "0928041536",
      },
    };
  },
  // async created() {
  //   try {
  //     const response = await getWeatherData('F-C0032-001', {
  //       locationName: '新北市',
  //     });
  //     const weatherData = response.data.records.location[0];
  //     this.weather = {
  //       locationName: weatherData.locationName,
  //       temperature: weatherData.weatherElement[4].time[0].parameter.parameterName,
  //     };
  //   } catch (error) {
  //     console.error('無法獲取天氣資訊', error);
  //   }
  // },
};
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
          company: "北祥服務科技股份有限公司",
          job: "前端工程師",
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
          company: "立達徵信社",
          job: "前端助理工程師",
          details: [
            "舊有網站修改、更新、美化、新增RWD、SEO優化",
            "製作公司受委託之網站—立達廣告整合行銷有限公司、兆豐聯合電機技師事務所、立達清潔公司",
          ],
        },
      ],
      skills: [
        "Vue3",
        "TypeScript",
        "JavaScript",
        "SASS/SCSS",
        "串API",
        "Git版控",
        "MySQL",
        "Bootstrap",
        "CSS",
        "HTML",
        // "jQuery",
        // "PHP",
      ],
      contact: {
        // address: "新北市三峽區中園街86巷4號4樓",
        email: "tyting.ut@gmail.com",
        phone: "0928041536",
      },
    };
  },
};
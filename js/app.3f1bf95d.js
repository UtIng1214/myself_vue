(function(){"use strict";var e={551:function(e,t,n){var a=n(751),i=n(641),o=n(33);const r={class:"link"},s={class:"weather"},l={key:0,class:"weather-info"},c={key:1};function u(e,t,n,a,u,d){const v=(0,i.g2)("router-link"),f=(0,i.g2)("router-view");return(0,i.uX)(),(0,i.CE)(i.FK,null,[(0,i.Lk)("nav",null,[(0,i.Lk)("div",r,[(0,i.bF)(v,{to:"/"},{default:(0,i.k6)((()=>t[0]||(t[0]=[(0,i.eW)("我的資訊")]))),_:1}),t[2]||(t[2]=(0,i.eW)(" | ")),(0,i.bF)(v,{to:"/about"},{default:(0,i.k6)((()=>t[1]||(t[1]=[(0,i.eW)("作品集")]))),_:1})]),(0,i.Lk)("div",s,[t[4]||(t[4]=(0,i.Lk)("p",null,"天氣資訊",-1)),u.weather?((0,i.uX)(),(0,i.CE)("div",l,[(0,i.Lk)("p",null,"地點: "+(0,o.v_)(u.weather.locationName),1),(0,i.Lk)("p",null,"溫度: "+(0,o.v_)(u.weather.temperature)+" °C",1)])):((0,i.uX)(),(0,i.CE)("div",c,t[3]||(t[3]=[(0,i.Lk)("p",null,"載入中...",-1)])))])]),(0,i.bF)(f)],64)}var d=n(335);const v="CWA-419ED68B-3CD4-46D0-B131-87DF1DBE0A65",f="https://opendata.cwa.gov.tw/api/v1/rest/datastore",m=d.A.create({baseURL:f,params:{Authorization:v}}),p=(e,t={})=>m.get(`/${e}`,{params:t});var b={data(){return{weather:null}},async created(){try{const e=await p("F-C0032-001",{locationName:"新北市"}),t=e.data.records.location[0];this.weather={locationName:t.locationName,temperature:t.weatherElement[4].time[0].parameter.parameterName}}catch(e){console.error("無法獲取天氣資訊",e)}}},h=n(262);const k=(0,h.A)(b,[["render",u]]);var y=k,L=n(220),g=n.p+"img/my_pic.cbff2dd3.png";const _={class:"content"},w={class:"educational"},E={class:"timelines"},C={class:"timeline-info"},j={class:"timeline-date"},A={class:"timeline-school"},S={class:"timeline-details"},O={class:"job"},F={class:"timelines"},N={class:"timeline-info"},X={class:"timeline-date"},T={class:"timeline-job"},x={class:"timeline-details"},B={class:"major"},D={class:"know_text"},P={class:"know_items"},I={class:"info"},K={class:"know_text"},M={class:"contact_items"},W={class:"contact_item"},H={class:"contact_item"},R={class:"contact_item"};function U(e,t,n,a,r,s){return(0,i.uX)(),(0,i.CE)("div",_,[t[4]||(t[4]=(0,i.Fv)('<div class="main" data-v-b53147b2><div class="pic" data-v-b53147b2><div class="bg" data-v-b53147b2></div><div class="my_pic" data-v-b53147b2><img src="'+g+'" alt="myslef" data-v-b53147b2></div></div><div class="introduce" data-v-b53147b2><div class="name" data-v-b53147b2><h1 data-v-b53147b2>譚郁亭</h1><div class="position" data-v-b53147b2>應徵職位<br data-v-b53147b2>-前端工程師</div></div><div class="aboutMe" data-v-b53147b2><div class="title" data-v-b53147b2>ABOUT ME</div><div class="text" data-v-b53147b2> 擁有2年網站與應用程式開發經驗。 <br data-v-b53147b2> 在北祥服務科技期間，我負責開發永豐銀行內部資訊網站及行銷頁面，並參與新行動銀行 App 的改版與測試工作。 <br data-v-b53147b2> 在立達徵信社，我專注於舊網站優化、美化及 RWD、SEO 改善，並成功製作多個委託網站。我注重細節與品質，能有效解決問題，為團隊創造價值。 </div></div></div></div>',1)),(0,i.Lk)("div",w,[t[0]||(t[0]=(0,i.Lk)("div",{class:"section-title"},[(0,i.Lk)("h2",null,"學歷")],-1)),(0,i.Lk)("div",E,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(e.educationList,((e,t)=>((0,i.uX)(),(0,i.CE)("div",{key:t,class:"timeline"},[(0,i.Lk)("div",C,[(0,i.Lk)("div",j,(0,o.v_)(e.date),1),(0,i.Lk)("div",A,(0,o.v_)(e.school),1)]),(0,i.Lk)("ul",S,[(0,i.Lk)("li",null,(0,o.v_)(e.details),1)])])))),128))])]),(0,i.Lk)("div",O,[t[1]||(t[1]=(0,i.Lk)("div",{class:"section-title"},[(0,i.Lk)("h2",null,"工作經歷")],-1)),(0,i.Lk)("div",F,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(e.jobList,((e,t)=>((0,i.uX)(),(0,i.CE)("div",{key:t,class:"timeline"},[(0,i.Lk)("div",N,[(0,i.Lk)("div",X,(0,o.v_)(e.date),1),(0,i.Lk)("div",T,(0,o.v_)(e.job),1)]),(0,i.Lk)("ul",x,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(e.details,((e,t)=>((0,i.uX)(),(0,i.CE)("li",{key:t},(0,o.v_)(e),1)))),128))])])))),128))])]),(0,i.Lk)("div",B,[t[2]||(t[2]=(0,i.Lk)("div",{class:"section-title"},[(0,i.Lk)("h2",null,"專業技能")],-1)),(0,i.Lk)("div",D,[(0,i.Lk)("ul",P,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(e.skills,((e,t)=>((0,i.uX)(),(0,i.CE)("li",{key:t,class:"know_item"},(0,o.v_)(e),1)))),128))])])]),(0,i.Lk)("div",I,[t[3]||(t[3]=(0,i.Lk)("div",{class:"section-title"},[(0,i.Lk)("h2",null,"聯絡方式")],-1)),(0,i.Lk)("div",K,[(0,i.Lk)("ul",M,[(0,i.Lk)("li",W,"📍 "+(0,o.v_)(e.contact.address),1),(0,i.Lk)("li",H,"📧 "+(0,o.v_)(e.contact.email),1),(0,i.Lk)("li",R,"📞 "+(0,o.v_)(e.contact.phone),1)])])])])}var q={name:"HomeView",data(){return{educationList:[{date:"2023/6-10",school:"培訓課程",details:"商研院前端工程師專業技術養成班"},{date:"2020 - 2022",school:"國立台北護理健康大學",details:"醫護教育暨數位學習系學士畢業"}],jobList:[{date:"2023/12-2024/12",job:"北祥服務科技股份有限公司 前端工程師",details:["開發永豐銀行內部資訊網站 - 永豐雲chat","製作永豐銀行行銷頁面","永豐銀行新行動銀行app專案整理","永豐銀行新行動銀行app頁面改版製作","永豐銀行新版網路銀行app ui測試"]},{date:"2022/6-2023/6",job:"立達徵信社 前端助理工程師",details:["舊有網站修改、更新、美化、新增RWD、SEO優化","製作公司受委託之網站—立達廣告整合行銷有限公司、兆豐聯合電機技師事務所、立達清潔公司"]}],skills:["HTML","CSS","JavaScript","jQuery","Vue","MySQL","PHP","SASS","Git","Bootstrap"],contact:{address:"新北市三峽區中園街86巷4號4樓",email:"tyting.ut@gmail.com",phone:"0928041536"}}}};const Q=(0,h.A)(q,[["render",U],["__scopeId","data-v-b53147b2"]]);var V=Q;const $=[{path:"/",name:"home",component:V},{path:"/about",name:"about",component:()=>n.e(594).then(n.bind(n,158))}],z=(0,L.aE)({history:(0,L.LA)("/myself_vue/"),routes:$});var G=z,J=n(278),Y=(0,J.y$)({state:{},getters:{},mutations:{},actions:{},modules:{}});(0,a.Ef)(y).use(Y).use(G).mount("#app")}},t={};function n(a){var i=t[a];if(void 0!==i)return i.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,a,i,o){if(!a){var r=1/0;for(u=0;u<e.length;u++){a=e[u][0],i=e[u][1],o=e[u][2];for(var s=!0,l=0;l<a.length;l++)(!1&o||r>=o)&&Object.keys(n.O).every((function(e){return n.O[e](a[l])}))?a.splice(l--,1):(s=!1,o<r&&(r=o));if(s){e.splice(u--,1);var c=i();void 0!==c&&(t=c)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[a,i,o]}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,a){return n.f[a](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/about.f22bac6e.js"}}(),function(){n.miniCssF=function(e){return"css/about.f0af0fd8.css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="my-vue:";n.l=function(a,i,o,r){if(e[a])e[a].push(i);else{var s,l;if(void 0!==o)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==a||d.getAttribute("data-webpack")==t+o){s=d;break}}s||(l=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+o),s.src=a),e[a]=[i];var v=function(t,n){s.onerror=s.onload=null,clearTimeout(f);var i=e[a];if(delete e[a],s.parentNode&&s.parentNode.removeChild(s),i&&i.forEach((function(e){return e(n)})),t)return t(n)},f=setTimeout(v.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=v.bind(null,s.onerror),s.onload=v.bind(null,s.onload),l&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/myself_vue/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,a,i,o){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css",n.nc&&(r.nonce=n.nc);var s=function(n){if(r.onerror=r.onload=null,"load"===n.type)i();else{var a=n&&n.type,s=n&&n.target&&n.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+a+": "+s+")");l.name="ChunkLoadError",l.code="CSS_CHUNK_LOAD_FAILED",l.type=a,l.request=s,r.parentNode&&r.parentNode.removeChild(r),o(l)}};return r.onerror=r.onload=s,r.href=t,a?a.parentNode.insertBefore(r,a.nextSibling):document.head.appendChild(r),r},t=function(e,t){for(var n=document.getElementsByTagName("link"),a=0;a<n.length;a++){var i=n[a],o=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(o===e||o===t))return i}var r=document.getElementsByTagName("style");for(a=0;a<r.length;a++){i=r[a],o=i.getAttribute("data-href");if(o===e||o===t)return i}},a=function(a){return new Promise((function(i,o){var r=n.miniCssF(a),s=n.p+r;if(t(r,s))return i();e(a,s,null,i,o)}))},i={524:0};n.f.miniCss=function(e,t){var n={594:1};i[e]?t.push(i[e]):0!==i[e]&&n[e]&&t.push(i[e]=a(e).then((function(){i[e]=0}),(function(t){throw delete i[e],t})))}}}(),function(){var e={524:0};n.f.j=function(t,a){var i=n.o(e,t)?e[t]:void 0;if(0!==i)if(i)a.push(i[2]);else{var o=new Promise((function(n,a){i=e[t]=[n,a]}));a.push(i[2]=o);var r=n.p+n.u(t),s=new Error,l=function(a){if(n.o(e,t)&&(i=e[t],0!==i&&(e[t]=void 0),i)){var o=a&&("load"===a.type?"missing":a.type),r=a&&a.target&&a.target.src;s.message="Loading chunk "+t+" failed.\n("+o+": "+r+")",s.name="ChunkLoadError",s.type=o,s.request=r,i[1](s)}};n.l(r,l,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,a){var i,o,r=a[0],s=a[1],l=a[2],c=0;if(r.some((function(t){return 0!==e[t]}))){for(i in s)n.o(s,i)&&(n.m[i]=s[i]);if(l)var u=l(n)}for(t&&t(a);c<r.length;c++)o=r[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(u)},a=self["webpackChunkmy_vue"]=self["webpackChunkmy_vue"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[504],(function(){return n(551)}));a=n.O(a)})();
//# sourceMappingURL=app.3f1bf95d.js.map
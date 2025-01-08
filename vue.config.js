// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
// })
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/YuTing/' //為github的專案名稱
    : '/'
}
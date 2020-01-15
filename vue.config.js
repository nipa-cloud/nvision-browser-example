module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  "configureWebpack": {
    "resolve": {
      "alias": {
        "@nipacloud/nvision": "@nipacloud/nvision/dist/browser/nvision.js"
      }
    }
  }
}
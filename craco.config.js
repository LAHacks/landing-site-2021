const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
  webpack: {
    plugins: {
      add: [
        new DashboardPlugin({ port: 3003 })
      ]
    }
  }
}

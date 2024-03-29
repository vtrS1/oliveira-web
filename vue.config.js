module.exports = {
  publicPath: "/",
  transpileDependencies: ["vue-echarts", "resize-detector"],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "all"
      },
      minimize: true
    }
  }
};

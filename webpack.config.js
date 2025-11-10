const path = require("path");

module.exports = {
    entry: "./src/index.js", // 入口文件
    output: {
        path: path.resolve(__dirname, "dist"), // 打包输出路径
        filename: "track-sdk.js", // 打包后的文件名
        library: "TrackSDK", // 全局变量名（与 test.html 中一致）
        libraryTarget: "window", // 暴露到 window 对象（浏览器可直接访问）
        libraryExport: "default", // 关键：直接暴露默认导出的 TrackSDK 对象
        globalObject: "this" // 兼容非浏览器环境
    },
    mode: "development", // 开发模式（代码不压缩，方便调试）
    module: {
        rules: [
            {
                test: /\.js$/, // 处理所有 .js 文件
                exclude: /node_modules/, // 排除第三方依赖
                use: "babel-loader" // 转义 ES6 语法
            }
        ]
    }
};
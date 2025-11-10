// 引入追踪功能模块
import { initClickTracker } from "./Tracker/ClickTracker.js";
import { initJumpTracker } from "./Tracker/JumpTracker.js";

// 定义默认配置（与 test.html 中的配置项对应）
const defaultConfig = {
    reportUrl: "", // 上报地址（必填，由用户传入）
    reportDelay: 5000, // 批量上报间隔（毫秒）
    isStealth: true // 无痕模式（过滤敏感元素）
};

// 定义 SDK 主对象，包含 init 方法（核心）
const TrackSDK = {
    // 初始化方法：接收用户配置，启动所有追踪功能
    init: function(userConfig) {
        // 合并默认配置和用户配置（用户配置优先级更高）
        const config = { ...defaultConfig, ...userConfig };

        // 验证必填项
        if (!config.reportUrl) {
            console.error("❌ 请配置 reportUrl 上报地址！");
            return;
        }

        // 启动追踪功能（传递配置给内部方法）
        initClickTracker(config);
        initJumpTracker(config);

        // 打印初始化成功日志
        console.log("✅ 埋点SDK初始化成功");
        console.log("当前配置：", config);
    }
};

// 最顶层导出（必须在文件最外层，确保语法正确）
export default TrackSDK;
// 配置文件：所有可自定义的参数集中管理
export default {
    // 数据上报地址（后续替换为实际后端接口，测试阶段用示例地址）
    reportUrl: "https://test-api.com/Track/report",
    // 无痕采集开关：true=过滤敏感元素（如密码框），false=全采集
    isStealth: true,
    // 上报间隔（毫秒）：避免频繁请求，默认5秒
    reportDelay: 5000,
};
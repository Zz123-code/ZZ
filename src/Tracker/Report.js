// 上报队列（存储待上报的所有数据）
let reportQueue = [];
// 定时上报的计时器（避免频繁请求，按 reportDelay 批量上报）
let timer = null;

/**
 * 加入上报队列
 * @param {Object} data - 单条追踪数据
 * @param {Object} config - 初始化时的配置（包含 reportUrl、reportDelay 等）
 */
export function addToQueue(data, config) {
    // 1. 将数据加入队列
    reportQueue.push(data);
    console.log("📥 加入上报队列：", data);

    // 2. 清除旧计时器，按配置的延迟时间（reportDelay）触发上报
    clearTimeout(timer);
    timer = setTimeout(() => {
        // 到时间后执行上报
        sendReport(config);
    }, config.reportDelay);
}

/**
 * 实际上报数据到接口
 * @param {Object} config - 包含上报地址（reportUrl）
 */
function sendReport(config) {
    // 如果队列为空，直接返回
    if (reportQueue.length === 0) return;

    // 3. 使用 config 中的上报地址发送请求
    fetch(config.reportUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // 告诉后端数据格式是 JSON
        },
        body: JSON.stringify({
            events: reportQueue, // 批量上报队列中的所有数据
            timestamp: Date.now() // 附加当前时间戳
        })
    })
        .then(response => {
            if (response.ok) {
                console.log("📤 上报成功！共上报", reportQueue.length, "条数据");
                reportQueue = []; // 上报成功后清空队列
            } else {
                console.error("❌ 上报失败，状态码：", response.status);
            }
        })
        .catch(error => {
            console.error("❌ 上报请求出错：", error);
        });
}
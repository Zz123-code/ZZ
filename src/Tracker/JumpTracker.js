import { addToQueue } from "./Report.js";

// 接收 config 参数
export function initJumpTracker(config) {
    // 监听页面内跳转（a标签点击）
    document.addEventListener("click", (e) => {
        const target = e.target.closest("a"); // 找到最近的a标签
        if (target && target.href) {
            // 采集跳转数据
            const jumpData = {
                trackType: "jump",
                targetUrl: target.href,
                elementText: target.innerText?.trim() || "",
                timestamp: Date.now()
            };
            // 传入配置，加入上报队列
            addToQueue(jumpData, config);
        }
    });

    // 监听页面关闭/刷新（离开当前页面）
    window.addEventListener("beforeunload", () => {
        const leaveData = {
            trackType: "leave",
            pageUrl: window.location.href,
            timestamp: Date.now()
        };
        // 立即上报（页面关闭前）
        addToQueue(leaveData, config);
    });
}
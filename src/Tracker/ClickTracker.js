import { addToQueue } from "./Report.js";

// 1. 接收 config 参数（从 index.js 的 init 方法传递过来）
export function initClickTracker(config) {
    // 监听文档点击事件
    document.addEventListener("click", (e) => {
        const target = e.target;

        // 2. 无痕模式逻辑：如果开启，过滤密码框
        if (config.isStealth && target.type === "password") {
            console.log("⚠️ 敏感元素（密码框）点击，已过滤");
            return; // 不执行后续上报逻辑
        }

        // 3. 采集点击数据（保持原有字段）
        const clickData = {
            trackType: "click",
            elementName: target.tagName.toLowerCase(),
            elementText: target.innerText?.trim() || "",
            elementClass: target.className || "",
            clickX: e.clientX,
            clickY: e.clientY,
            timestamp: Date.now(),
            elementType: target.type === "password" ? "password" : "normal",
        };

        // 4. 将数据和配置一起传入上报队列（关键：让上报逻辑知道 reportUrl 等信息）
        addToQueue(clickData, config);
    });
}
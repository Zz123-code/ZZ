import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
    // 1. 核心状态与引用定义
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });

    // 编辑功能状态
    const [penColor, setPenColor] = useState('#ff0000');
    const [penWidth, setPenWidth] = useState(3);

    // AI功能状态（直接设置为加载完成，不需外部模型）
    const [aiStatus] = useState('加载完成'); // 关键修改：固定为加载完成

    // 2. 画布初始化与样式更新
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }, [penColor, penWidth]);

    // 3. 鼠标绘图逻辑
    const handleMouseDown = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        isDrawing.current = true;
        lastPos.current = { x, y };
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        lastPos.current = { x: currentX, y: currentY };
    };

    const handleMouseUp = () => isDrawing.current = false;
    const handleMouseLeave = () => isDrawing.current = false;

    // 4. 清空画布功能
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // 5. 纯前端模拟AI生成（无任何外部依赖）
    // 5. 纯前端AI生成：纯线条简笔画（无任何填充，6种随机切换）
    const generateAiImage = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        clearCanvas();

        // 定义6种纯线条简笔画
        const doodles = [
            { name: 'sun', draw: drawSun },
            { name: 'house', draw: drawHouse },
            { name: 'tree', draw: drawTree },
            { name: 'heart', draw: drawHeart },
            { name: 'moon', draw: drawMoon },
            { name: 'fish', draw: drawFish }
        ];
        const randomDoodle = doodles[Math.floor(Math.random() * doodles.length)];

        // 画布中心与基础大小
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const baseSize = Math.min(canvas.width, canvas.height) / 4;

        // 线条样式配置（统一风格）
        ctx.strokeStyle = penColor; // 线条颜色跟随画笔选择
        ctx.lineWidth = 3; // 线条粗细（清晰不模糊）
        ctx.lineCap = 'round'; // 线条端点圆润
        ctx.lineJoin = 'round'; // 线条转角圆润

        // 执行线条简笔画绘制
        randomDoodle.draw(ctx, centerX, centerY, baseSize);
    };

// 辅助函数1：线条简笔画-太阳（圆形+放射线条）
    function drawSun(ctx, x, y, size) {
        // 太阳轮廓（圆形）
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.stroke();

        // 放射光芒（12根线条）
        for (let i = 0; i < 12; i++) {
            const angle = (i * Math.PI) / 4;
            const startX = x + Math.cos(angle) * size / 2;
            const startY = y + Math.sin(angle) * size / 2;
            const endX = x + Math.cos(angle) * size;
            const endY = y + Math.sin(angle) * size;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    }

// 辅助函数2：线条简笔画-小房子（矩形+三角形+门窗线条）
    function drawHouse(ctx, x, y, size) {
        // 房子主体（矩形）
        ctx.beginPath();
        ctx.rect(x - size / 2, y, size, size);
        ctx.stroke();

        // 房顶（三角形）
        ctx.beginPath();
        ctx.moveTo(x - size / 2 - 2.5, y);
        ctx.lineTo(x, y - size / 2);
        ctx.lineTo(x + size / 2 + 2.5, y);
        ctx.stroke();

        // 房门（小矩形）
        ctx.beginPath();
        ctx.rect(x - size / 8, y + size - size / 3, size / 4, size / 3);
        ctx.stroke();

        // 窗户（小正方形）
        ctx.beginPath();
        ctx.rect(x - size / 4, y + size / 4, size / 6, size / 6);
        ctx.stroke();
        ctx.beginPath();
        ctx.rect(x + size / 4 - size / 6, y + size / 4, size / 6, size / 6);
        ctx.stroke();
    }

// 辅助函数3：线条简笔画-小树（矩形树干+圆形树冠）
    function drawTree(ctx, x, y, size) {
        // 树干（矩形）
        ctx.beginPath();
        ctx.rect(x - size / 10, y + size /1.7, size / 5, size / 2);
        ctx.stroke();

        // 树冠（三角形）
        const crownSize = size / 3;
        ctx.beginPath();
        // 顶层树冠
        ctx.moveTo(x, y - crownSize); // 顶点
        ctx.lineTo(x - crownSize, y + crownSize /5); // 左底角
        ctx.lineTo(x + crownSize, y + crownSize /5); // 右底角
        ctx.closePath();
        ctx.stroke();

        // 中层树冠
        ctx.beginPath();
        ctx.moveTo(x, y); // 顶点
        ctx.lineTo(x - crownSize * 1.5, y + crownSize * 1.4); // 左底角
        ctx.lineTo(x + crownSize * 1.5, y + crownSize * 1.4); // 右底角
        ctx.closePath();
        ctx.stroke();

        // 底层树冠
        ctx.beginPath();
        ctx.moveTo(x, y + crownSize / 1,1); // 顶点
        ctx.lineTo(x - crownSize * 1.9, y + crownSize *2.2); // 左底角
        ctx.lineTo(x + crownSize * 1.9, y + crownSize * 2.2); // 右底角
        ctx.closePath();
        ctx.stroke();
    }


// 辅助函数4：线条简笔画-爱心
    function drawHeart(ctx, x, y, size) {
        const topCurveHeight = size * 0.3;

        ctx.beginPath();
        // 起点：爱心底部中点
        ctx.moveTo(x, y + size / 1);

        // 左侧贝塞尔曲线
        ctx.bezierCurveTo(
            x - size / 2, y + size / 4,      // 控制点1：左下
            x - size / 2, y - topCurveHeight, // 控制点2：左上
            x, y - topCurveHeight  /20           // 终点：顶部中点
        );

        // 右侧贝塞尔曲线
        ctx.bezierCurveTo(
            x + size / 2, y - topCurveHeight, // 控制点1：右上
            x + size / 2, y + size /4,       // 控制点2：右下
            x, y + size // 终点：底部中点

        );
        ctx.closePath();
        ctx.strokeStyle =penColor;
        ctx.lineWidth = 3;
        ctx.stroke();
    }


// // 辅助函数5：线条简笔画-月亮
    function drawMoon(ctx, x, y, size) {
        ctx.save();

        ctx.lineWidth = 3;
        ctx.strokeStyle = penColor;
        ctx.fillStyle = 'transparent'; // 不填充

        const radiusOuter = size / 1.5;
        const radiusInner = radiusOuter * 0.98;
        const offsetX = radiusOuter * 0.6;

        ctx.beginPath();

        // 大圆半圆弧（顺时针）
        ctx.arc(x, y, radiusOuter, Math.PI / 2.4, Math.PI * 1.55, false);

        // 小圆半圆弧（逆时针）
        ctx.arc(x + offsetX, y, radiusInner, Math.PI * 1.4, Math.PI / 1.7, true);

        ctx.closePath();

        ctx.stroke();

        ctx.restore();
    }




// 辅助函数6：线条简笔画-小鱼（椭圆+三角形+曲线）
    function drawFish(ctx, x, y, size) {
        ctx.strokeStyle = penColor;
        ctx.lineWidth = 3;

        const bodyLength = size;      // 鱼身长度
        const bodyHeight = size / 2;  // 鱼身高度

        // 1. 鱼身（椭圆）
        ctx.beginPath();
        ctx.ellipse(x, y, bodyLength / 2, bodyHeight / 2, 0, 0, Math.PI * 2);
        ctx.stroke();

        // 2. 鱼尾（三角形）
        ctx.beginPath();
        ctx.moveTo(x - bodyLength / 2, y);                 // 鱼身左端中点
        ctx.lineTo(x - bodyLength / 2 - size / 3, y - bodyHeight / 3); // 尾巴上角
        ctx.lineTo(x - bodyLength / 2 - size / 3, y + bodyHeight / 3); // 尾巴下角
        ctx.closePath();
        ctx.stroke();

        // 3. 鱼眼（小圆点）
        ctx.beginPath();
        ctx.arc(x + bodyLength / 4, y - bodyHeight / 6, size / 20, 0, Math.PI * 2);
        ctx.fillStyle = penColor;
        ctx.fill();
    }

    // 6. 页面渲染
    return (
        <div className="App" style={{
            maxWidth: '900px',
            margin: '20px auto',
            padding: '0 20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{
                color: '#2d3748',
                textAlign: 'center',
                marginBottom: '20px'
            }}>
                Lumina 轻量化AI图像编辑工具
            </h1>

            <div style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                marginBottom: '15px',
                flexWrap: 'wrap'
            }}>
                <button
                    onClick={clearCanvas}
                    style={{
                        padding: '8px 16px',
                        fontSize: '14px',
                        backgroundColor: '#f7fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'bg 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#edf2f7'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#f7fafc'}
                >
                    清空画布
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <label style={{ fontSize: '14px', color: '#4a5568' }}>颜色：</label>
                    <select
                        value={penColor}
                        onChange={(e) => setPenColor(e.target.value)}
                        style={{
                            padding: '6px 8px',
                            fontSize: '14px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="#ff0000">红色</option>
                        <option value="#0000ff">蓝色</option>
                        <option value="#008000">绿色</option>
                        <option value="#000000">黑色</option>
                        <option value="#ffff00">黄色</option>
                        <option value="#ff69b4">粉色</option>
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <label style={{ fontSize: '14px', color: '#4a5568' }}>粗细：</label>
                    <select
                        value={penWidth}
                        onChange={(e) => setPenWidth(Number(e.target.value))}
                        style={{
                            padding: '6px 8px',
                            fontSize: '14px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        <option value={1}>1px（细）</option>
                        <option value={3}>3px（常规）</option>
                        <option value={5}>5px（粗）</option>
                        <option value={8}>8px（较粗）</option>
                        <option value={12}>12px（极粗）</option>
                    </select>
                </div>

                {/* AI生成按钮（始终可用） */}
                <button
                    onClick={generateAiImage}
                    style={{
                        padding: '8px 16px',
                        fontSize: '14px',
                        backgroundColor: '#3182ce',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'bg 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#2b6cb0'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#3182ce'}
                >
                    {aiStatus}（AI生成）
                </button>
            </div>

            <canvas
                ref={canvasRef}
                width={800}
                height={500}
                style={{
                    width: '100%',
                    height: 'auto',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    backgroundColor: '#ffffff',
                    cursor: 'crosshair',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            />

            <p style={{
                marginTop: '15px',
                fontSize: '13px',
                color: '#718096',
                textAlign: 'center'
            }}>
                操作提示：按住鼠标拖动绘图 | AI生成功能已内置，无需网络加载
            </p>
        </div>
    );
}

export default App;

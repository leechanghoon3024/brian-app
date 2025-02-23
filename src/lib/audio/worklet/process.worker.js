const worker = self;
worker.visualizationMode = 'bars';
worker.onmessage = (event) => {
    const { type, data, canvas, mode } = event.data;

    if (type === 'INIT' && canvas) {
        worker.canvas = canvas;
        worker.ctx = canvas.getContext('2d');
    }
    if (type === 'VISUALIZATION_MODE') {
        worker.visualizationMode = mode;
    }

    if (type === 'AUDIO_DATA' && self.ctx) {
        worker.ctx.clearRect(0, 0, worker.canvas.width, worker.canvas.height);
        if (worker.visualizationMode === 'bars') {
            drawBars(worker.ctx, worker.canvas, data);
        } else if (worker.visualizationMode === 'butterfly') {
            drawWave(worker.ctx, worker.canvas, data);
        } else if (worker.visualizationMode === 'circles') {
            drawCircles(worker.ctx, worker.canvas, data);
        }
    }
};

function drawBars(ctx, canvas, data) {
    const barWidth = canvas.width / data.length;
    let x = 0;
    for (let i = 0; i < data.length; i++) {
        const barHeight = data[i] * 1.5;
        ctx.fillStyle = `rgb(${data[i]}, 50, 200)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }
}

function drawWave(ctx, canvas, data) {
    ctx.beginPath();
    const sliceWidth = canvas.width / data.length;
    let x = 0;
    for (let i = 0; i < data.length; i++) {
        const v = data[i] / 128.0; // 0 ~ 2 범위로 정규화
        const y = (v * canvas.height) / 2;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        x += sliceWidth;
    }
    ctx.strokeStyle = 'rgb(0, 255, 0)';
    ctx.stroke();
}

function drawCircles(ctx, canvas, data) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY);
    for (let i = 0; i < data.length; i++) {
        const radius = (data[i] / 255) * maxRadius;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsl(${(i / data.length) * 360}, 100%, 50%)`;
        ctx.stroke();
    }
}

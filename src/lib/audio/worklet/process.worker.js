const worker = self;
worker.visualizationMode = 'butterfly';
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
            drawButterflyCyan(worker.ctx, worker.canvas, data);
        } else if (worker.visualizationMode === 'rainbow') {
            drawButterflyRainbow(worker.ctx, worker.canvas, data);
        } else if (worker.visualizationMode === 'wave') {
            drawWave(worker.ctx, worker.canvas, data);
        }
    }
};

function drawBars(ctx, canvas, data) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / data.length) * 1.5;
    const gap = 2;
    const maxHeight = canvas.height * 0.8;
    ctx.fillStyle = 'rgba(50, 200, 255, 0.5)';
    let x = 0;
    for (let i = 0; i < data.length; i++) {
        const normalizedValue = data[i] / 255;
        const barHeight = normalizedValue * maxHeight;
        const purple = Math.min(255, data[i] * 2);
        ctx.fillStyle = `rgb(${purple}, 50, 255)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - gap, barHeight);
        x += barWidth;
    }
}

function drawWave(ctx, canvas, data) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    const sliceWidth = canvas.width / data.length;
    const centerY = canvas.height / 2;
    const amplitude = canvas.height * 0.4;
    let x = 0;
    for (let i = 0; i < data.length; i++) {
        const v = data[i] / 255;
        // 중앙선을 기준으로 곱해 위·아래로 이동
        const y = centerY + (v - 0.5) * amplitude;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        x += sliceWidth;
    }
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'purple');
    gradient.addColorStop(0.16, 'orange');
    gradient.addColorStop(0.49, 'cyan');
    gradient.addColorStop(0.83, 'indigo');
    gradient.addColorStop(1, 'violet');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawButterflyCyan(ctx, canvas, data) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerY = canvas.height / 2;
    const barCount = data.length;
    const barWidth = canvas.width / barCount;
    const color1 = [255, 0, 255];
    const color2 = [0, 255, 255];
    for (let i = 0; i < barCount; i++) {
        const amplitude = data[i] / 255;
        const barHeight = amplitude * centerY;
        const x = i * barWidth;
        const ratio = i / (barCount - 1);
        const r = Math.round(color1[0] * (1 - ratio) + color2[0] * ratio);
        const g = Math.round(color1[1] * (1 - ratio) + color2[1] * ratio);
        const b = Math.round(color1[2] * (1 - ratio) + color2[2] * ratio);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, centerY - barHeight, barWidth, barHeight);
        ctx.fillRect(x, centerY, barWidth, barHeight);
    }
}

function drawButterflyRainbow(ctx, canvas, data) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / data.length;
    const centerY = canvas.height / 2;
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#ff00ff');
    gradient.addColorStop(0.5, '#00ff00');
    gradient.addColorStop(1, '#0000ff');

    for (let i = 0; i < data.length; i++) {
        const amplitude = data[i] / 255;
        const barHeight = amplitude * centerY;
        const x = i * barWidth;
        ctx.fillStyle = gradient;
        ctx.fillRect(x, centerY - barHeight, barWidth, barHeight);
        ctx.fillRect(x, centerY, barWidth, barHeight);
    }
}

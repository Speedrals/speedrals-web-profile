/**
 * ==========================================================================
 * SEGMENT: PROCEDURAL PIXEL ART BACKGROUND ENGINE
 * File: js/pixel-canvas.js
 * ==========================================================================
 * Menghasilkan pemandangan pixel art dermaga hutan yang tenang (cozy pier)
 * secara prosedural pada canvas dengan resolusi virtual retro 320x288.
 * ==========================================================================
 */

let canvas = document.getElementById('pixelCanvas');
let ctx = canvas ? canvas.getContext('2d') : null;

// Internal Low Virtual Resolution for authentic Retro Pixel Art scaling
const V_WIDTH = 320;
const V_HEIGHT = 288;

function setupCanvas() {
    if (!canvas) canvas = document.getElementById('pixelCanvas');
    if (canvas && !ctx) ctx = canvas.getContext('2d');
    if (!canvas || !ctx) return;
    canvas.width = V_WIDTH;
    canvas.height = V_HEIGHT;
    ctx.imageSmoothingEnabled = false;
}

// --- PALETTE CONSTANTS ---
const PAL = {
    waterDeep: '#0f3d3b',
    waterMid: '#1a615a',
    waterShallow: '#2a8f83',
    waterLight: '#4dbdb0',
    waterMint: '#79e6d8',
    waterRipple: '#d4fcf7',
    
    woodDark: '#4a2511',
    woodShadow: '#6e3818',
    woodBase: '#b8693a',
    woodMid: '#d68a4a',
    woodLight: '#e8a060',
    woodHighlight: '#f7bd81',
    
    leafDarkest: '#082928',
    leafDark: '#124a46',
    leafMid: '#1f7870',
    leafBright: '#31a89c',
    leafHighlight: '#5ce8d8',
    
    stoneDark: '#2c393c',
    stoneMid: '#485b61',
    stoneLight: '#728b91',
    stoneBeige: '#a89373',
    stoneBeigeLight: '#d6c6a7',

    catBody: '#0f1317',
    catEar: '#262d33',
    catEye: '#ffb700',
    catEyePupil: '#000000'
};

// --- PARTICLES & ANIMATED STATES ---
const fireflies = [];
for (let i = 0; i < 18; i++) {
    fireflies.push({
        x: Math.random() * V_WIDTH,
        y: Math.random() * V_HEIGHT,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.15,
        phase: Math.random() * Math.PI * 2,
        speed: 0.03 + Math.random() * 0.03
    });
}

const dustMotes = [];
for (let i = 0; i < 22; i++) {
    dustMotes.push({
        x: Math.random() * V_WIDTH,
        y: Math.random() * V_HEIGHT,
        speedY: 0.1 + Math.random() * 0.15,
        speedX: 0.05 + Math.random() * 0.1,
        size: Math.random() > 0.6 ? 2 : 1,
        alpha: 0.2 + Math.random() * 0.5
    });
}

const fallingLeaves = [];
for (let i = 0; i < 6; i++) {
    fallingLeaves.push({
        x: Math.random() * V_WIDTH,
        y: Math.random() * (V_HEIGHT / 2),
        speedY: 0.25 + Math.random() * 0.2,
        swayTimer: Math.random() * Math.PI * 2,
        swaySpeed: 0.02 + Math.random() * 0.03
    });
}

// --- PIXEL ART DRAWING HELPERS ---
function fillRect(x, y, w, h, color) {
    if (!ctx) return;
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
}

function drawPixel(x, y, color) {
    if (!ctx) return;
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

// --- PROCEDURAL SCENE LAYERS ---

// 1. Water Base & Dither Gradient
function drawWater(frameCount) {
    for (let y = 0; y < V_HEIGHT; y++) {
        let color = PAL.waterDeep;
        if (y > 70) color = PAL.waterMid;
        if (y > 130) color = PAL.waterShallow;
        if (y > 190) color = PAL.waterLight;
        if (y > 240) color = PAL.waterMint;

        fillRect(0, y, V_WIDTH, 1, color);

        // Dithering lines between depth transitions
        if ((y % 2 === 0) && (y > 65 && y < 75)) fillRect(0, y, V_WIDTH, 1, PAL.waterDeep);
        if ((y % 2 === 0) && (y > 125 && y < 135)) fillRect(0, y, V_WIDTH, 1, PAL.waterMid);
        if ((y % 2 === 0) && (y > 185 && y < 195)) fillRect(0, y, V_WIDTH, 1, PAL.waterShallow);
        if ((y % 2 === 0) && (y > 235 && y < 245)) fillRect(0, y, V_WIDTH, 1, PAL.waterLight);
    }

    // Animated Horizontal Water Shimmer Lines
    const offset = (frameCount * 0.25) % 30;
    for (let ry = 100; ry < V_HEIGHT; ry += 8) {
        const rx = (Math.sin(ry * 0.1 + frameCount * 0.02) * 15 + (ry * 7) + offset) % V_WIDTH;
        const len = 8 + Math.sin(ry + frameCount * 0.05) * 6;
        fillRect(rx, ry, len, 1, PAL.waterRipple);
    }
}

// 2. Underwater Fish
function drawFish(frameCount) {
    const fish1X = (frameCount * 0.4) % (V_WIDTH + 40) - 20;
    const fish1Y = 210 + Math.sin(frameCount * 0.03) * 6;
    fillRect(fish1X, fish1Y, 6, 2, PAL.waterDeep);
    drawPixel(fish1X - 1, fish1Y + 1, PAL.waterDeep);

    const fish2X = V_WIDTH - ((frameCount * 0.3 + 120) % (V_WIDTH + 40));
    const fish2Y = 245 + Math.cos(frameCount * 0.025) * 5;
    fillRect(fish2X, fish2Y, 7, 2, PAL.waterMid);
}

// 3. Stepping Stones, Big Rock & Log
function drawStonesAndLog() {
    // Mossy Driftwood Log (Bottom-Left Water)
    fillRect(8, 255, 65, 14, PAL.woodDark);
    fillRect(12, 253, 50, 4, PAL.woodShadow);
    fillRect(15, 254, 25, 2, PAL.leafMid); // Moss
    fillRect(6, 260, 68, 2, PAL.waterRipple); // Water ring

    // Big Beige Rock (Lower-Center)
    const rx = 82, ry = 195;
    fillRect(rx, ry, 26, 32, PAL.stoneBeige);
    fillRect(rx + 4, ry - 3, 18, 5, PAL.stoneBeigeLight);
    fillRect(rx + 18, ry + 4, 8, 28, PAL.stoneDark);
    fillRect(rx - 2, ry + 28, 30, 2, PAL.waterRipple); // Water ring

    // Stepping Stone Path (Center to Right)
    const stones = [
        { x: 195, y: 155, w: 22, h: 10 },
        { x: 230, y: 172, w: 24, h: 11 },
        { x: 212, y: 198, w: 20, h: 9 },
        { x: 182, y: 222, w: 26, h: 12 }
    ];

    stones.forEach(s => {
        fillRect(s.x, s.y, s.w, s.h, PAL.stoneMid);
        fillRect(s.x + 2, s.y, s.w - 4, 3, PAL.stoneLight);
        fillRect(s.x + s.w - 4, s.y + 2, 4, s.h - 2, PAL.stoneDark);
        fillRect(s.x + 3, s.y + 2, 6, 2, PAL.leafMid); // Moss
        fillRect(s.x - 2, s.y + s.h, s.w + 4, 1.5, PAL.waterRipple); // Water ring
    });
}

// 4. Left Wooden Steps
function drawLeftSteps() {
    const steps = [
        { x: 0, y: 80, w: 38, h: 10 },
        { x: 0, y: 102, w: 32, h: 10 },
        { x: 0, y: 124, w: 26, h: 10 },
        { x: 0, y: 146, w: 20, h: 10 }
    ];

    steps.forEach(st => {
        fillRect(st.x, st.y, st.w, st.h, PAL.woodMid);
        fillRect(st.x, st.y, st.w, 2, PAL.woodLight);
        fillRect(st.x, st.y + st.h - 2, st.w, 2, PAL.woodDark);
        fillRect(st.w, st.y + 2, 2, st.h - 2, PAL.woodShadow);
    });
}

// 5. Wooden Dock Support Stilts
function drawStilts() {
    const stilts = [
        { x: 35, y1: 75, y2: 135 },
        { x: 75, y1: 75, y2: 135 },
        { x: 115, y1: 75, y2: 135 },
        { x: 165, y1: 75, y2: 135 },
        { x: 215, y1: 75, y2: 135 },
        { x: 25, y1: 140, y2: 175 },
        { x: 70, y1: 140, y2: 175 },
        { x: 120, y1: 140, y2: 175 },
        { x: 160, y1: 140, y2: 175 }
    ];

    stilts.forEach(s => {
        fillRect(s.x, s.y1, 5, s.y2 - s.y1, PAL.woodDark);
        fillRect(s.x + 1, s.y1, 2, s.y2 - s.y1, PAL.woodShadow);
        fillRect(s.x - 2, s.y2 - 1, 9, 2, PAL.waterRipple);
    });
}

// 6. Upper & Lower Wooden Dock Platforms
function drawDockPlatforms() {
    // UPPER DOCK (Top Level)
    const uX = 30, uY = 25, uW = 225, uH = 55;
    fillRect(uX, uY, uW, uH, PAL.woodMid);

    // Plank Grid Lines & Color Variations
    for (let px = uX; px < uX + uW; px += 18) {
        fillRect(px, uY, 1, uH, PAL.woodShadow);
        if ((px / 18) % 2 === 0) fillRect(px + 1, uY, 17, uH, PAL.woodLight);
    }
    // Horizontal Plank Joints
    for (let py = uY; py < uY + uH; py += 12) {
        fillRect(uX, py, uW, 1, PAL.woodDark);
    }
    // Upper Dock Front Edge
    fillRect(uX, uY + uH, uW, 4, PAL.woodBase);
    fillRect(uX, uY + uH + 4, uW, 3, PAL.woodDark);

    // LOWER DOCK (Bottom Level)
    const lX = 8, lY = 95, lW = 168, lH = 48;
    fillRect(lX, lY, lW, lH, PAL.woodMid);

    // Lower Planks
    for (let px = lX; px < lX + lW; px += 16) {
        fillRect(px, lY, 1, lH, PAL.woodShadow);
        if ((px / 16) % 2 === 0) fillRect(px + 1, lY, 15, lH, PAL.woodLight);
    }
    for (let py = lY; py < lY + lH; py += 10) {
        fillRect(lX, py, lW, 1, PAL.woodDark);
    }

    // Upper Dock Shadow onto Lower Dock
    fillRect(uX, lY, uW - (uX - lX), 12, 'rgba(10, 5, 2, 0.4)');

    // Lower Dock Front Lip Edge
    fillRect(lX, lY + lH, lW, 4, PAL.woodBase);
    fillRect(lX, lY + lH + 4, lW, 3, PAL.woodDark);
}

// 7. Props on Dock (Plant Pot, Stool, Bucket, Basket, Animated Black Cat)
function drawDockProps(frameCount) {
    // Terracotta Plant Pot (Upper Left Dock)
    const px = 85, py = 12;
    fillRect(px, py + 10, 16, 14, '#b85834');
    fillRect(px - 2, py + 8, 20, 4, '#d66e47');
    fillRect(px - 6, py - 4, 12, 12, PAL.leafBright);
    fillRect(px + 10, py - 6, 12, 12, PAL.leafBright);
    fillRect(px + 2, py - 12, 12, 14, PAL.leafHighlight);

    // Small Round Stool (Upper Right Dock)
    const sx = 180, sy = 42;
    fillRect(sx, sy, 18, 6, PAL.woodMid);
    fillRect(sx - 1, sy, 20, 2, PAL.woodLight);
    fillRect(sx + 2, sy + 6, 3, 10, PAL.woodDark);
    fillRect(sx + 13, sy + 6, 3, 10, PAL.woodDark);

    // Metal Bucket with Water (Lower Dock)
    const bx = 80, by = 100;
    fillRect(bx, by, 16, 15, PAL.stoneMid);
    fillRect(bx - 1, by, 18, 3, PAL.stoneLight);
    fillRect(bx + 2, by + 2, 12, 3, PAL.waterShallow);
    fillRect(bx + 14, by + 3, 2, 12, PAL.stoneDark);

    // Woven Rattan Basket (Lower Dock)
    const kx = 104, ky = 90;
    fillRect(kx, ky, 24, 18, '#a87232');
    fillRect(kx - 1, ky, 26, 3, '#d6974b');
    for (let ix = kx + 2; ix < kx + 22; ix += 4) {
        fillRect(ix, ky + 3, 2, 15, '#6e4317');
    }
    fillRect(kx + 3, ky + 1, 8, 4, '#79b8ad');
    fillRect(kx + 12, ky + 1, 8, 4, '#d4805e');

    // BLACK CAT (Sitting on Lower Dock)
    const cx = 134, cy = 118;
    const isBlinking = (frameCount % 180) > 170;
    const tailSway = Math.floor(Math.sin(frameCount * 0.08) * 3);

    // Cat Body & Head
    fillRect(cx, cy, 20, 16, PAL.catBody);
    fillRect(cx + 4, cy - 8, 14, 10, PAL.catBody);
    // Ears
    fillRect(cx + 4, cy - 12, 3, 4, PAL.catBody);
    fillRect(cx + 13, cy - 12, 3, 4, PAL.catBody);
    fillRect(cx + 5, cy - 10, 1, 2, PAL.catEar);
    fillRect(cx + 14, cy - 10, 1, 2, PAL.catEar);

    // Glowing Eyes & Pupil
    if (!isBlinking) {
        fillRect(cx + 6, cy - 6, 3, 3, PAL.catEye);
        fillRect(cx + 12, cy - 6, 3, 3, PAL.catEye);
        drawPixel(cx + 7, cy - 5, PAL.catEyePupil);
        drawPixel(cx + 13, cy - 5, PAL.catEyePupil);
    } else {
        fillRect(cx + 6, cy - 5, 3, 1, PAL.catEar);
        fillRect(cx + 12, cy - 5, 3, 1, PAL.catEar);
    }

    // Animated Tail
    fillRect(cx - 8, cy + 10 + tailSway, 10, 3, PAL.catBody);
    fillRect(cx - 10, cy + 7 + tailSway, 3, 5, PAL.catBody);
}

// 8. Lily Pads & Water Reeds
function drawLilyPadsAndReeds() {
    const pads = [
        { x: 55, y: 195 }, { x: 135, y: 185 }, { x: 175, y: 165 },
        { x: 215, y: 240 }, { x: 275, y: 180 }, { x: 295, y: 210 }
    ];

    pads.forEach(p => {
        fillRect(p.x, p.y, 14, 8, PAL.leafBright);
        fillRect(p.x + 2, p.y, 10, 8, PAL.leafHighlight);
        drawPixel(p.x + 7, p.y + 3, PAL.waterDeep);
        fillRect(p.x - 1, p.y + 8, 16, 1, PAL.waterRipple);
    });

    // Reeds on right shore
    const rx = 265, ry = 135;
    fillRect(rx, ry, 2, 25, PAL.leafMid);
    fillRect(rx + 5, ry - 8, 2, 33, PAL.leafBright);
    fillRect(rx + 10, ry + 2, 2, 23, PAL.leafMid);
}

// 9. Tree Trunk & Canopy Leaf Clusters
function drawTreeAndCanopy(time) {
    // Large Tree Trunk (Bottom Right)
    const tx = 275, ty = 70;
    fillRect(tx, ty, 45, V_HEIGHT - ty, PAL.woodDark);
    fillRect(tx, ty, 10, V_HEIGHT - ty, PAL.woodShadow);
    fillRect(tx + 4, ty + 20, 8, V_HEIGHT - ty - 20, PAL.leafDark);

    // Bush at tree base
    fillRect(tx - 15, 235, 35, 53, PAL.leafMid);
    fillRect(tx - 10, 225, 25, 20, PAL.leafBright);

    // Canopy Leaves with Swaying
    const leafSway = Math.sin(time * 1.5) * 2;

    // Top Left Canopy
    fillRect(-10, -10, 140, 45 + leafSway, PAL.leafDark);
    fillRect(-5, -5, 120, 35 + leafSway, PAL.leafMid);
    fillRect(0, 0, 90, 22 + leafSway, PAL.leafBright);

    // Top Right Large Canopy
    fillRect(140 + leafSway, -15, 180, 75, PAL.leafDarkest);
    fillRect(160 + leafSway, -10, 160, 60, PAL.leafDark);
    fillRect(180 + leafSway, -5, 140, 48, PAL.leafMid);
    fillRect(210 + leafSway, 0, 110, 32, PAL.leafBright);
    fillRect(250 + leafSway, 0, 70, 18, PAL.leafHighlight);
}

// 10. Light Shafts & Dappled Light
function drawLighting(frameCount) {
    if (!ctx) return;
    ctx.save();
    ctx.fillStyle = 'rgba(255, 248, 200, 0.12)';
    
    // Angled Sunbeams
    const pulse = Math.sin(frameCount * 0.03) * 0.03;
    ctx.globalAlpha = 0.12 + pulse;

    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(60, 0); ctx.lineTo(210, V_HEIGHT); ctx.lineTo(130, V_HEIGHT);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(90, 0); ctx.lineTo(160, 0); ctx.lineTo(310, V_HEIGHT); ctx.lineTo(230, V_HEIGHT);
    ctx.fill();

    // Dappled Light Spots on Dock
    fillRect(60, 40, 25, 12, 'rgba(255, 250, 210, 0.18)');
    fillRect(120, 110, 30, 15, 'rgba(255, 250, 210, 0.18)');
    fillRect(150, 200, 35, 20, 'rgba(255, 250, 210, 0.15)');

    ctx.restore();
}

// 11. Particles (Fireflies, Dust Motes, Falling Leaves)
function drawParticles(frameCount) {
    // Fireflies
    fireflies.forEach(f => {
        f.x += f.vx;
        f.y += f.vy;
        if (f.x < 0 || f.x > V_WIDTH) f.vx *= -1;
        if (f.y < 0 || f.y > V_HEIGHT) f.vy *= -1;

        f.phase += f.speed;
        const alpha = (Math.sin(f.phase) + 1) / 2;
        if (alpha > 0.2) {
            fillRect(f.x, f.y, 2, 2, `rgba(230, 255, 120, ${alpha.toFixed(2)})`);
        }
    });

    // Dust Motes
    dustMotes.forEach(d => {
        d.y += d.speedY;
        d.x += d.speedX;
        if (d.y > V_HEIGHT) d.y = -5;
        if (d.x > V_WIDTH) d.x = -5;

        fillRect(d.x, d.y, d.size, d.size, `rgba(255, 255, 255, ${d.alpha.toFixed(2)})`);
    });

    // Falling Leaves
    fallingLeaves.forEach(l => {
        l.swayTimer += l.swaySpeed;
        l.y += l.speedY;
        l.x += Math.sin(l.swayTimer) * 0.5;

        if (l.y > V_HEIGHT - 30) {
            l.y = -10;
            l.x = Math.random() * V_WIDTH;
        }

        fillRect(l.x, l.y, 2, 2, PAL.leafHighlight);
    });
}

// MAIN SCENE ANIMATION LOOP
let frameCount = 0;
function renderScene() {
    frameCount++;
    const time = frameCount * 0.03;

    drawWater(frameCount);
    drawFish(frameCount);
    drawStonesAndLog();
    drawLeftSteps();
    drawStilts();
    drawDockPlatforms();
    drawDockProps(frameCount);
    drawLilyPadsAndReeds();
    drawTreeAndCanopy(time);
    drawLighting(frameCount);
    drawParticles(frameCount);

    requestAnimationFrame(renderScene);
}

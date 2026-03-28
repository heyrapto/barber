import * as THREE from 'three';
import { COLORS } from '../constants';

// Helper to draw oval numbers
const drawOvalNumber = (ctx: CanvasRenderingContext2D, num: number, x: number, y: number, color: string) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(x, y, 24, 14, 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.font = 'bold 16px Roboto Condensed';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(num.toString().padStart(2, '0'), x, y + 2);
};

// --- SQUARE ORANGE CARD GENERATOR ---
export const createSquareOrangeTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    const width = 1000;
    const height = 1000;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // BG
    ctx.fillStyle = COLORS.PRIMARY;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = COLORS.DARK;
    ctx.strokeStyle = COLORS.DARK;

    // --- Header ---
    const headerH = 140;
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, width, headerH);
    ctx.beginPath();
    ctx.moveTo(140, 0); ctx.lineTo(140, headerH);
    ctx.moveTo(width - 140, 0); ctx.lineTo(width - 140, headerH);
    ctx.stroke();

    // Arrow (Left Box)
    ctx.beginPath();
    ctx.moveTo(90, headerH / 2); ctx.lineTo(50, headerH / 2);
    ctx.moveTo(70, headerH / 2 - 15); ctx.lineTo(50, headerH / 2); ctx.lineTo(70, headerH / 2 + 15);
    ctx.stroke();

    // Header Center Text
    ctx.font = 'bold 36px Oswald';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('20', width / 2 - 200, headerH / 2);
    ctx.fillText('16', width / 2 + 200, headerH / 2);

    ctx.save();
    ctx.translate(width / 2, headerH / 2);
    ctx.scale(1, 1.4);
    ctx.font = 'bold 130px Oswald';
    ctx.fillText("SECURE", 0, 5);
    ctx.restore();

    // Right Logo Stack
    const logoX = width - 70;
    ctx.font = 'bold 28px Oswald';
    ctx.fillText('BARBER', logoX, headerH / 2 - 28);
    ctx.fillText('BARBER', logoX, headerH / 2);
    ctx.fillText('BARBER', logoX, headerH / 2 + 28);

    // --- Main Content ---
    const centerY = height * 0.48;

    // Sub-label
    ctx.fillStyle = COLORS.DARK;
    ctx.font = 'bold 24px Roboto Condensed';
    ctx.letterSpacing = '3px';
    ctx.fillText('FRYZJER MĘSKI', width / 2, centerY - 180);
    ctx.letterSpacing = '0px';

    // Massive Headline
    ctx.save();
    ctx.translate(width / 2, centerY - 20);
    // Adjusted scale for better breathing room on 3D mesh
    ctx.scale(0.75, 1.6);
    ctx.font = 'bold 220px Oswald';
    ctx.fillText("SECURE", 0, 0);
    ctx.restore();

    // Est
    ctx.font = 'bold 32px Roboto Condensed';
    ctx.fillText('EST. 2016', width / 2, centerY + 140);

    // List - Improved spacing
    const listStartY = centerY + 220;
    ctx.font = '24px Roboto Condensed'; // Slightly larger for readability

    const services = [
        ['Strzyżenie męskie', 'Strzyżenie dzieci'],
        ['Combo (głowa + broda)', 'Strzyżenie brody'],
        ['Cover (odsiwianie)', 'Strzyżenie + Cover'],
        ['Combo + Spa', 'Broda + Spa']
    ];

    services.forEach((row, i) => {
        const y = listStartY + (i * 45); // Increased gap

        // Item 1
        const x1 = width / 2 - 200; // Wider spread
        drawOvalNumber(ctx, i * 2 + 1, x1, y, COLORS.DARK);
        ctx.fillStyle = COLORS.DARK;
        ctx.textAlign = 'left';
        ctx.fillText(row[0], x1 + 40, y + 2);

        // Item 2
        const x2 = width / 2 + 60; // Wider spread
        drawOvalNumber(ctx, i * 2 + 2, x2, y, COLORS.DARK);
        ctx.fillStyle = COLORS.DARK;
        ctx.fillText(row[1], x2 + 40, y + 2);
    });

    // Stamp
    ctx.save();
    ctx.translate(width / 2, listStartY + 150);
    ctx.rotate(-0.1);
    ctx.lineWidth = 4;
    ctx.strokeStyle = COLORS.DARK;
    ctx.strokeRect(-60, -60, 120, 120);
    ctx.font = 'bold 32px Oswald';
    ctx.textAlign = 'center';
    ctx.fillText('BARBER', 0, -30);
    ctx.fillText('BARBER', 0, 0);
    ctx.fillText('BARBER', 0, 30);
    ctx.restore();

    // --- Footer ---
    const footerH = 120;
    const footerY = height - footerH;
    ctx.lineWidth = 3;
    ctx.strokeRect(0, footerY, width, footerH);
    ctx.beginPath();
    ctx.moveTo(120, footerY); ctx.lineTo(120, height);
    ctx.moveTo(width - 120, footerY); ctx.lineTo(width - 120, height);
    ctx.stroke();

    // Close X
    ctx.beginPath();
    ctx.moveTo(50, footerY + 50); ctx.lineTo(70, footerY + 70);
    ctx.moveTo(70, footerY + 50); ctx.lineTo(50, footerY + 70);
    ctx.stroke();

    // Footer Center
    ctx.font = 'bold 36px Oswald';
    ctx.textAlign = 'center';
    ctx.fillText('20', width / 2 - 180, footerY + footerH / 2);
    ctx.fillText('16', width / 2 + 180, footerY + footerH / 2);
    ctx.save();
    ctx.translate(width / 2, footerY + footerH / 2);
    ctx.scale(1, 1.4);
    ctx.font = 'bold 80px Oswald';
    ctx.fillText("SECURE", 0, 5);
    ctx.restore();

    // Circle Arrow
    const caX = width - 60;
    const caY = footerY + footerH / 2;
    ctx.beginPath();
    ctx.arc(caX, caY, 24, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(caX - 6, caY - 10); ctx.lineTo(caX + 6, caY); ctx.lineTo(caX - 6, caY + 10);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    return texture;
};

// --- COLORFUL CARD GENERATOR ---
export const createColorfulCardTexture = (img?: HTMLImageElement): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    const width = 1000;
    const height = 1600;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Background
    ctx.fillStyle = '#F8F9FA';
    ctx.fillRect(0, 0, width, height);

    // Draw Image fully vivid
    if (img) {
        const scale = Math.max(width / img.width, height / img.height);
        const x = (width / 2) - (img.width / 2) * scale;
        const y = (height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        // NO DARK OVERLAY HERE - Keep it vivid
    }

    // Overlay Graphics (White text for contrast on colorful bg)
    const ORANGE = COLORS.PRIMARY;
    const WHITE = '#FFFFFF';

    ctx.strokeStyle = ORANGE;
    ctx.fillStyle = WHITE; // Text is white now

    // Header
    const headerH = 160;
    ctx.lineWidth = 4; // Thicker lines

    // Top/Bottom Lines
    ctx.beginPath();
    ctx.moveTo(0, 4); ctx.lineTo(width, 4);
    ctx.moveTo(0, headerH); ctx.lineTo(width, headerH);
    ctx.stroke();

    // Vertical Separators
    ctx.beginPath();
    ctx.moveTo(160, 0); ctx.lineTo(160, headerH);
    ctx.moveTo(width - 160, 0); ctx.lineTo(width - 160, headerH);
    ctx.stroke();

    // Left Icon (Simple Lines)
    ctx.strokeStyle = WHITE;
    ctx.beginPath();
    ctx.moveTo(60, headerH / 2); ctx.lineTo(100, headerH / 2);
    ctx.stroke();
    ctx.strokeStyle = ORANGE;

    // Header Text
    ctx.font = 'bold 30px Oswald';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('20', width / 2 - 200, headerH / 2);
    ctx.fillText('16', width / 2 + 200, headerH / 2);

    ctx.save();
    ctx.translate(width / 2, headerH / 2);
    ctx.scale(1, 1.4);
    ctx.font = 'bold 120px Oswald';
    ctx.fillStyle = ORANGE;
    ctx.fillText("SECURE", 0, 5);
    ctx.restore();

    // Right Logo
    const logoX = width - 80;
    ctx.fillStyle = WHITE;
    ctx.font = 'bold 28px Oswald';
    ctx.fillText('BARBER', logoX, headerH / 2 - 30);
    ctx.fillText('BARBER', logoX, headerH / 2);
    ctx.fillText('BARBER', logoX, headerH / 2 + 30);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    texture.colorSpace = THREE.SRGBColorSpace; // Ensure correct color profile
    return texture;
};

// --- TALL DARK CARD GENERATOR (Legacy support) ---
export const createTallDarkTexture = (img?: HTMLImageElement): THREE.CanvasTexture => {
    // ... (Use existing logic if needed, but we focus on colorful for now)
    return createColorfulCardTexture(img);
};
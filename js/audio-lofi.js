/**
 * ==========================================================================
 * SEGMENT: COZY AMBIENT LOFI AUDIO SYNTHESIZER
 * File: js/audio-lofi.js
 * ==========================================================================
 * Menggunakan Web Audio API untuk mensintesis nada-nada santai (pentatonic/lofi)
 * secara realtime tanpa memerlukan file audio eksternal yang berat.
 * ==========================================================================
 */

let audioCtx = null;
let isAudioPlaying = false;
let audioInterval = null;

// Nada lembut pentatonic penenang (Cozy Asian / Lofi Frequencies in Hz)
const cozyNotes = [220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25];

function toggleAudio() {
    const btn = document.getElementById('audioBtn');
    const icon = document.getElementById('audioIcon');

    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (!isAudioPlaying) {
        audioCtx.resume();
        startAmbientLofiLoop();
        isAudioPlaying = true;
        if (icon) icon.className = "fa-solid fa-volume-high text-xs text-teal-300";
        if (btn) btn.classList.add("border-teal-400", "bg-teal-950/80");
        showToast("Musik Lofi Pier Dinyalakan 🌿");
    } else {
        audioCtx.suspend();
        if (audioInterval) clearInterval(audioInterval);
        audioInterval = null;
        isAudioPlaying = false;
        if (icon) icon.className = "fa-solid fa-volume-xmark text-xs";
        if (btn) btn.classList.remove("border-teal-400", "bg-teal-950/80");
        showToast("Musik Dimatikan");
    }
}

function playSoftTone(freq, time) {
    if (!audioCtx || !isAudioPlaying) return;

    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.03, time + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 2.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(time);
        osc.stop(time + 2.3);
    } catch (e) {
        console.warn('Audio tone error:', e);
    }
}

function startAmbientLofiLoop() {
    if (audioInterval) clearInterval(audioInterval);
    audioInterval = setInterval(() => {
        if (isAudioPlaying && audioCtx) {
            const now = audioCtx.currentTime;
            if (Math.random() > 0.3) {
                const randomNote = cozyNotes[Math.floor(Math.random() * cozyNotes.length)];
                playSoftTone(randomNote, now);
            }
        }
    }, 750);
}

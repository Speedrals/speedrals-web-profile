/**
 * ==========================================================================
 * SEGMENT: LOGIKA INTI APLIKASI & RENDER TAMPILAN
 * File: js/app.js
 * ==========================================================================
 * Bertanggung jawab merender data profil, teks berjalan donatur, daftar link,
 * menangani klik link, penyimpanan lokal (localStorage), dan inisialisasi awal.
 * ==========================================================================
 */

// Inisialisasi appData dari data default di data/links.js
let appData = typeof defaultAppData !== 'undefined'
    ? JSON.parse(JSON.stringify(defaultAppData))
    : {
        profile: {
            name: "Aulia Rahma",
            handle: "@auliarahma",
            bio: "Cozy Pier Bio Hub",
            avatar: "",
            sociabuzzUrl: "https://sociabuzz.com"
        },
        topDonators: [],
        links: []
    };

// --- PENYIMPANAN DATA ---

function loadAppData() {
    // Data resmi selalu dimuat langsung dari data/links.js
    if (typeof defaultAppData !== 'undefined') {
        appData = JSON.parse(JSON.stringify(defaultAppData));
    }
}

// --- RENDER SEGMENTS ---

// 1. Render Segment Profil
function renderProfile() {
    const nameEl = document.getElementById('profileName');
    const handleEl = document.getElementById('profileHandle');
    const bioEl = document.getElementById('profileBio');
    const avatarEl = document.getElementById('profileAvatar');
    const fallbackEl = document.getElementById('avatarFallback');
    const directBtn = document.getElementById('modalDirectSociaBuzzBtn');

    if (nameEl) nameEl.textContent = appData.profile.name || "Aulia Rahma";
    if (handleEl) handleEl.textContent = appData.profile.handle || "@auliarahma";
    if (bioEl) bioEl.textContent = `"${appData.profile.bio || ''}"`;

    if (avatarEl && fallbackEl) {
        if (appData.profile.avatar) {
            avatarEl.src = appData.profile.avatar;
            avatarEl.classList.remove('hidden');
            fallbackEl.classList.add('hidden');
        } else {
            avatarEl.classList.add('hidden');
            fallbackEl.classList.remove('hidden');
        }
    }

    const sociaUrl = appData.profile.sociabuzzUrl || "https://sociabuzz.com";
    if (directBtn) directBtn.href = sociaUrl;
}

// 2. Render Segment Running Marquee (Top Donatur)
function renderMarquee() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;

    if (!appData.topDonators || appData.topDonators.length === 0) {
        track.innerHTML = '<span class="mx-4">🌿 Terima kasih atas dukungan kalian! 🌿</span>';
        return;
    }

    const itemsHtml = appData.topDonators.map((item, idx) => `
        <span class="inline-flex items-center gap-2 mx-5">
            <span class="text-amber-400 font-bold">#${idx + 1} ${escapeHtml(item.name)}</span>
            <span class="text-emerald-300 font-pixel">(${escapeHtml(item.amount)})</span>
            <span class="text-teal-500">✨</span>
        </span>
    `).join('');

    track.innerHTML = `<span>👑 TOP SUPPORTERS:</span>` + itemsHtml + itemsHtml + itemsHtml;
}

// 3. Render Segment Daftar Tautan (Links Hub)
function renderLinks() {
    const container = document.getElementById('linksContainer');
    const countText = document.getElementById('linkCountText');
    if (!container) return;

    container.innerHTML = '';
    if (countText) {
        countText.textContent = `${appData.links.length} Links`;
    }

    appData.links.forEach(link => {
        const linkCard = document.createElement('a');
        linkCard.href = link.url;
        linkCard.target = "_blank";
        linkCard.rel = "noopener noreferrer";
        linkCard.className = `group glass-card bg-cardDark hover:bg-cardHover p-3.5 rounded-2xl flex items-center justify-between transition-all duration-300 hover:scale-[1.02] hover:border-teal-400/50 shadow-lg relative overflow-hidden block`;

        const iconClass = link.icon || "fa-solid fa-link";

        linkCard.innerHTML = `
            <div class="flex items-center gap-3 relative z-10">
                <div class="w-9 h-9 rounded-xl bg-black/60 border border-teal-800/60 flex items-center justify-center text-teal-300 group-hover:text-amber-300 group-hover:border-amber-400/60 transition-all">
                    <i class="${escapeHtml(iconClass)} text-sm"></i>
                </div>
                <div class="flex flex-col">
                    <span class="font-pixel text-sm font-semibold text-zinc-100 group-hover:text-teal-200 transition-colors">
                        ${escapeHtml(link.title)}
                    </span>
                </div>
            </div>
            
            <div class="flex items-center gap-2 relative z-10">
                ${link.badge ? `
                    <span class="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 font-mono text-[9px] text-amber-300 uppercase tracking-wider">
                        ${escapeHtml(link.badge)}
                    </span>
                ` : ''}
                <i class="fa-solid fa-chevron-right text-xs text-teal-600 group-hover:text-teal-300 group-hover:translate-x-1 transition-all"></i>
            </div>
        `;

        container.appendChild(linkCard);
    });
}

function trackLinkClick(id) {
    // Click tracking dinonaktifkan
}

function handleAvatarError() {
    const avatarEl = document.getElementById('profileAvatar');
    const fallbackEl = document.getElementById('avatarFallback');
    if (avatarEl) avatarEl.classList.add('hidden');
    if (fallbackEl) fallbackEl.classList.remove('hidden');
}

function renderAll() {
    renderProfile();
    renderMarquee();
    renderLinks();
}

// --- HELPER UTILITIES ---

function copyToClipboard(text, successMsg) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
        document.execCommand('copy');
        showToast(successMsg || 'Berhasil disalin!');
    } catch (err) {
        showToast('Gagal menyalin link');
    }
    document.body.removeChild(tempInput);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.remove('translate-y-12', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-12', 'opacity-0');
    }, 2600);
}

function capitalize(s) {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function escapeHtml(str) {
    if (!str && str !== 0) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// --- INISIALISASI HALAMAN ---

// Sinkronisasi otomatis Top Donatur dari Google Apps Script / SociaBuzz Webhook
async function fetchLiveTopDonators() {
    const apiUrl = appData.topDonatorsApiUrl || (typeof defaultAppData !== 'undefined' ? defaultAppData.topDonatorsApiUrl : '');
    if (!apiUrl || typeof apiUrl !== 'string' || !apiUrl.trim().startsWith('http')) {
        return;
    }

    try {
        const response = await fetch(apiUrl.trim(), { cache: 'no-cache' });
        if (!response.ok) return;
        const result = await response.json();
        
        if (result && Array.isArray(result.topDonators) && result.topDonators.length > 0) {
            appData.topDonators = result.topDonators;
            renderMarquee();
        }
    } catch (err) {
        console.warn('Gagal memuat top donatur live, menggunakan fallback lokal:', err);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (typeof setupCanvas === 'function') {
        setupCanvas();
    }
    loadAppData();
    renderAll();
    fetchLiveTopDonators();
    if (typeof renderScene === 'function') {
        renderScene();
    }

    // Periksa pembaruan donasi baru setiap 60 detik secara otomatis
    setInterval(fetchLiveTopDonators, 60000);
});

window.addEventListener('resize', () => {
    if (typeof setupCanvas === 'function') {
        setupCanvas();
    }
});

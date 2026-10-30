/**
 * ==========================================================================
 * SEGMENT: MODAL MANAGER & SHARE CONTROLLER
 * File: js/editor.js
 * ==========================================================================
 * Menangani interaksi popup donasi & QRIS SociaBuzz serta fitur berbagi link.
 * ==========================================================================
 */

// --- 1. MODAL DONASI & QRIS ---

function openDonationModal() {
    const modal = document.getElementById('donationModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    generateQRCode(appData.profile.sociabuzzUrl || "https://sociabuzz.com");
}

function openDonationWithAmount(amount) {
    openDonationModal();
    const num = parseInt(amount, 10);
    showToast(`Membuka donasi Rp ${isNaN(num) ? amount : num.toLocaleString('id-ID')}`);
}

function closeDonationModal() {
    const modal = document.getElementById('donationModal');
    if (modal) modal.classList.add('hidden');
}

function generateQRCode(text) {
    const container = document.getElementById('qrcode');
    if (!container) return;
    container.innerHTML = '';
    try {
        if (typeof QRCode !== 'undefined') {
            new QRCode(container, {
                text: text,
                width: 130,
                height: 130,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    } catch (e) {
        console.warn("QR Generator exception:", e);
    }
}

function copySociaBuzzLink() {
    copyToClipboard(appData.profile.sociabuzzUrl || "https://sociabuzz.com", "Link SociaBuzz Berhasil Disalin!");
}

function copyCurrentPageUrl() {
    copyToClipboard(window.location.href, "Link Profil Berhasil Disalin! 🌿");
}

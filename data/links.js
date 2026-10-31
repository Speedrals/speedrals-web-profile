/**
 * ==========================================================================
 * SEGMENT DATA: FILE KHUSUS INPUT LINK, PROFIL & DONASI
 * File: data/links.js
 * ==========================================================================
 * PANDUAN PENGISIAN:
 * Anda dapat dengan mudah mengedit informasi bio link Anda di sini tanpa 
 * perlu mengubah kode HTML atau Javascript lainnya!
 * 
 * 1. PROFIL: Ubah nama, handle (@username), bio, avatar, dan link SociaBuzz.
 * 2. TOP DONATORS: Daftar nama pendukung yang tampil di teks berjalan (marquee).
 * 3. LINKS: Tambahkan atau kurangi link tautan sosial / karya Anda.
 *    - icon: Menggunakan nama icon FontAwesome (contoh: "fa-brands fa-instagram",
 *            "fa-brands fa-tiktok", "fa-solid fa-globe", dll).
 *    - badge: Tulisan kecil pemanis di sebelah kanan (contoh: "Featured", "Daily",
 *             "New", atau kosongkan "" jika tidak ingin badge).
 * ==========================================================================
 */

const defaultAppData = {
    // ----------------------------------------------------------------------
    // 1. DATA PROFIL PENGGUNA
    // ----------------------------------------------------------------------
    profile: {
        name: "Speedrals",
        handle: "@akuspeedrals",
        isVerified: true,
        bio: "Is it better to speak or to die?",
        avatar: "https://i.pinimg.com/736x/02/31/78/0231783f5ed2353790b2cfb15a375f9c.jpg",
        sociabuzzUrl: "https://sociabuzz.com/speedrals/tribe" // Ganti dengan link SociaBuzz milik Anda
    },

    // ----------------------------------------------------------------------
    // 2. DAFTAR TOP DONATUR (Teks Berjalan di Header)
    // ----------------------------------------------------------------------
    // [OPSI B: INTEGRASI OTOMATIS SOCIABUZZ VIA GOOGLE APPS SCRIPT]
    // Tempelkan URL Web App Google Apps Script Anda di bawah (di dalam tanda petik).
    // Jika diisi, website akan otomatis mengambil data top donatur terbaru langsung dari Google Sheet!
    // Jika dikosongkan (""), website akan menggunakan data cadangan (fallback) di bawah.
    topDonatorsApiUrl: "https://script.google.com/macros/s/AKfycbzrSW2az-VSrAZFN0kYvcBfPTUu9VlDiHp3wk4QLnAEW3MZC4InO-g-mki6g910nGRK9A/exec",

    // Data cadangan (fallback) jika link API belum diisi atau sedang offline:
    topDonators: [
        { name: "Rizky", amount: "Rp 100.000" },
        { name: "Sarah", amount: "Rp 50.000" },
        { name: "Budi", amount: "Rp 25.000" },
        { name: "Cozy Friend", amount: "Rp 20.000" },
        { name: "Anonim", amount: "Rp 10.000" }
    ],

    // ----------------------------------------------------------------------
    // 3. DAFTAR TAUTAN (LINKS HUB)
    // ----------------------------------------------------------------------
    // Bebas menambah, mengubah urutan, atau menghapus link di bawah ini
    // ----------------------------------------------------------------------
    links: [
        {
            id: 1,
            title: "Server Discord",
            url: "https://discord.gg/yneVqZYjKF", // Ganti dengan link invite Discord server Anda
            icon: "fa-brands fa-discord",
            badge: ""
        },
        {
            id: 2,
            title: "YouTube",
            url: "https://www.youtube.com/@Speedrals",
            icon: "fa-brands fa-youtube",
            badge: ""
        },
        {
            id: 3,
            title: "Instagram",
            url: "https://instagram.com/speedrals_",
            icon: "fa-brands fa-instagram",
            badge: ""
        },
        {
            id: 4,
            title: "Spotify",
            url: "https://open.spotify.com/user/b8wurpe5huaee5h7qvvmvurjf?si=hF4qw6LUSkedMVCNUWdk9w&utm_source=copy-link",
            icon: "fa-brands fa-spotify",
            badge: ""
        },
        {
            id: 5,
            title: "TikTok",
            url: "https://tiktok.com/@akuspeedrals",
            icon: "fa-brands fa-tiktok",
            badge: ""
        }
    ]
};

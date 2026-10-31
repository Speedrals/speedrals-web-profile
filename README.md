# 🌿 Speedrals Rush Hour|| Profile And Donation Web

Selamat datang di proyek **Web Profile & Bio Links Hub**. Seluruh struktur kode telah dipisahkan secara modular ke dalam folder dan file tersendiri agar sangat mudah dikembangkan, dirawat, dan dikustomisasi.

---

## 📁 Struktur Folder & File Proyek

```text
WEB PROFILE/
│
├── speedralswebprofilemain.html # File utama website (struktur HTML bersih & bersekat)
├── bio_links_hub.html          # File alternatif (identik dengan speedralswebprofilemain.html)
├── sociabuzz-apps-script.js    # ⚡ [OPSI B] Backend Webhook SociaBuzz (Google Apps Script)
├── README.md                   # Panduan lengkap penggunaan & pengembangan
│
├── 📂 data/
│   └── links.js                # 🌟 [PENTING] FILE KHUSUS INPUT LINK, PROFIL, & DONASI
│
├── 📂 css/
│   ├── tailwind-config.js      # Konfigurasi token tema, warna, font, & animasi Tailwind
│   └── style.css               # Styling kustom (Pixel art canvas, glassmorphism, scrollbar)
│
└── 📂 js/
    ├── app.js                  # Logika inti aplikasi, render UI, click tracking & toast
    ├── pixel-canvas.js         # Segment Visual: Animasi background pixel art dermaga hutan
    ├── audio-lofi.js           # Segment Audio: Synthesizer musik santai lofi ambient
    └── editor.js               # Segment Interaksi: Modal donasi, QRIS, & Salin link
```

---

## 🚀 Cara Menginput / Mengubah Link & Profil

Untuk mengubah link, foto profil, nama, atau daftar donatur, Anda **cukup membuka file [`data/links.js`](file:///c:/Users/Danang%20Wahyudi/Documents/project/WEB%20PROFILE/data/links.js)**:

### 1. Mengubah Data Profil & SociaBuzz
```javascript
profile: {
    name: "Nama Anda",
    handle: "@username_anda",
    isVerified: true,
    bio: "Kutipan atau deskripsi singkat profil Anda.",
    avatar: "https://url-foto-anda.com/foto.jpg", // atau letakkan file lokal
    sociabuzzUrl: "https://sociabuzz.com/username_anda"
}
```

### 2. Mengatur Teks Berjalan (Top Donatur)

Terdapat 2 cara:
- **Cara Otomatis (Opsi B - Rekomendasi):** Pasang script backend gratis dari file [`sociabuzz-apps-script.js`](file:///c:/Users/Danang%20Wahyudi/Documents/project/WEB%20PROFILE/sociabuzz-apps-script.js) ke Google Sheets. Salin URL Web App yang dihasilkan lalu tempelkan ke `topDonatorsApiUrl`:
  ```javascript
  topDonatorsApiUrl: "https://script.google.com/macros/s/AKfycb.../exec",
  ```
  Setiap ada yang berdonasi di SociaBuzz, data akan otomatis masuk ke Google Sheet dan website langsung ter-update 24 jam nonstop!
- **Cara Manual:** Jika belum ingin menghubungkan webhook, biarkan `topDonatorsApiUrl: ""` kosong dan sesuaikan daftar nama secara manual di:
  ```javascript
  topDonators: [
      { name: "Rizky", amount: "Rp 100.000" },
      { name: "Sarah", amount: "Rp 50.000" },
      { name: "Anonim", amount: "Rp 10.000" }
  ]
  ```

### 3. Menambah / Mengedit Link Tautan
```javascript
links: [
    {
        id: 1,
        title: "Judul Link / Portofolio",
        url: "https://link-tujuan.com",
        icon: "fa-solid fa-globe",       // Class FontAwesome
        badge: "Featured"                // Badge kecil (opsional, kosongkan "" jika tidak ingin)
    },
    {
        id: 2,
        title: "Instagram Pribadi",
        url: "https://instagram.com/username",
        icon: "fa-brands fa-instagram",
        badge: ""
    }
]
```

> **Tips Icon**: Anda dapat menggunakan icon gratis apa saja dari [Font Awesome](https://fontawesome.com/icons), seperti:
> - `fa-brands fa-discord`
> - `fa-brands fa-youtube`
> - `fa-brands fa-instagram`
> - `fa-brands fa-spotify`
> - `fa-brands fa-tiktok`
> - `fa-solid fa-music`
> - `fa-solid fa-cart-shopping`
> - `fa-solid fa-envelope`

---

## 🧩 Pembagian Segment untuk Pengembangan

Setiap segment telah diisolasi agar Anda dapat mengembangkan fitur spesifik tanpa mengganggu bagian lainnya:

| Segment | File Terkait | Fungsi / Tanggung Jawab |
|---|---|---|
| **Data & Config** | [`data/links.js`](file:///c:/Users/Danang%20Wahyudi/Documents/project/WEB%20PROFILE/data/links.js) | Tempat khusus pengisian konten (profil, donatur, link). |
| **Visual Canvas** | [`js/pixel-canvas.js`](file:///c:/Users/Danang%20Wahyudi/Documents/project/WEB%20PROFILE/js/pixel-canvas.js) | Render air beriak, ikan, dermaga kayu, kucing berkedip, daun gugur, kunang-kunang, dan berkas cahaya matahari. |
| **Audio Synthesizer** | [`js/audio-lofi.js`](file:///c:/Users/Danang%20Wahyudi/Documents/project/WEB%20PROFILE/js/audio-lofi.js) | Menghasilkan audio lofi ambient pentatonic secara real-time via Web Audio API tanpa load file audio MP3 berat. |
| **Modal & Donasi** | [`js/editor.js`](file:///c:/Users/Danang%20Wahyudi/Documents/project/WEB%20PROFILE/js/editor.js) | Modal donasi otomatis dengan generate QR Code QRIS SociaBuzz & fitur salin link. |
| **App Core & Render** | [`js/app.js`](file:///c:/Users/Danang%20Wahyudi/Documents/project/WEB%20PROFILE/js/app.js) | Menyambungkan data ke elemen DOM HTML dan toast notifikasi. |
| **Tema & Animasi** | [`css/tailwind-config.js`](file:///c:/Users/Danang%20Wahyudi/Documents/project/WEB%20PROFILE/css/tailwind-config.js) | Token warna kustom (tealGlow, orientalGold, cardDark, dll) dan keyframe animasi. |
| **Gaya Kustom** | [`css/style.css`](file:///c:/Users/Danang%20Wahyudi/Documents/project/WEB%20PROFILE/css/style.css) | Rendering pixelated crisp, efek glassmorphism, dan custom dark scrollbar. |

---

## 💡 Cara Menjalankan Website

1. Anda cukup melakukan **klik ganda (double-click)** pada file `speedralswebprofilemain.html` atau `bio_links_hub.html` untuk langsung membukanya di browser favorit (Chrome, Edge, Firefox, Safari).
2. Jika menggunakan VS Code / Antigravity, Anda juga bisa klik kanan `speedralswebprofilemain.html` dan pilih **Open with Live Server**.
3. Website ini 100% statis dan siap di-deploy langsung ke **GitHub Pages**, **Vercel**, **Netlify**, atau hosting cPanel apapun.

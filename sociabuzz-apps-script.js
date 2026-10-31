/**
 * ==========================================================================
 * GOOGLE APPS SCRIPT: BACKEND WEBHOOK SOCIABUZZ -> GOOGLE SHEET -> WEB PROFILE
 * ==========================================================================
 * CARA PAKAI:
 * 1. Buat Google Spreadsheet baru di Google Drive (https://sheets.new).
 * 2. Beri nama spreadsheet, misalnya: "SociaBuzz Donatur speedrals".
 * 3. Klik menu: Extensions (Ekstensi) > Apps Script.
 * 4. Hapus semua kode bawaan di editor Apps Script, lalu TEMPEL (PASTE) seluruh
 *    kode yang ada di file ini.
 * 5. Klik icon disket (Save / Simpan).
 * 6. Klik tombol "Deploy" (Terapkan) berwarna biru di kanan atas > "New deployment" (Penerapan baru).
 * 7. Pilih tipe: "Web app" (Aplikasi Web).
 * 8. Konfigurasi:
 *    - Description: "SociaBuzz Webhook & API"
 *    - Execute as: "Me" (Email Google Anda)
 *    - Who has access: "Anyone" (Siapa saja - PENTING agar website & SociaBuzz bisa akses)
 * 9. Klik "Deploy" > Berikan izin otorisasi Google ("Authorize access" > pilih akun > Advanced > Go to Untitled (unsafe) > Allow).
 * 10. Salin "Web app URL" (formatnya: https://script.google.com/macros/s/AKfycb.../exec).
 *
 * TAHAP AKHIR:
 * - Tempel URL tersebut di file: data/links.js pada bagian "topDonatorsApiUrl"
 * - Tempel URL tersebut di Dashboard SociaBuzz:
 *   Login SociaBuzz > Menu TRIBE > Integrations / Webhook > Paste URL Webhook > Aktifkan (ON).
 * ==========================================================================
 */

// 1. Menerima notifikasi donasi dari SociaBuzz secara otomatis 24 Jam
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Inisialisasi Header Tabel jika sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Waktu Transaksi", "Nama Donatur", "Nominal (Angka)", "Format Tampilan", "Pesan Dukungan"]);
      var headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#134e4a"); // Warna teal dark
      headerRange.setFontColor("#f0fdfa");
    }

    // Parsing data payload dari SociaBuzz
    var payload = {};
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (err) {
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    // Mengambil data donasi dengan fallback variasi field yang fleksibel
    var dataObj = payload.data || payload;
    
    var name = dataObj.supporter_name || 
               dataObj.supporter || 
               dataObj.donor || 
               dataObj.name || 
               dataObj.buyer_name || 
               "Anonim";

    var rawAmount = dataObj.amount || 
                    dataObj.total || 
                    dataObj.price || 
                    dataObj.nominal || 
                    0;

    var numAmount = parseInt(String(rawAmount).replace(/[^0-9]/g, ''), 10) || 0;
    
    var formattedAmount = dataObj.formatted_amount || 
                          ("Rp " + numAmount.toLocaleString('id-ID'));

    var message = dataObj.message || 
                  dataObj.comment || 
                  dataObj.note || 
                  dataObj.pesan || 
                  "-";

    var timestamp = new Date();

    // Simpan baris donasi baru ke Google Sheet
    sheet.appendRow([timestamp, name, numAmount, formattedAmount, message]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data donasi dari " + name + " berhasil disimpan!"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// 2. Menyajikan data Leaderboard Top Donatur untuk Website dalam format JSON
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var lastRow = sheet.getLastRow();

    // Jika belum ada donasi masuk di sheet
    if (lastRow <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        topDonators: []
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Ambil semua data donasi (kolom: Waktu, Nama, Nominal, Format, Pesan)
    var rows = sheet.getRange(2, 1, lastRow - 1, 5).getValues();

    // Akumulasikan total donasi per donatur
    var donorMap = {};
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var name = String(row[1] || "Anonim").trim();
      var amount = Number(row[2]) || 0;

      if (!donorMap[name]) {
        donorMap[name] = 0;
      }
      donorMap[name] += amount;
    }

    // Ubah ke array objek dan urutkan dari akumulasi tertinggi ke terendah
    var sortedDonators = [];
    for (var donorName in donorMap) {
      sortedDonators.push({
        name: donorName,
        total: donorMap[donorName],
        amount: "Rp " + donorMap[donorName].toLocaleString('id-ID')
      });
    }

    sortedDonators.sort(function(a, b) {
      return b.total - a.total;
    });

    // Ambil maksimal Top 10 Donatur
    var top10 = sortedDonators.slice(0, 10);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      count: top10.length,
      topDonators: top10
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// 3. Fungsi Simulasi Uji Coba (Bisa langsung di-klik "Run" di Apps Script untuk mengetes)
function testSampleDonation() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        supporter: "Sultan Pixel",
        amount: 150000,
        message: "Semangat bikin konten dan karya pixelnya!"
      })
    }
  };
  
  var result = doPost(mockEvent);
  Logger.log("Hasil simulasi POST: " + result.getContent());
  
  var getResult = doGet({});
  Logger.log("Hasil pembacaan GET Leaderboard: " + getResult.getContent());
}


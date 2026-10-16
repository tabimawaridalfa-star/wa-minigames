# WA Mini Games Bot

Bot WhatsApp berbasis JavaScript dan Node.js untuk tebak angka, suit, kuis trivia, tebak kata, dan tantangan matematika.

**Pembuat:** Alfa Tabi Mawarid — mahasiswa Teknik Informatika Universitas Muhammadiyah Purwokerto.

## Kontribusi

Saya membuat kerangka program bot. AI membantu menyusun teks balasan, emoji, dan penyajian pesan. Tantangan awal saya adalah menghubungkan program bot ke WhatsApp.

## Menjalankan

1. Pasang Node.js dan Google Chrome.
2. Jalankan npm ci di direktori repository.
3. Pada index.js, sesuaikan executablePath dengan lokasi Chrome di komputer Anda bila berbeda.
4. Jalankan npm start.
5. Gunakan WhatsApp > Perangkat tertaut untuk memindai QR yang muncul di komputer Anda sendiri.

Folder node_modules, .wwebjs_auth, dan .wwebjs_cache tidak disertakan. Sesi autentikasi dibuat secara lokal saat login; simpan folder tersebut hanya di komputer Anda. Gunakan akun dan grup yang Anda berhak kelola.

---

## Dokumentasi permainan


Bot WhatsApp untuk bermain mini games seru di grup! Langsung mainkan di grup WhatsApp tanpa perlu install apapun di HP.

## 📋 Daftar Game

| Game | Perintah | Deskripsi |
|------|----------|-----------|
| 🎯 Tebak Angka | `!tebakangka` | Tebak angka 1-100 dengan petunjuk panas/dingin |
| ✂️ Suit | `!suit` | Batu Gunting Kertas lawan teman |
| 🧠 Kuis Trivia | `!kuis` | 5 pertanyaan pengetahuan umum |
| 📝 Tebak Kata | `!tebakkata` | Tebak kata seperti Hangman |
| ➕ Math Challenge | `!math` | Tantangan matematika cepat |

## 🚀 Cara Install & Jalankan

### Prasyarat
- [Node.js](https://nodejs.org/) versi 16 atau lebih baru
- Google Chrome / Chromium browser

### Langkah-langkah

1. **Masuk ke folder project:**
   ```bash
   cd wa-minigames
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Jalankan bot:**
   ```bash
   npm start
   ```

4. **Scan QR Code:**
   - QR Code akan muncul di terminal
   - Buka WhatsApp di HP
   - Pergi ke **Menu (⋮)** → **Linked Devices** → **Link a Device**
   - Scan QR Code yang muncul di terminal

5. **Bot siap digunakan!** 🎉
   - Ketik `!menu` di grup WhatsApp

## 📖 Perintah Lengkap

### 🎯 Tebak Angka
| Perintah | Fungsi |
|----------|--------|
| `!tebakangka` | Mulai game |
| `!tebak [angka]` | Tebak angka (contoh: `!tebak 50`) |
| `!stoptebak` | Hentikan game |

### ✂️ Suit (Batu Gunting Kertas)
| Perintah | Fungsi |
|----------|--------|
| `!suit` | Buat tantangan |
| `!lawan` | Terima tantangan |
| `!pilih [pilihan]` | Pilih batu/gunting/kertas |
| `!stopsuit` | Hentikan game |

### 🧠 Kuis Trivia
| Perintah | Fungsi |
|----------|--------|
| `!kuis` | Mulai kuis 5 pertanyaan |
| `!jawab [A/B/C/D]` | Jawab pertanyaan |
| `!stopkuis` | Hentikan kuis |

### 📝 Tebak Kata (Hangman)
| Perintah | Fungsi |
|----------|--------|
| `!tebakkata` | Mulai game |
| `!huruf [huruf]` | Tebak satu huruf |
| `!kata [kata]` | Tebak kata langsung |
| `!stopkata` | Hentikan game |

### ➕ Math Challenge
| Perintah | Fungsi |
|----------|--------|
| `!math` | Mulai tantangan |
| `!hitung [jawaban]` | Jawab soal |
| `!stopmath` | Hentikan game |

## 💡 Tips
- Bot hanya merespons perintah yang dimulai dengan `!`
- Setiap game bisa dimainkan secara bersamaan (beda game)
- Semua anggota grup bisa ikut bermain
- Bot harus tetap berjalan di komputer agar aktif

## ⚠️ Catatan Penting
- Jangan spam perintah terlalu cepat agar akun WA tidak dibatasi
- Bot ini menggunakan `whatsapp-web.js` (library tidak resmi)
- Gunakan dengan bijak dan bertanggung jawab


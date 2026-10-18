# Website Portofolio & Personal Branding — Muchamad Nur Fazri

Website *landing page* pribadi modern, kreatif, dan profesional yang dirancang khusus untuk **Muchamad Nur Fazri** (Mahasiswa S1 Manajemen di Universitas Pelita Bangsa). Website ini mengusung estetika *editorial design* dan *modern brutalism* dengan palet warna arang, oranye terang, dan *neon lime*, serta siap dipublikasikan langsung melalui **GitHub Pages**.

---

## 🎨 Konsep & Identitas Desain

- **Nama**: Muchamad Nur Fazri
- **Status**: Mahasiswa S1 Manajemen — Universitas Pelita Bangsa
- **Moto Pribadi**: *"ALL IS WELL"*
- **Minat & Keahlian**: Networking, Electrical Engineering, Manajemen Bisnis & Pengembangan Diri, serta Futsal (Kerja Sama Tim & Kedisiplinan).
- **Palet Warna**:
  - Background Utama: Hitam Arang (`#101014`)
  - Aksen Utama: Oranye Terang (`#FF633D`)
  - Aksen Kedua: Neon Lime (`#D5FF3F`)
  - Teks Utama: Putih Tulang (`#F4F1E9`)
  - Kartu & Permukaan: Slate Gelap (`#17171E` / `#1F1F28`)
- **Tipografi**: Space Grotesk (Heading & Body) dan DM Mono (Label, Metrik & Monospace).

---

## 📂 Struktur File

```text
muchamadnurf-tech.github.io/
│
├── index.html           # Struktur semantik HTML5 halaman utama
├── style.css            # Desain editorial, modern brutalist, responsif & animasi
├── script.js            # Interaktivitas: scroll reveal, mobile drawer, modal, copy email
├── favicon.svg          # Favicon vector modern brutalist logo "F."
├── README.md            # Dokumentasi & panduan deployment
└── assets/
    ├── profile.jpg      # Foto profil asli Muchamad Nur Fazri (Jas Almamater UPB)
    ├── project-1.jpg    # Placeholder visual proyek: Business Case Study
    ├── project-2.jpg    # Placeholder visual proyek: Networking Exploration
    └── project-3.jpg    # Placeholder visual proyek: Teamwork & Organization
```

---

## 🚀 1. Cara Menjalankan Website Secara Lokal

Website ini dibangun menggunakan **Vanilla HTML5, CSS3, dan JavaScript** murni tanpa ketergantungan framework (*zero dependencies*), sehingga tidak memerlukan proses build atau compile.

### Cara 1: Menggunakan Browser Langsung
Cukup klik ganda (double-click) file `index.html` pada File Explorer Anda, atau klik kanan lalu pilih **Open With** → Google Chrome / Microsoft Edge / Mozilla Firefox.

### Cara 2: Menggunakan VS Code Live Server (Direkomendasikan)
1. Buka folder proyek ini di Visual Studio Code.
2. Pasang ekstensi **Live Server** (oleh Ritwick Dey).
3. Klik kanan pada file `index.html` dan pilih **Open with Live Server**.
4. Website akan terbuka otomatis di alamat `http://127.0.0.1:5500/`.

### Cara 3: Menggunakan Python HTTP Server
Buka terminal/PowerShell di folder proyek, lalu jalankan:
```bash
python -m http.server 8000
```
Buka browser dan akses `http://localhost:8000`.

---

## 📸 2. Pengelolaan Foto Profil

Foto profil utama Anda saat ini aktif menggunakan foto asli berjas almamater Universitas Pelita Bangsa pada file `assets/profile.jpg`.

Jika di kemudian hari ingin mengganti atau memperbarui foto:
1. Siapkan foto terbaru Anda (disarankan rasio **3:4** atau **4:5**, format `.jpg` atau `.png`).
2. Ganti nama file foto Anda menjadi `profile.jpg` dan simpan di folder `assets/` (menimpa file lama).
3. Atau ubah atribut `src` pada elemen `<img>` di bagian Hero Section file `index.html`.

---

## ✉️ 3. Cara Mengganti Email dan Tautan Media Sosial

### Mengganti Alamat Email:
1. Buka `index.html`.
2. Cari bagian `<!-- G. CONTACT -->`.
3. Ganti placeholder `muchamadnur.fazri@example.com` pada:
   - Tombol kirim email:
     ```html
     href="mailto:alamat.email.anda@gmail.com?subject=Halo..."
     ```
   - Atribut tombol salin:
     ```html
     data-email="alamat.email.anda@gmail.com"
     ```
4. Buka juga `script.js`, cari variabel `recipient`:
   ```javascript
   const recipient = 'alamat.email.anda@gmail.com';
   ```

### Mengganti Tautan LinkedIn & GitHub:
Pada bagian `index.html` (bagian Kontak):
- Ganti `https://linkedin.com/in/your-profile` dengan link profil LinkedIn Anda yang sebenarnya.
- Periksa tautan GitHub `https://github.com/muchamadnurf-tech` (sudah sesuai dengan username GitHub Anda).

---

## 🎓 4. Cara Mengedit Proyek dan Informasi Pendidikan

### Mengedit Informasi Pendidikan:
Buka `index.html` pada bagian `<!-- F. EDUCATION -->`:
- Cari bagian `edu-slots-grid` untuk mengubah:
  - Tahun masuk (misal: `2023 - Sekarang`)
  - Semester berjalan (misal: `Semester 4`)
  - Fokus/Peminatan (misal: `Manajemen Pemasaran` atau `Manajemen Operasional`)
- Pada bagian `placeholder-timeline`, Anda dapat menambahkan sertifikasi pelatihan atau kegiatan organisasi yang telah Anda ikuti.

### Mengedit Kartu Proyek:
Buka `index.html` pada bagian `<!-- E. PROJECTS -->`:
- Setiap kartu proyek memiliki tag `<article class="project-card">`.
- Anda dapat mengganti:
  - Judul proyek (`project-title`)
  - Kategori badge (`project-category-badge`)
  - Deskripsi ringkas (`project-description`)
  - Tag keahlian (`project-tags`)
  - Gambar proyek (`assets/project-1.jpg`, dst.)
- Jika ingin memperbarui detail teks yang muncul di dialog *popup modal*, buka `script.js` pada objek `projectData` dan sesuaikan deskripsi lengkapnya.

---

## 📤 5. Cara Mengunggah File ke Repository GitHub

Buka PowerShell atau Git Bash di dalam folder proyek ini, lalu jalankan langkah-langkah berikut:

```bash
# 1. Periksa status file yang berubah atau baru ditambahkan
git status

# 2. Tambahkan semua file ke staging area
git add .

# 3. Buat commit deskriptif
git commit -m "feat: complete modern personal branding website for Muchamad Nur Fazri"

# 4. Pastikan branch utama bernama main
git branch -M main

# 5. Push ke repository GitHub Anda
git push -u origin main
```

---

## 🌐 6. Cara Mengaktifkan GitHub Pages

Setelah file berhasil di-push ke GitHub:
1. Buka browser dan kunjungi repository Anda:  
   `https://github.com/muchamadnurf-tech/muchamadnurf-tech.github.io`
2. Klik tab **Settings** di menu atas repository.
3. Di panel menu kiri, klik menu **Pages** (di bawah kategori *Code and automation*).
4. Pada bagian **Build and deployment**:
   - **Source**: Pilih **Deploy from a branch**.
   - **Branch**: Pilih **main** dan folder **/(root)**.
   - Klik tombol **Save**.
5. Tunggu sekitar 1–3 menit hingga GitHub Actions selesai mempublikasikan halaman.
6. Website portofolio Anda akan aktif dan dapat diakses publik di:  
   👉 **`https://muchamadnurf-tech.github.io/`**

---

## ✨ Fitur-Fitur Utama Website

- ⚡ **Desain Editorial & Brutalist**: Tipografi asimetris yang tegas, kartu bergaris halus, aksen neon lime & oranye terang.
- 📱 **100% Responsif**: Nyaman dibuka di ponsel (mulai dari 320px), tablet, hingga layar desktop lebar tanpa ada *horizontal overflow*.
- 💫 **Mikro-Animasi Halus**: Animasi *reveal* saat scroll, teks *ticker marquee* yang mengalir dinamis, efek hover pada kartu, serta dukungan `prefers-reduced-motion` untuk aksesibilitas.
- 🔍 **SEO & Meta Lengkap**: Title, deskripsi, Open Graph untuk LinkedIn/Facebook, Twitter Cards, dan favicon SVG logo "F.".
- 📋 **Interaksi Lengkap**: Tombol salin email instan, formulir kontak client-side yang terintegrasi dengan aplikasi email, dialog modal detail proyek, serta menu drawer mobile yang mulus.

---

*Dibuat untuk Muchamad Nur Fazri — "ALL IS WELL"*
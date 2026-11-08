# Daftar Tugas Kuliah

Aplikasi sederhana untuk membantu mahasiswa mengelola tugas kuliah menggunakan React dan TypeScript.

## Identitas Mahasiswa

- Nama: Aulia Safarina Dwi Rahayu
- NIM: 1247050012
- Program Studi: Teknik Informatika
- Mata Kuliah: Pengembangan Aplikasi Web (PAW)

## Teknologi

- React
- TypeScript
- Vite
- CSS
- LocalStorage

## Fitur Aplikasi

- Menambahkan tugas kuliah.
- Mengedit judul tugas.
- Menghapus tugas.
- Mengubah status tugas menjadi selesai atau belum selesai.
- Menghapus semua tugas yang sudah selesai.
- Mencari tugas berdasarkan judul.
- Memfilter tugas berdasarkan status.
- Menampilkan jumlah total tugas, tugas selesai, dan belum selesai.
- Menyimpan daftar tugas secara otomatis menggunakan LocalStorage.

## Komponen React

1. **Header** – Menampilkan judul aplikasi dan identitas mahasiswa.
2. **TaskCounter** – Menampilkan ringkasan jumlah tugas.
3. **TaskForm** – Menyediakan form untuk menambahkan tugas.
4. **TaskItem** – Menampilkan setiap tugas beserta tombol aksi.
5. **TaskList** – Menampilkan daftar tugas menggunakan `map()`.
6. **TaskFilter** – Menyediakan fitur pencarian dan filter tugas.
7. **Footer** – Menampilkan informasi bagian bawah aplikasi.

## Konsep React yang Digunakan

- **Components:** Membagi tampilan aplikasi menjadi beberapa komponen terpisah.
- **Props:** Mengirim data dan fungsi antar komponen.
- **State:** Mengelola data tugas, pencarian, dan filter menggunakan `useState`.
- **Event Handling:** Menangani aksi pengguna seperti menambah, mengedit, menghapus, dan mengubah status tugas.
- **Conditional Rendering:** Menampilkan pesan ketika daftar tugas kosong dan tombol hapus tugas selesai ketika diperlukan.
- **List Rendering:** Menampilkan daftar tugas menggunakan `map()` dan `key`.
- **useEffect:** Menyimpan perubahan daftar tugas ke LocalStorage.

## Menjalankan Aplikasi

Install dependencies:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Build aplikasi:

```bash
npm run build
```

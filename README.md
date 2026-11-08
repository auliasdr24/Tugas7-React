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

## Penjelasan Penerapan Konsep React

### 1. Components
Aplikasi dibagi menjadi beberapa komponen, seperti Header, TaskForm, TaskList, dan Footer. Setiap komponen memiliki fungsi masing-masing sehingga kode lebih terstruktur dan mudah dikelola.

### 2. Props
Props digunakan untuk mengirimkan data dan fungsi dari komponen induk ke komponen anak. Contohnya, TaskCounter menerima data jumlah tugas melalui props `total` dan `selesai`. TaskList juga menerima daftar tugas serta fungsi untuk mengedit, menghapus, dan mengubah status tugas.

### 3. State
`useState` digunakan untuk mengelola data yang dapat berubah, seperti daftar tugas, kata pencarian, pilihan filter, dan mode edit. Ketika state berubah, tampilan aplikasi akan diperbarui secara otomatis.

### 4. Event Handling
Event handling diterapkan pada tombol dan form untuk menangani interaksi pengguna. Contohnya adalah menambahkan tugas, menyimpan hasil edit, menghapus tugas, mengubah status tugas, serta melakukan pencarian dan filter.

### 5. Conditional Rendering
Conditional rendering digunakan untuk menampilkan elemen berdasarkan kondisi tertentu. Contohnya, pesan "Belum ada tugas" muncul ketika daftar tugas kosong. Tombol "Hapus Semua Tugas Selesai" hanya muncul ketika terdapat tugas yang sudah selesai.

### 6. List Rendering
List rendering menggunakan fungsi `map()` untuk menampilkan data tugas ke dalam daftar. Setiap tugas memiliki `key` berupa ID unik agar React dapat mengenali setiap item.

### 7. useEffect dan LocalStorage
`useEffect` digunakan untuk menyimpan perubahan data tugas ke LocalStorage. Dengan demikian, daftar tugas tetap tersimpan meskipun halaman aplikasi dimuat ulang.

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

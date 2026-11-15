
import { useState, type FormEvent } from "react";
import "./style.css";

import type { Task, Note } from "./types";

import {
  initialTasks,
  initialNotes,
} from "./data/initialData";

import usePersistentState from "./hooks/usePersistentState";

const jadwalKuliah = [
  {
    no: 1,
    kode: "20100470501024",
    nama: "Manajemen Basis Data",
    semester: 5,
    kelas: "A",
    sks: 3,
    jam: "Senin, 09:30 - 12:00",
    dosen: "Wildan Budiawan Zulfikar S.T., M.Kom.",
  },
  {
    no: 2,
    kode: "20100470501026",
    nama: "Jaringan Komputer",
    semester: 5,
    kelas: "A",
    sks: 3,
    jam: "Rabu, 09:30 - 12:00",
    dosen: "Cecep Nurul Alam M.T.",
  },
  {
    no: 3,
    kode: "20100470501028",
    nama: "Pengembangan Aplikasi Mobile",
    semester: 5,
    kelas: "A",
    sks: 3,
    jam: "Kamis, 09:30 - 12:00",
    dosen: "H. Aldy Rialdy Atmadja M.T",
  },
  {
    no: 4,
    kode: "20100470501030",
    nama: "Pengembangan Aplikasi Web",
    semester: 5,
    kelas: "A",
    sks: 3,
    jam: "Kamis, 15:30 - 18:00",
    dosen: "Muhammad Deden Firdaus ST, M.Kom",
  },
  {
    no: 5,
    kode: "20100470501032",
    nama: "Interaksi Manusia dan Komputer",
    semester: 5,
    kelas: "A",
    sks: 3,
    jam: "Rabu, 07:00 - 09:30",
    dosen: "Dr. Cepy Slamet S.T., M.Kom.",
  },
  {
    no: 6,
    kode: "20100470501034",
    nama: "Manajemen Proyek Perangkat Lunak",
    semester: 5,
    kelas: "A",
    sks: 3,
    jam: "Senin, 07:00 - 09:30",
    dosen: "Agung Wahana S.E., M.T.",
  },
  {
    no: 7,
    kode: "201004705003005",
    nama: "ICT dan Islam",
    semester: 7,
    kelas: "D",
    sks: 2,
    jam: "Selasa, 07:00 - 08:40",
    dosen: "Maulana Hasan M. Kom",
  },
  {
    no: 8,
    kode: "201004705003006",
    nama: "Kewirausahaan & Etika Bisnis",
    semester: 7,
    kelas: "A",
    sks: 2,
    jam: "Selasa, 10:20 - 12:00",
    dosen: "Adam Faroqi ST., MT.",
  },
];

function App() {
  const [tasks, setTasks] = usePersistentState<Task[]>(
    "studyutopia-tasks",
    initialTasks
  );

  const [notes, setNotes] = usePersistentState<Note[]>(
    "studyutopia-notes",
    initialNotes
  );

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [formTask, setFormTask] = useState({
    judul: "",
    mataKuliah: "",
    deadline: "",
    deskripsi: "",
    link: "",
    status: "Belum Selesai" as Task["status"],
  });

  const [noteText, setNoteText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState("Semua Mata Kuliah");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const formattedDate = today.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  const jumlahSelesai = tasks.filter(
    task => task.status === "Selesai"
  ).length;

  const jumlahProses = tasks.filter(
    task => task.status === "Sedang Dikerjakan"
  ).length;

  const jumlahBelum = tasks.filter(
    task => task.status === "Belum Selesai"
  ).length;

  const jumlahTotal = tasks.length;

  const persentase =
    jumlahTotal > 0
      ? Math.round((jumlahSelesai / jumlahTotal) * 100)
      : 0;

  // FORM AWAL TUGAS
  const resetTaskForm = () => {
    setFormTask({
      judul: "",
      mataKuliah: "",
      deadline: "",
      deskripsi: "",
      link: "",
      status: "Belum Selesai",
    });
  };

  // MEMBUKA FORM TAMBAH TUGAS
  const handleOpenTaskForm = () => {
    setEditingTask(null);
    resetTaskForm();
    setShowTaskForm(true);
  };

  // MENAMBAHKAN ATAU MENYIMPAN PERUBAHAN TUGAS
  const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingTask) {
      // MODE EDIT: PERBARUI TUGAS LAMA
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === editingTask.id
            ? {
                ...task,
                ...formTask,
              }
            : task
        )
      );
    } else {
      // MODE TAMBAH: BUAT TUGAS BARU
      const newTask: Task = {
        id: Date.now(),
        ...formTask,
      };

      setTasks(prevTasks => [...prevTasks, newTask]);
    }

    resetTaskForm();
    setEditingTask(null);
    setShowTaskForm(false);
  };

  // MEMBUKA FORM EDIT TUGAS
  const handleEditTask = (task: Task) => {
    setFormTask({
      judul: task.judul,
      mataKuliah: task.mataKuliah,
      deadline: task.deadline,
      deskripsi: task.deskripsi,
      link: task.link || "",
      status: task.status,
    });

    setEditingTask(task);
    setSelectedTask(null);
    setShowTaskForm(true);
  };

  // MENUTUP FORM TUGAS
  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
    resetTaskForm();
  };

  // MENAMBAHKAN NOTES
  const handleAddNote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!noteText.trim()) return;

    const newNote: Note = {
      id: Date.now(),
      teks: noteText.trim(),
      selesai: false,
    };

    setNotes(prevNotes => [...prevNotes, newNote]);
    setNoteText("");
    setShowNoteForm(false);
  };

  // MENGHAPUS NOTES
  const handleDeleteNote = (id: number) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  // FILTER TUGAS
  const tugasDitampilkan = tasks.filter(task => {
    const cocokCari =
      task.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.mataKuliah.toLowerCase().includes(searchQuery.toLowerCase());

    const cocokMatkul =
      filterSubject === "Semua Mata Kuliah" ||
      task.mataKuliah === filterSubject;

    return cocokCari && cocokMatkul;
  });

  // MENGUBAH DEADLINE MENJADI DATE
  const parseDeadline = (deadline: string) => {
    const parts = deadline.split("-");
    if (parts.length !== 3) return null;

    const [year, month, day] = parts.map(Number);

    if (!year || !month || !day) return null;

    return new Date(year, month - 1, day);
  };

  // MENCARI TUGAS PADA TANGGAL TERTENTU
  const getTasksOnDate = (day: number) => {
    return tasks.filter(task => {
      const deadline = parseDeadline(task.deadline);

      return (
        deadline &&
        deadline.getFullYear() === currentYear &&
        deadline.getMonth() === currentMonth &&
        deadline.getDate() === day
      );
    });
  };

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const firstDay = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();

  const calendarOffset = firstDay === 0 ? 6 : firstDay - 1;

  // PENGINGAT DEADLINE 3 HARI KE DEPAN
  const upcomingTasks = tasks
    .filter(task => {
      const deadline = parseDeadline(task.deadline);

      if (!deadline || task.status === "Selesai") return false;

      const difference = Math.ceil(
        (deadline.getTime() -
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          ).getTime()) /
          86400000
      );

      return difference >= 0 && difference <= 3;
    })
    .sort((a, b) => a.deadline.localeCompare(b.deadline));

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // VIEW ALL: TAMPILKAN SEMUA TUGAS
  const handleViewAllTasks = () => {
    setSearchQuery("");
    setFilterSubject("Semua Mata Kuliah");
    scrollToSection("daftar-tugas");
  };

  const monthName = today.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="studyutopia-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">S</div>
          <span>STUDYUTOPIA</span>
        </div>

        <div className="sidebar-menu">
          <p className="menu-label">MENU UTAMA</p>

          <button
            className="menu-item active"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          >
            <span>⌂</span> Dashboard
          </button>

          <button
            className="menu-item"
            onClick={() => scrollToSection("daftar-tugas")}
          >
            <span>▤</span> Tugas
          </button>

          <button
            className="menu-item"
            onClick={() => scrollToSection("jadwal-kuliah")}
          >
            <span>▦</span> Jadwal Kuliah
          </button>

          <button
            className="add-task-button"
            onClick={handleOpenTaskForm}
          >
            + Tambah Tugas
          </button>
        </div>

        <div className="student-profile">
          <div className="student-avatar">AS</div>
          <div>
            <strong>Aulia Safarina Dwi Rahayu</strong>
            <p>1247050012</p>
            <small>Teknik Informatika</small>
          </div>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="main-content" id="dashboard">

        <header className="top-header">
          <div>
            <p className="greeting">Selamat datang kembali 👋</p>
            <h1>Dashboard Belajar</h1>
            <p className="header-description">
              Atur aktivitas kuliahmu agar lebih terorganisir.
            </p>
          </div>

          <div className="date-display">
            <span>📅</span>
            <p>{formattedDate}</p>
          </div>
        </header>

        {/* 1. STATISTIK TUGAS */}
        <section className="stats-card" id="statistik">
          <div className="section-heading">
            <div>
              <h2>Statistik Tugas</h2>
              <p>Pantau perkembangan tugas perkuliahanmu</p>
            </div>
          </div>

          <div className="chart-area">
            {[
              {
                label: "Selesai",
                value: jumlahSelesai,
                className: "bar-done",
              },
              {
                label: "Sedang Dikerjakan",
                value: jumlahProses,
                className: "bar-process",
              },
              {
                label: "Belum Selesai",
                value: jumlahBelum,
                className: "bar-pending",
              },
            ].map(item => (
              <div className="chart-column" key={item.label}>
                <strong>{item.value}</strong>

                <div className="chart-bar-track">
                  <div
                    className={`chart-bar ${item.className}`}
                    style={{
                      height: `${
                        jumlahTotal > 0
                          ? (item.value / jumlahTotal) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>

                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="stats-summary">
            <div className="summary-item">
              <strong>{jumlahTotal}</strong>
              <p>Total Tugas</p>
            </div>

            <div className="summary-item">
              <strong>{jumlahBelum + jumlahProses}</strong>
              <p>Belum Selesai</p>
            </div>

            <div className="summary-item">
              <strong>{jumlahSelesai}</strong>
              <p>Selesai</p>
            </div>
          </div>

          <div className="progress-area">
            <div className="progress-label">
              <span>Progres penyelesaian tugas</span>
              <strong>{persentase}%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${persentase}%` }}
              />
            </div>
          </div>
        </section>

        {/* 2. KALENDER, PENGINGAT, NOTES */}
        <section className="planning-section">

          {/* KALENDER */}
          <div className="calendar-card">
            <div className="section-heading">
              <div>
                <h2>Kalender</h2>
                <p>{monthName}</p>
              </div>
              <span>📅</span>
            </div>

            <div className="calendar-grid">
              {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map(
                day => (
                  <div className="calendar-weekday" key={day}>
                    {day}
                  </div>
                )
              )}

              {Array.from({ length: calendarOffset }).map(
                (_, index) => (
                  <div
                    className="calendar-day empty"
                    key={`empty-${index}`}
                  />
                )
              )}

              {Array.from({ length: daysInMonth }, (_, index) => {
                const day = index + 1;
                const dayTasks = getTasksOnDate(day);
                const isToday = day === today.getDate();

                return (
                  <button
                    key={day}
                    className={`calendar-day ${
                      isToday ? "today" : ""
                    } ${selectedDate === day ? "selected" : ""}`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <span>{day}</span>
                    {dayTasks.length > 0 && (
                      <span className="calendar-dot" />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedDate !== null && (
              <div className="calendar-selection">
                <strong>
                  {selectedDate}{" "}
                  {today.toLocaleDateString("id-ID", {
                    month: "long",
                  })}
                </strong>

                {getTasksOnDate(selectedDate).length > 0 ? (
                  getTasksOnDate(selectedDate).map(task => (
                    <p key={task.id}>
                      {task.judul} · {task.mataKuliah}
                    </p>
                  ))
                ) : (
                  <p>Tidak ada deadline tugas pada tanggal ini.</p>
                )}
              </div>
            )}
          </div>

          {/* PENGINGAT */}
          <div className="side-widget">
            <div className="section-heading">
              <div>
                <h2>Pengingat</h2>
                <p>Deadline 3 hari ke depan</p>
              </div>
              <span>🔔</span>
            </div>

            {upcomingTasks.length === 0 ? (
              <div className="empty-state compact">
                <span>🌿</span>
                <p>Belum ada pengingat.</p>
                <small>
                  Tugas yang mendekati deadline akan muncul di sini.
                </small>
              </div>
            ) : (
              <div className="reminder-list">
                {upcomingTasks.map(task => (
                  <div className="reminder-item" key={task.id}>
                    <strong>{task.judul}</strong>
                    <p>{task.mataKuliah}</p>
                    <small>Deadline: {task.deadline}</small>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* NOTES */}
          <div className="side-widget">
            <div className="section-heading">
              <div>
                <h2>Notes</h2>
                <p>Catatan harianmu</p>
              </div>
              <span>📝</span>
            </div>

            <button
              className="add-note-button"
              onClick={() => setShowNoteForm(true)}
            >
              + Tambahkan Notes
            </button>

            {notes.length === 0 ? (
              <div className="empty-state compact">
                <span>📒</span>
                <p>Belum ada catatan.</p>
                <small>Tambahkan catatan agar tidak lupa.</small>
              </div>
            ) : (
              <div className="notes-list">
                {notes.map(note => (
                  <div className="note-item" key={note.id}>
                    <p>{note.teks}</p>
                    <button
                      type="button"
                      onClick={() => handleDeleteNote(note.id)}
                      title="Hapus catatan"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 3. DAFTAR TUGAS */}
        <section className="content-card" id="daftar-tugas">
          <div className="section-heading">
            <div>
              <h2>Daftar Tugas</h2>
              <p>Kelola dan pantau tugas perkuliahanmu</p>
            </div>

            <button
              className="view-all-button"
              onClick={handleViewAllTasks}
            >
              View All ›
            </button>
          </div>

          <div className="task-toolbar">
            <input
              type="text"
              placeholder="Cari tugas..."
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
            />

            <select
              value={filterSubject}
              onChange={event => setFilterSubject(event.target.value)}
            >
              <option value="Semua Mata Kuliah">
                Semua Mata Kuliah
              </option>

              {[...new Set(tasks.map(task => task.mataKuliah))].map(
                subject => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="task-table-wrapper">
            <table className="task-table">
              <thead>
                <tr>
                  <th>Mata Kuliah</th>
                  <th>Nama Tugas</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {tugasDitampilkan.map(task => (
                  <tr key={task.id}>
                    <td>{task.mataKuliah}</td>
                    <td>{task.judul}</td>
                    <td>{task.deadline}</td>

                    <td>
                      <span
                        className={`status-badge ${
                          task.status === "Selesai"
                            ? "status-done"
                            : task.status === "Sedang Dikerjakan"
                              ? "status-process"
                              : "status-pending"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="detail-button"
                        onClick={() => setSelectedTask(task)}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}

                {tugasDitampilkan.length === 0 && (
                  <tr>
                    <td colSpan={5} className="table-empty">
                      Belum ada tugas yang ditampilkan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. JADWAL KULIAH */}
        <section className="content-card" id="jadwal-kuliah">
          <div className="section-heading">
            <div>
              <h2>Jadwal Kuliah</h2>
              <p>Daftar Mata Kuliah Semester 5 - Tahun Akademik 2026/2027</p>
            </div>
          </div>

          <div className="schedule-table-wrapper">
            <table className="schedule-table">
              <caption>
                Daftar Mata Kuliah Semester 5 - Tahun Akademik 2026/2027
              </caption>

              <thead>
                <tr>
                  <th>No</th>
                  <th>Kode</th>
                  <th>Mata Kuliah</th>
                  <th>Smstr</th>
                  <th>Kelas</th>
                  <th>SKS</th>
                  <th>Jam</th>
                  <th>Dosen</th>
                </tr>
              </thead>

              <tbody>
                {jadwalKuliah.map(item => (
                  <tr key={item.no}>
                    <td>{item.no}</td>
                    <td>{item.kode}</td>
                    <td>{item.nama}</td>
                    <td>{item.semester}</td>
                    <td>{item.kelas}</td>
                    <td>{item.sks}</td>
                    <td>{item.jam}</td>
                    <td>{item.dosen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="app-footer">
          STUDYUTOPIA · Pengembangan Aplikasi Web · 2026
        </footer>
      </main>

      {/* POPUP TAMBAH / EDIT TUGAS */}
      {showTaskForm && (
        <div
          className="modal-overlay"
          onClick={handleCloseTaskForm}
        >
          <div
            className="task-modal"
            onClick={event => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>
                  {editingTask ? "Edit Tugas" : "Tambah Tugas Baru"}
                </h2>
                <p>
                  {editingTask
                    ? "Ubah informasi tugas sesuai kebutuhanmu."
                    : "Isi informasi tugas kuliahmu di bawah ini."}
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={handleCloseTaskForm}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddTask} className="task-form">
              <div className="form-group">
                <label>Nama Tugas</label>
                <input
                  type="text"
                  placeholder="Contoh: Membuat laporan praktikum"
                  value={formTask.judul}
                  onChange={event =>
                    setFormTask({
                      ...formTask,
                      judul: event.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Mata Kuliah</label>
                <input
                  type="text"
                  placeholder="Contoh: Pengembangan Aplikasi Web"
                  value={formTask.mataKuliah}
                  onChange={event =>
                    setFormTask({
                      ...formTask,
                      mataKuliah: event.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Deadline</label>
                  <input
                    type="date"
                    value={formTask.deadline}
                    onChange={event =>
                      setFormTask({
                        ...formTask,
                        deadline: event.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formTask.status}
                    onChange={event =>
                      setFormTask({
                        ...formTask,
                        status: event.target.value as Task["status"],
                      })
                    }
                  >
                    <option value="Belum Selesai">Belum Selesai</option>
                    <option value="Sedang Dikerjakan">
                      Sedang Dikerjakan
                    </option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Deskripsi Tugas</label>
                <textarea
                  placeholder="Tuliskan detail atau instruksi tugas..."
                  rows={4}
                  value={formTask.deskripsi}
                  onChange={event =>
                    setFormTask({
                      ...formTask,
                      deskripsi: event.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Link Tugas (Opsional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formTask.link}
                  onChange={event =>
                    setFormTask({
                      ...formTask,
                      link: event.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCloseTaskForm}
                >
                  Batal
                </button>

                <button type="submit" className="save-button">
                  {editingTask ? "Simpan Perubahan" : "Simpan Tugas"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP TAMBAH NOTES */}
      {showNoteForm && (
        <div
          className="modal-overlay"
          onClick={() => setShowNoteForm(false)}
        >
          <div
            className="task-modal note-modal"
            onClick={event => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>Tambahkan Notes</h2>
                <p>Tulis catatan atau hal penting yang ingin kamu ingat.</p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setShowNoteForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddNote} className="task-form">
              <div className="form-group">
                <label>Isi Catatan</label>
                <textarea
                  rows={5}
                  placeholder="Tulis catatanmu di sini..."
                  value={noteText}
                  onChange={event => setNoteText(event.target.value)}
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowNoteForm(false)}
                >
                  Batal
                </button>

                <button type="submit" className="save-button">
                  Simpan Notes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP DETAIL TUGAS */}
      {selectedTask && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedTask(null)}
        >
          <div
            className="task-modal detail-modal"
            onClick={event => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>Detail Tugas</h2>
                <p>Informasi lengkap tugas perkuliahanmu.</p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setSelectedTask(null)}
              >
                ×
              </button>
            </div>

            <div className="detail-content">
              <div className="detail-item">
                <span>Nama Tugas</span>
                <strong>{selectedTask.judul}</strong>
              </div>

              <div className="detail-item">
                <span>Mata Kuliah</span>
                <strong>{selectedTask.mataKuliah}</strong>
              </div>

              <div className="detail-item">
                <span>Deadline</span>
                <strong>{selectedTask.deadline}</strong>
              </div>

              <div className="detail-item">
                <span>Status</span>
                <strong
                  className={`status-badge ${
                    selectedTask.status === "Selesai"
                      ? "status-done"
                      : selectedTask.status === "Sedang Dikerjakan"
                        ? "status-process"
                        : "status-pending"
                  }`}
                >
                  {selectedTask.status}
                </strong>
              </div>

              <div className="detail-item">
                <span>Deskripsi Tugas</span>
                <p>
                  {selectedTask.deskripsi || "Tidak ada deskripsi tugas."}
                </p>
              </div>

              <div className="detail-item">
                <span>Link Tugas</span>
                {selectedTask.link ? (
                  <a
                    href={selectedTask.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buka Link Tugas ↗
                  </a>
                ) : (
                  <p>Belum ada link tugas.</p>
                )}
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setSelectedTask(null)}
              >
                Tutup
              </button>

              <button
                type="button"
                className="save-button"
                onClick={() => handleEditTask(selectedTask)}
              >
                ✎ Edit Tugas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

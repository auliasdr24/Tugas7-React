
export type TaskStatus =
  | "Selesai"
  | "Sedang Dikerjakan"
  | "Belum Selesai";

export interface Task {
  id: number;
  judul: string;
  mataKuliah: string;
  deadline: string;
  deskripsi: string;
  link?: string;
  status: TaskStatus;
}

export interface Course {
  id: number;
  nama: string;
  dosen: string;
  email: string;
  warna: string;
}

export interface Schedule {
  id: number;
  hari: string;
  jam: string;
  mataKuliah: string;
  dosen: string;
  ruangan: string;
}

export interface Note {
  id: number;
  teks: string;
  selesai: boolean;
}
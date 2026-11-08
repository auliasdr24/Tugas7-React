import { useState } from "react";
import "./style.css";

import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskCounter from "./components/TaskCounter";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";

type Task = {
  id: number;
  judul: string;
  selesai: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("semua");

  function tambahTugas(judul: string) {
    const tugasBaru: Task = {
      id: Date.now(),
      judul,
      selesai: false,
    };

    setTasks([...tasks, tugasBaru]);
  }

  function ubahStatus(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, selesai: !task.selesai }
          : task
      )
    );
  }

  function hapusTugas(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const jumlahSelesai = tasks.filter(
    (task) => task.selesai
  ).length;

  const tugasDitampilkan = tasks.filter((task) => {
    const cocokPencarian = task.judul
      .toLowerCase()
      .includes(search.toLowerCase());

    const cocokFilter =
      filter === "semua" ||
      (filter === "selesai" && task.selesai) ||
      (filter === "belum" && !task.selesai);

    return cocokPencarian && cocokFilter;
  });

  return (
    <div>
      <Header />

      <TaskCounter
        total={tasks.length}
        selesai={jumlahSelesai}
      />

      <TaskForm onAdd={tambahTugas} />

      <TaskFilter
        search={search}
        onSearch={setSearch}
        filter={filter}
        onFilter={setFilter}
      />

      <TaskList
        tasks={tugasDitampilkan}
        onToggle={ubahStatus}
        onDelete={hapusTugas}
      />

      <Footer />
    </div>
  );
}

export default App;
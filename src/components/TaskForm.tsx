import { useState } from "react";

type TaskFormProps = {
  onAdd: (judul: string) => void;
};

function TaskForm({ onAdd }: TaskFormProps) {
  const [judul, setJudul] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (judul.trim() === "") return;

    onAdd(judul);
    setJudul("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Masukkan nama tugas..."
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
      />

      <button type="submit">Tambah Tugas</button>
    </form>
  );
}

export default TaskForm;
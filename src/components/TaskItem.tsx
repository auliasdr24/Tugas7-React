import { useState } from "react";

type TaskItemProps = {
  judul: string;
  selesai: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (judulBaru: string) => void;
};

function TaskItem({
  judul,
  selesai,
  onToggle,
  onDelete,
  onEdit,
}: TaskItemProps) {
  const [modeEdit, setModeEdit] = useState(false);
  const [judulBaru, setJudulBaru] = useState(judul);

  function handleEdit() {
    if (judulBaru.trim() === "") return;

    onEdit(judulBaru);
    setModeEdit(false);
  }

  return (
    <div className="task-item">
      {modeEdit ? (
        <>
          <input
            type="text"
            value={judulBaru}
            onChange={(e) => setJudulBaru(e.target.value)}
          />
          <button onClick={handleEdit}>Simpan</button>
          <button onClick={() => setModeEdit(false)}>Batal</button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: selesai ? "line-through" : "none",
            }}
          >
            {judul}
          </span>

          <button onClick={onToggle}>
            {selesai ? "Batalkan" : "Selesai"}
          </button>

          <button onClick={() => {
            setJudulBaru(judul);
            setModeEdit(true);
          }}>
            Edit
          </button>

          <button onClick={onDelete}>Hapus</button>
        </>
      )}
    </div>
  );
}

export default TaskItem;
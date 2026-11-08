type TaskItemProps = {
  judul: string;
  selesai: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

function TaskItem({ judul, selesai, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="task-item">
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

      <button onClick={onDelete}>Hapus</button>
    </div>
  );
}

export default TaskItem;
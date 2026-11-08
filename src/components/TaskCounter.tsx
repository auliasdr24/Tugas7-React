type TaskCounterProps = {
  total: number;
  selesai: number;
};

function TaskCounter({ total, selesai }: TaskCounterProps) {
  return (
    <div className="task-summary">
      <div>
        <h3>{total}</h3>
        <p>Total Tugas</p>
      </div>

      <div>
        <h3>{selesai}</h3>
        <p>Tugas Selesai</p>
      </div>

      <div>
        <h3>{total - selesai}</h3>
        <p>Belum Selesai</p>
      </div>
    </div>
  );
}

export default TaskCounter;
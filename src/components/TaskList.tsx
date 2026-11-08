import TaskItem from "./TaskItem";

type Task = {
  id: number;
  judul: string;
  selesai: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, judulBaru: string) => void;
};

function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>Belum ada tugas.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            judul={task.judul}
            selesai={task.selesai}
            onToggle={() => onToggle(task.id)}
            onDelete={() => onDelete(task.id)}
            onEdit={(judulBaru) => onEdit(task.id, judulBaru)}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
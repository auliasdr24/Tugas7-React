type TaskFilterProps = {
  search: string;
  onSearch: (value: string) => void;
  filter: string;
  onFilter: (value: string) => void;
};

function TaskFilter({
  search,
  onSearch,
  filter,
  onFilter,
}: TaskFilterProps) {
  return (
    <div className="task-filter">
      <input
        type="text"
        placeholder="Cari tugas..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <select
        value={filter}
        onChange={(e) => onFilter(e.target.value)}
      >
        <option value="semua">Semua Tugas</option>
        <option value="belum">Belum Selesai</option>
        <option value="selesai">Sudah Selesai</option>
      </select>
    </div>
  );
}

export default TaskFilter;
import { useEffect, useState } from "react";
import { loadData, saveData } from "../utils/storage";

function usePersistentState<T>(key: string, initialValue: T) {
  const [data, setData] = useState<T>(() =>
    loadData(key, initialValue)
  );

  useEffect(() => {
    saveData(key, data);
  }, [key, data]);

  return [data, setData] as const;
}

export default usePersistentState;
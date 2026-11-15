
export function loadData<T>(key: string, initialValue: T): T {
  try {
    const savedData = localStorage.getItem(key);

    if (savedData === null) {
      return initialValue;
    }

    return JSON.parse(savedData) as T;
  } catch (error) {
    console.error(`Gagal membaca data ${key}:`, error);
    return initialValue;
  }
}

export function saveData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Gagal menyimpan data ${key}:`, error);
  }
}
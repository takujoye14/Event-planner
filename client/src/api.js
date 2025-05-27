const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchTestMongo() {
  const res = await fetch(`${API_BASE}/test/mongo`);
  return res.json();
}

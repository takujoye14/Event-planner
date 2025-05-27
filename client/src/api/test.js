const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getMongoTest() {
  const res = await fetch(`${BASE_URL}/test/mongo`);
  return res.json();
}


export async function getRedisTest() {
  const res = await fetch(`${BASE_URL}/test/redis`);
  return res.json();
}

export async function getNeo4jTest() {
  const res = await fetch(`${BASE_URL}/test/neo4j`);
  return res.json();
}

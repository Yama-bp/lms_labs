const API_BASE = 'http://localhost:5000/api/v1';

export async function fetchGames(params?: Record<string, string>) {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  const res = await fetch(`${API_BASE}/games/${query}`);
  return res.json();
}

export async function fetchGame(id: number) {
  const res = await fetch(`${API_BASE}/games/${id}`);
  return res.json();
}

export async function fetchPublishers() {
  const res = await fetch(`${API_BASE}/publishers/`);
  return res.json();
}

export async function fetchAggregate(type: string) {
  const res = await fetch(`${API_BASE}/aggregate/${type}`);
  return res.json();
}

export async function fetchQuiz() {
  const res = await fetch(`${API_BASE}/quiz/`);
  return res.json();
}

export async function createGame(data: any) {
  const res = await fetch(`${API_BASE}/games/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateGame(id: number, data: any) {
  const res = await fetch(`${API_BASE}/games/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteGame(id: number) {
  const res = await fetch(`${API_BASE}/games/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}
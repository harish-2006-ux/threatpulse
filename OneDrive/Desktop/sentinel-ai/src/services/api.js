const API_BASE = 'http://127.0.0.1:8000';

export const getMonitor = () => fetch(`${API_BASE}/monitor`).then(r => r.json());

export const scanURL = (url) => fetch(`${API_BASE}/scan?url=${url}`).then(r => r.json());

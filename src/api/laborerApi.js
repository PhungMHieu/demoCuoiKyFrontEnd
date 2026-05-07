import { Laborer } from '../models/Laborer.js';

const BASE_URL = '/api/laborers';

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof payload === 'string' ? payload : payload?.message || 'Có lỗi khi gọi API laborers';
    throw new Error(message);
  }

  return payload;
};

export const getLaborers = async () => {
  const response = await fetch(BASE_URL);
  const payload = await parseResponse(response);

  return Array.isArray(payload) ? payload.map((item) => Laborer.fromApi(item)).filter(Boolean) : [];
};

export const createLaborer = async (laborer) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(laborer),
  });

  return parseResponse(response);
};

export const updateLaborer = async (id, laborer) => {
  const response = await fetch(`${BASE_URL}?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...laborer }),
  });

  return parseResponse(response);
};

export const deleteLaborer = async (id) => {
  const response = await fetch(`${BASE_URL}?id=${id}`, {
    method: 'DELETE',
  });

  return parseResponse(response);
};
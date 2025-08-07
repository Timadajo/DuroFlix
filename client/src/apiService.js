const API_URL = 'http://localhost:3000';


const getToken = () => localStorage.getItem('access_token');


const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Erro na requisição.');
  }
  return data;
};



export const registerUser = async (email, username, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password }),
  });
  return handleResponse(response);
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse(response);
  

  if (data.access_token) {
    localStorage.setItem('access_token', data.access_token);
  }
  
  return data;
};



export const getWatchedMovies = async () => {
  const token = getToken();
  if (!token) {
    throw new Error('Usuário não autenticado.');
  }
  
  const response = await fetch(`${API_URL}/watched-movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
    },
  });
  return handleResponse(response);
};

export const addWatchedMovie = async (movieId) => {
  const token = getToken();
  if (!token) {
    throw new Error('Usuário não autenticado.');
  }
  
  const response = await fetch(`${API_URL}/watched-movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
    },
    body: JSON.stringify({ movieId }),
  });
  return handleResponse(response);
};

export const removeWatchedMovie = async (movieId) => {
  const token = getToken();
  if (!token) {
    throw new Error('Usuário não autenticado.');
  }
  
  
  const response = await fetch(`${API_URL}/watched-movies`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
    },
    body: JSON.stringify({ movieId }),
  });
  return handleResponse(response);
};

export const checkIfWatched = async (movieId) => {
  const token = getToken();
  if (!token) {
    return { isWatched: false };
  }
  
  const response = await fetch(`${API_URL}/watched-movies/status/${movieId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};
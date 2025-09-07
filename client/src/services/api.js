const API_URL = 'https://mov-backend-l34e.onrender.com/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Network response was not ok');
  }
  return response.json();
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials)
    });
    return handleResponse(response);
  },
  register: async (payload) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    });
    return handleResponse(response);
  },
  logout: async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    return handleResponse(response);
  }
};

export const moviesAPI = {
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    // Add search query
    if (filters.search) {
      queryParams.append('q', filters.search);
    }
    
    // Add genre filter
    if (filters.genre && filters.genre.length > 0) {
      filters.genre.forEach(g => queryParams.append('genre', g));
    }
    
    // Add year filter
    if (filters.year) {
      queryParams.append('year', filters.year);
    }
    
    // Add language filter
    if (filters.language && filters.language.length > 0) {
      filters.language.forEach(l => queryParams.append('language', l));
    }
    
    
    // Add sorting
    if (filters.sortBy) {
      queryParams.append('sortBy', filters.sortBy);
    }
    if (filters.sortOrder) {
      queryParams.append('sortOrder', filters.sortOrder);
    }
    
    const url = `${API_URL}/movies${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/movies/${id}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getFilters: async () => {
    const response = await fetch(`${API_URL}/movies/filters`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  search: async (query, filters = {}) => {
    return moviesAPI.getAll({ ...filters, search: query });
  }
};
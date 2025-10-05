import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: false,
});

export async function fetchProducts(params = {}) {
  const response = await api.get('/products/', { params });
  return response.data;
}

export default {
  fetchProducts,
};

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, options);
  if (!response.ok) {
    throw new Error(`Error ${response.status} al consultar ${path}`);
  }
  if (response.status === 204) return null;
  return response.json();
}

export function getProductos() {
  return request('/api/productos');
}

export function createProducto(producto) {
  return request('/api/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
}

export function deleteProducto(id) {
  return request(`/api/productos/${id}`, { method: 'DELETE' });
}

const env = import.meta.env || {};
export const API_URL = (env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');
export function createApi(base = API_URL, fetcher = (...args) => fetch(...args)) {
  let token = null;
  let unauthorized = () => {};
  async function request(path, method = 'GET', data, secured = true) {
    const headers = { Accept: 'application/json' };
    if (data !== undefined) headers['Content-Type'] = 'application/json';
    const sentToken = secured ? token : null;
    if (sentToken) headers.Authorization = `Bearer ${sentToken}`;
    let response;
    try { response = await fetcher(`${base.replace(/\/$/, '')}/api/v1${path}`, { method, headers, ...(data !== undefined ? { body: JSON.stringify(data) } : {}) }); }
    catch { throw new Error('No se pudo conectar al servidor. Revisa la API e Internet.'); }
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      if (response.status === 401 && sentToken && sentToken === token) { token = null; unauthorized(); }
      throw Object.assign(new Error(error.mensaje || ({401:'Credenciales inválidas o sesión vencida.',403:'Acceso no autorizado.',404:'Recurso no encontrado.',409:'Conflicto con los datos existentes.'}[response.status] || `Error HTTP ${response.status}`)), { status: response.status, campos: error.campos });
    }
    return response.status === 204 ? null : response.json();
  }
  return {
    onUnauthorized(fn) { unauthorized = fn; return () => { unauthorized = () => {}; }; },
    logout() { token = null; },
    async login(email,password) { const r = await request('/auth/login','POST',{email,password},false); token = r.token; return r.usuario; },
    register: data => request('/auth/registro','POST',data,false),
    profile: () => request('/auth/me'),
    products: () => request('/tienda/productos','GET',undefined,false),
    categories: () => request('/tienda/categorias','GET',undefined,false),
    order: data => request('/tienda/pedidos','POST',data),
    myOrders: () => request('/tienda/pedidos'),
    myOrder: id => request(`/tienda/pedidos/${id}`),
    list: kind => request(`/${kind}`),
    detail: (kind,id) => request(`/${kind}/${id}`),
    save: (kind,data,id) => request(`/${kind}${id ? `/${id}` : ''}`, id ? 'PUT' : 'POST', data),
    remove: (kind,id) => request(`/${kind}/${id}`,'DELETE'),
    status: (id,estado) => request(`/boletas/${id}/estado`,'PATCH',{estado}),
  };
}
export const api = createApi();

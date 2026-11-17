import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = (event) => {
    event.preventDefault();
    if (!user.trim() || !password.trim()) return setError('Por favor, completa todos los campos.');
    if (user === 'admin' && password === 'admin123') return navigate('/admin/usuarios');
    setError('Usuario o contraseña incorrectos.');
  };
  return <main className="container min-vh-100 d-flex align-items-center justify-content-center py-4">
    <section className="card shadow border-0 overflow-hidden w-100" style={{ maxWidth: 480 }}>
      <div className="bg-primary text-white text-center p-4 border-bottom border-warning border-4"><div className="fs-1">🔥</div><h1 className="h3">Sucursal Virtual</h1><p className="text-info mb-0">Acceso exclusivo personal autorizado</p></div>
      <form onSubmit={submit} className="p-4 d-grid gap-3">
        <label className="form-label fw-semibold">Usuario<input className="form-control mt-1" value={user} onChange={(event) => setUser(event.target.value)} placeholder="Ingresa tu usuario" /></label>
        <label className="form-label fw-semibold">Contraseña<input className="form-control mt-1" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" /></label>
        {error && <div className="alert alert-danger mb-0">{error}</div>}
        <button className="btn btn-warning fw-bold">Ingresar</button>
        <Link className="text-center text-secondary small" to="/">Volver al inicio</Link>
      </form>
    </section>
  </main>;
}

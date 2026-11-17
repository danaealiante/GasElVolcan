import { useState } from 'react';
import { Link } from 'react-router-dom';

const initialUsers = [{ id: 1, nombre: 'Ana Martínez', rol: 'Operadora', activo: true }, { id: 2, nombre: 'Carlos Silva', rol: 'Repartidor', activo: true }, { id: 3, nombre: 'Luis Soto', rol: 'Repartidor', activo: false }];

export function AdminUsuarios() {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState({ nombre: '', rol: '' });
  const [message, setMessage] = useState(null);
  const create = (event) => {
    event.preventDefault();
    if (!form.nombre.trim() || !form.rol) return setMessage({ type: 'danger', text: 'Todos los campos son obligatorios.' });
    setUsers([...users, { id: Date.now(), ...form, activo: true }]);
    setForm({ nombre: '', rol: '' });
    setMessage({ type: 'success', text: 'Usuario creado exitosamente.' });
  };
  const toggle = (id) => setUsers(users.map((user) => user.id === id ? { ...user, activo: !user.activo } : user));
  return <><nav className="navbar navbar-dark bg-primary"><div className="container"><span className="navbar-brand fw-bold">👥 USUARIOS</span><span className="text-white">Administrador: Admin General <Link className="text-warning ms-3" to="/">Salir</Link></span></div></nav><main className="container py-5"><h1 className="h2 fw-bold text-primary">Gestión de usuarios</h1><p className="text-secondary">Crea, edita, desactiva y asigna roles al personal.</p>
    {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}<div className="row g-4"><section className="col-lg-4"><form onSubmit={create} className="card card-body shadow-sm border-0 d-grid gap-3"><h2 className="h5">Nuevo usuario</h2><label className="form-label fw-semibold">Nombre completo<input className="form-control mt-1" value={form.nombre} onChange={(event) => setForm({ ...form, nombre: event.target.value })} /></label><label className="form-label fw-semibold">Rol<select className="form-select mt-1" value={form.rol} onChange={(event) => setForm({ ...form, rol: event.target.value })}><option value="">Seleccione rol...</option><option>Administrador</option><option>Operadora</option><option>Repartidor</option></select></label><button className="btn btn-primary">Crear usuario</button></form></section>
      <section className="col-lg-8"><div className="card shadow-sm border-0"><div className="card-header fw-bold">Usuarios del sistema</div><div className="table-responsive"><table className="table mb-0 align-middle"><thead><tr><th>Nombre</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{users.map((user) => <tr key={user.id}><td className="fw-semibold">{user.nombre}</td><td>{user.rol}</td><td><span className={`badge ${user.activo ? 'text-bg-success' : 'text-bg-danger'}`}>{user.activo ? 'Activo' : 'Inactivo'}</span></td><td><button className="btn btn-sm btn-outline-secondary" onClick={() => toggle(user.id)}>{user.activo ? 'Desactivar' : 'Activar'}</button></td></tr>)}</tbody></table></div></div></section>
    </div></main></>;
}

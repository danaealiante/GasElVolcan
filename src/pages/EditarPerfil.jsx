import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const initialProfile = { nombre: 'Juan Pérez', correo: 'juan.perez@correo.cl', telefono: '12345678', direccion: 'Av. Brasil 456, Depto 12, Chillán' };

export function EditarPerfil() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialProfile);
  const [error, setError] = useState('');
  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    if (Object.values(form).some((value) => !value.trim())) return setError('Ningún campo puede quedar en blanco.');
    if (form.nombre.trim().length < 3) return setError('El nombre debe tener al menos 3 caracteres.');
    if (!form.correo.includes('@') || !form.correo.includes('.')) return setError('Por favor ingresa un correo electrónico válido.');
    if (!/^[0-9]{8,9}$/.test(form.telefono.trim())) return setError('El teléfono debe contener entre 8 y 9 números.');
    navigate('/perfil');
  };
  return <><PageNav /><main className="container py-5"><section className="card shadow-sm border-0 mx-auto" style={{ maxWidth: 760 }}>
    <div className="card-header bg-primary text-white"><h1 className="h4 mb-0">Editar mis datos</h1></div>
    <form onSubmit={submit} className="card-body d-grid gap-3">
      <div className="row g-3"><Field label="Nombre completo" value={form.nombre} onChange={update('nombre')} /><Field label="Teléfono" value={form.telefono} onChange={update('telefono')} /></div>
      <Field label="Correo electrónico" type="email" value={form.correo} onChange={update('correo')} /><Field label="Dirección de despacho principal" value={form.direccion} onChange={update('direccion')} />
      {error && <div className="alert alert-danger mb-0">{error}</div>}
      <div className="d-flex justify-content-end gap-2 border-top pt-3"><Link to="/perfil" className="btn btn-light">Cancelar</Link><button className="btn btn-warning fw-bold">Guardar cambios</button></div>
    </form>
  </section></main></>;
}

function Field({ label, type = 'text', value, onChange }) {
  return <label className="form-label fw-semibold">{label}<input className="form-control mt-1" type={type} value={value} onChange={onChange} /></label>;
}

function PageNav() {
  return <nav className="navbar bg-white shadow-sm"><div className="container"><Link className="navbar-brand fw-bold text-primary" to="/">🔥 VOLCAN</Link><div className="d-flex gap-3"><Link to="/">Inicio</Link><Link to="/mis-pedidos">Mis pedidos</Link></div></div></nav>;
}

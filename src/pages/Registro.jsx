import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', direccion: '', telefono: '', password: '', confirmacion: '' });
  const [message, setMessage] = useState(null);

  const submit = (event) => {
    event.preventDefault();
    const values = Object.values(form);
    if (values.some((value) => !value.trim())) return setMessage({ type: 'danger', text: 'Completa todos los campos.' });
    if (form.password.length < 6) return setMessage({ type: 'danger', text: 'La contraseña debe tener al menos 6 caracteres.' });
    if (form.password !== form.confirmacion) return setMessage({ type: 'danger', text: 'Las contraseñas no coinciden.' });
    setMessage({ type: 'success', text: 'Registro exitoso. Redirigiendo...' });
    window.setTimeout(() => navigate('/login'), 1000);
  };

  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });
  return <main className="container min-vh-100 d-flex align-items-center justify-content-center py-4">
    <section className="card shadow-sm border-0 p-4 w-100" style={{ maxWidth: 480 }}>
      <div className="text-center mb-4"><div className="fs-1">🔥</div><h1 className="h3 fw-bold text-primary">Crea tu cuenta</h1><p className="text-secondary mb-0">Pide tu gas a domicilio más rápido</p></div>
      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
      <form onSubmit={submit} className="d-grid gap-3">
        <Field label="Nombre completo" value={form.nombre} onChange={update('nombre')} placeholder="Ej. María González" />
        <Field label="Dirección de entrega (Chillán)" value={form.direccion} onChange={update('direccion')} placeholder="Ej. Los Pinos 123" />
        <Field label="Teléfono" type="tel" value={form.telefono} onChange={update('telefono')} placeholder="Ej. +56912345678" />
        <Field label="Contraseña" type="password" value={form.password} onChange={update('password')} placeholder="Mínimo 6 caracteres" />
        <Field label="Confirmar contraseña" type="password" value={form.confirmacion} onChange={update('confirmacion')} placeholder="Repite tu contraseña" />
        <button className="btn btn-primary fw-bold mt-2">Registrarme</button>
      </form>
      <p className="text-center text-secondary mt-4 mb-0">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </section>
  </main>;
}

function Field({ label, type = 'text', value, onChange, placeholder }) {
  return <label className="form-label fw-semibold">{label}<input className="form-control mt-1" type={type} value={value} onChange={onChange} placeholder={placeholder} /></label>;
}

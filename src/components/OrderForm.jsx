import { useState } from 'react';
import { validateOrder } from '../utils/validation';

export function OrderForm({ onSubmit }) {
  const [values, setValues] = useState({ phone: '', cylinder: '' });
  const [errors, setErrors] = useState({});
  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validateOrder(values);
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) { onSubmit(values); setValues({ phone: '', cylinder: '' }); }
  };
  return <form onSubmit={submit} noValidate>
    <h2 className="h3">Pide tu cilindro</h2>
    <p className="text-secondary">Ingresa tus datos para gestionar el despacho a domicilio.</p>
    <label className="form-label" htmlFor="phone">Celular</label>
    <input id="phone" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} value={values.phone} onChange={(e) => setValues({ ...values, phone: e.target.value })} placeholder="987654321" />
    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
    <label className="form-label mt-3" htmlFor="cylinder">Tipo de cilindro</label>
    <select id="cylinder" className={`form-select ${errors.cylinder ? 'is-invalid' : ''}`} value={values.cylinder} onChange={(e) => setValues({ ...values, cylinder: e.target.value })}>
      <option value="">Selecciona el formato...</option><option value="5kg">Cilindro 5 kg</option><option value="11kg">Cilindro 11 kg</option><option value="15kg">Cilindro 15 kg</option>
    </select>
    {errors.cylinder && <div className="invalid-feedback">{errors.cylinder}</div>}
    <button className="btn btn-warning fw-bold w-100 mt-4" type="submit">Continuar</button>
  </form>;
}

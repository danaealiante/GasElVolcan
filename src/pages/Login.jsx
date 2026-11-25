import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { landing } from '../utils/access';
export function Login({ onLogin }) {
  const navigate = useNavigate(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const [busy,setBusy]=useState(false);
  async function submit(e){ e.preventDefault(); if(busy)return; setError(''); setBusy(true); try{const user=await api.login(email,password); onLogin(user); navigate(landing(user.rol),{replace:true});}catch(e){setError(e.message);}finally{setBusy(false);} }
  return <section className="card shadow border-0 mx-auto my-5 overflow-hidden" style={{maxWidth:480}}><div className="bg-primary text-white text-center p-4 border-bottom border-warning border-4"><div className="fs-1">🔥</div><h1 className="h3">Sucursal Virtual</h1><p className="mb-0">Accede con tu cuenta</p></div><form onSubmit={submit} className="p-4 d-grid gap-3">
  <label>Correo electrónico<input required type="email" maxLength={180} autoComplete="username" className="form-control" value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Contraseña<input required type="password" maxLength={72} autoComplete="current-password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)}/></label>{error&&<div role="alert" className="alert alert-danger">{error}</div>}<button disabled={busy} className="btn btn-warning fw-bold">{busy?'Ingresando…':'Ingresar'}</button><Link to="/registro">Crear cuenta de cliente</Link></form></section>;
}

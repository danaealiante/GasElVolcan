import { Link } from 'react-router-dom';
import { canShop, isStaff, canAdmin, landing } from '../utils/access';
export function Navbar({ user, itemCount, onLogout }) {
  const role = user?.rol;
  return <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top"><div className="container">
    <Link className="navbar-brand fw-bold text-primary" to={landing(role)}>🔥 VOLCÁN</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Abrir menú"><span className="navbar-toggler-icon" /></button>
    <div className="collapse navbar-collapse" id="mainNav"><div className="navbar-nav me-auto">
      {canShop(role) && <><Link className="nav-link" to="/">Inicio</Link><Link className="nav-link" to="/productos">Cilindros</Link></>}
      {user && canShop(role) && <><Link className="nav-link" to="/mis-pedidos">Mis pedidos</Link><Link className="nav-link" to="/perfil">Mi perfil</Link></>}
      {isStaff(role) && <><Link className="nav-link" to="/gestion/productos">Gestión productos</Link><Link className="nav-link" to="/gestion/boletas">Órdenes</Link></>}
      {canAdmin(role) && <><Link className="nav-link" to="/gestion/categorias">Categorías</Link><Link className="nav-link" to="/gestion/usuarios">Usuarios</Link></>}
      {!user && <><Link className="nav-link" to="/registro">Registro</Link><Link className="nav-link" to="/login">Ingresar</Link></>}
    </div><div className="d-flex flex-wrap gap-2 align-items-center">
      {canShop(role) && <Link className="btn btn-warning fw-bold" to="/carrito">Carrito ({itemCount})</Link>}
      {user && <><span className="small text-secondary">{user.nombre} · {role}</span><button className="btn btn-outline-primary btn-sm" onClick={onLogout}>Cerrar sesión</button></>}
    </div></div></div></nav>;
}

import { Link } from 'react-router-dom';

export function Navbar({ itemCount }) {
  return <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
    <div className="container">
      <Link className="navbar-brand fw-bold text-primary" to="/">🔥 VOLCAN</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Abrir menu">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="mainNav">
        <div className="navbar-nav me-auto">
          <Link className="nav-link" to="/">Inicio</Link>
          <Link className="nav-link" to="/productos">Cilindros</Link>
          <a className="nav-link" href="/#nosotros">Nosotros</a>
        </div>
        <Link className="btn btn-warning fw-bold" to="/carrito">Carrito ({itemCount})</Link>
      </div>
    </div>
  </nav>;
}

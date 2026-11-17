import { Link } from 'react-router-dom';

const orders = [
  { id: 'VOL-8832', date: '05 Septiembre 2026', status: 'En Camino', product: 'Cilindro 15 kg', quantity: 1, address: 'Av. Brasil 456, Depto 12, Chillán', total: '$23.500' },
  { id: 'VOL-7105', date: '20 Agosto 2026', status: 'Entregado', product: 'Cilindro 11 kg', quantity: 2, address: 'Av. Brasil 456, Depto 12, Chillán', total: '$35.000' },
  { id: 'VOL-5422', date: '15 Julio 2026', status: 'Entregado', product: 'Cilindro 15 kg', quantity: 1, address: 'Av. Brasil 456, Depto 12, Chillán', total: '$23.500' }
];

export function MisPedidos() {
  return <><SimpleNav /><main className="container py-5"><div className="d-flex justify-content-between align-items-end mb-4"><div><h1 className="h2 fw-bold text-primary">Mis pedidos</h1><p className="text-secondary mb-0">Revisa el historial y estado de tus compras.</p></div><Link to="/productos" className="btn btn-warning fw-bold">Nuevo pedido</Link></div>
    <div className="d-grid gap-3">{orders.map((order) => <article className="card shadow-sm border-0" key={order.id}><div className="card-body d-flex justify-content-between gap-3 flex-wrap"><div><div className="d-flex align-items-center gap-2 mb-2"><strong className="text-primary">#{order.id}</strong><span className={`badge ${order.status === 'En Camino' ? 'text-bg-warning' : 'text-bg-success'}`}>{order.status}</span></div><p className="small text-secondary mb-1">📅 {order.date}</p><p className="small mb-0">📍 {order.address}</p></div><div className="bg-light rounded p-3 text-end"><div className="small text-secondary">{order.quantity}x {order.product}</div><strong className="fs-5 text-primary">{order.total}</strong></div></div></article>)}</div>
  </main></>;
}

function SimpleNav() {
  return <nav className="navbar bg-white shadow-sm"><div className="container"><Link className="navbar-brand fw-bold text-primary" to="/">🔥 VOLCAN</Link><div className="d-flex gap-3"><Link to="/">Inicio</Link><Link to="/editar-perfil">Mi perfil</Link></div></div></nav>;
}

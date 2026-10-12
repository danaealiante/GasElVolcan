import { formatCurrency } from '../data/products';
import { cartTotal } from '../utils/cart';

export function Cart({ items, onRemove, onClear }) {
  if (!items.length) return <div className="alert alert-info">Tu carrito esta vacio.</div>;
  return <section aria-label="Carrito de compras">
    {items.map((item) => <div className="d-flex align-items-center justify-content-between border-bottom py-3" key={item.id}>
      <div><strong>{item.name}</strong><div className="text-secondary">{item.quantity} x {formatCurrency(item.price)}</div></div>
      <button className="btn btn-outline-danger btn-sm" onClick={() => onRemove(item.id)}>Quitar</button>
    </div>)}
    <div className="d-flex justify-content-between fs-4 fw-bold mt-4"><span>Total</span><span>{formatCurrency(cartTotal(items))}</span></div>
    <button className="btn btn-outline-secondary mt-3" onClick={onClear}>Vaciar carrito</button>
  </section>;
}

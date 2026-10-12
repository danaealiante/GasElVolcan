import { formatCurrency } from '../data/products';

export function ProductCard({ product, onAdd }) {
  return <article className={`card h-100 shadow-sm ${product.featured ? 'border-warning border-2' : ''}`}>
    <div className="card-body d-flex flex-column text-center">
      {product.featured && <span className="badge text-bg-warning align-self-center mb-2">Mas vendido</span>}
      <div className="display-4 mb-2" aria-hidden="true">🛢️</div>
      <h3 className="h5 text-primary">{product.name}</h3>
      <p className="text-secondary flex-grow-1">{product.description}</p>
      <strong className="fs-4 mb-3">{formatCurrency(product.price)}</strong>
      <button className="btn btn-primary" onClick={() => onAdd(product)}>Agregar al carrito</button>
    </div>
  </article>;
}

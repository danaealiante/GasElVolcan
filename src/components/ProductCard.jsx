import { formatCurrency } from '../data/products';
export function ProductCard({ product, onAdd }) {
 return <article className="card h-100 shadow-sm"><div className="card-body d-flex flex-column text-center"><div className="display-4 mb-2" aria-hidden="true">🛢️</div><h3 className="h5 text-primary">{product.name}</h3><p className="text-secondary flex-grow-1">{product.description}</p><strong className="fs-4 mb-2">{formatCurrency(product.price)}</strong>{product.stock!==undefined&&<p className="small">Stock: {product.stock}</p>}<button className="btn btn-primary" disabled={product.stock===0} onClick={()=>onAdd(product)}>Agregar al carrito</button></div></article>;
}

import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { OrderForm } from './components/OrderForm';
import { products } from './data/products';
import { addToCart, removeFromCart } from './utils/cart';

function Products({ onAdd }) { return <><h1 className="h2 mb-4">Nuestros formatos de gas licuado</h1><div className="row g-4">{products.map((product) => <div className="col-12 col-md-6 col-lg-4" key={product.id}><ProductCard product={product} onAdd={onAdd} /></div>)}</div></>; }
function Home({ onAdd }) { const navigate = useNavigate(); return <><div className="row align-items-center g-4 py-5"><div className="col-lg-6"><span className="badge text-bg-warning mb-3">Servicio local Chillan</span><h1 className="display-5 fw-bold text-primary">Distribucion rapida directamente a tu hogar</h1><p className="lead">Gas licuado seguro y confiable en Chillan y comunas aledanas.</p><Link className="btn btn-primary btn-lg" to="/productos">Ver cilindros</Link></div><div className="col-lg-6"><div className="card p-4 shadow"><OrderForm onSubmit={() => navigate('/productos')} /></div></div></div><section id="nosotros" className="py-4"><h2>Sobre Gas El Volcan</h2><p>Desde 1998 servimos a la comunidad de Chillan garantizando entregas puntuales.</p></section><h2 className="h3 mt-4">Compra rapido</h2><div className="row g-4 mt-1">{products.map((product) => <div className="col-12 col-md-6 col-lg-4" key={product.id}><ProductCard product={product} onAdd={onAdd} /></div>)}</div></>; }
export default function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('gas-cart') || '[]'));
  useEffect(() => { localStorage.setItem('gas-cart', JSON.stringify(cart)); }, [cart]);
  const add = (product) => setCart((current) => addToCart(current, product));
  return <><Navbar itemCount={cart.reduce((sum, item) => sum + item.quantity, 0)} /><main className="container py-4"><Routes><Route path="/" element={<Home onAdd={add} />} /><Route path="/productos" element={<Products onAdd={add} />} /><Route path="/carrito" element={<><h1 className="h2 mb-4">Tu carrito</h1><Cart items={cart} onRemove={(id) => setCart((current) => removeFromCart(current, id))} onClear={() => setCart([])} /></>} /><Route path="*" element={<div className="alert alert-warning">Pagina no encontrada</div>} /></Routes></main><footer className="bg-primary text-white text-center py-4 mt-5">Gas El Volcan - Chillan</footer></>;
}

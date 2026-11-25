import {useEffect,useState,useCallback} from 'react';
import {Routes,Route,Link,useNavigate,Navigate} from 'react-router-dom';
import {Navbar} from './components/Navbar';
import {ProductCard} from './components/ProductCard';
import {Cart} from './components/Cart';
import {OrderForm} from './components/OrderForm';
import {addToCart,removeFromCart} from './utils/cart';
import {canShop,isStaff,canAdmin,landing} from './utils/access';
import {api} from './services/api';
import {Login} from './pages/Login';
import {Registro} from './pages/Registro';
import {EditarPerfil} from './pages/EditarPerfil';
import {MisPedidos} from './pages/MisPedidos';
import {Gestion} from './pages/Gestion';
function ProductGrid({products,onAdd}){return products.length?<div className="row g-4">{products.map(p=><div className="col-12 col-md-6 col-lg-4" key={p.id}><ProductCard product={p} onAdd={onAdd}/></div>)}</div>:<p>No hay productos disponibles.</p>;}
function Guard({user,allow,children}){return !user?<Navigate to="/login" replace/>:allow?children:<Navigate to={landing(user.rol)} replace/>;}
export default function App(){const [user,setUser]=useState(null);const [cart,setCart]=useState([]);const [phone,setPhone]=useState('');const [products,setProducts]=useState([]);const [status,setStatus]=useState('Conectando…');const [error,setError]=useState('');const [notice,setNotice]=useState('');const navigate=useNavigate();const role=user?.rol;
 const refresh=useCallback(async()=>{setStatus('Conectando…');setError('');try{const rows=await api.products();setProducts(rows.map(p=>({id:p.id,name:p.nombre,description:p.descripcion,price:p.precio,stock:p.stock})));setStatus('API conectada');}catch(e){setProducts([]);setStatus('API no disponible');setError(e.message);}},[]);
 useEffect(()=>{refresh();},[refresh]);useEffect(()=>api.onUnauthorized(()=>{setUser(null);setNotice('Tu sesión terminó. Inicia sesión nuevamente.');navigate('/login',{replace:true});}),[navigate]);
 function logout(){api.logout();setUser(null);setCart([]);setPhone('');setNotice('');navigate('/login',{replace:true});}
 function login(u){setUser(u);setNotice('');if(!canShop(u.rol)){setCart([]);setPhone('');}}
 function add(p){const current=cart.find(x=>x.id===p.id)?.quantity||0;if(current>=p.stock||current>=100){setNotice('No hay más unidades disponibles para este pedido.');return;}setNotice('Producto agregado al carrito.');setCart(c=>addToCart(c,p));}
 const shop=canShop(role);const staff=isStaff(role);const admin=canAdmin(role);
 const catalog=<><div className="d-flex justify-content-between align-items-center"><h1 className="h2 mb-4">Nuestros formatos de gas licuado</h1><button className="btn btn-outline-primary btn-sm" onClick={refresh}>Actualizar</button></div><ProductGrid products={products} onAdd={add}/></>;
 return <><Navbar user={user} itemCount={cart.reduce((n,x)=>n+x.quantity,0)} onLogout={logout}/><main className="container py-4 min-vh-100"><div className="small text-end text-secondary mb-2">{status}</div>{error&&<div role="alert" className="alert alert-danger">{error} <button onClick={refresh} className="btn btn-sm btn-outline-danger">Reintentar</button></div>}{notice&&<div role="status" className="alert alert-info d-flex justify-content-between">{notice}<button className="btn-close" aria-label="Cerrar aviso" onClick={()=>setNotice('')}/></div>}
 <Routes><Route path="/" element={shop?<><div className="row align-items-center g-4 py-5"><div className="col-lg-6"><span className="badge text-bg-warning mb-3">Servicio local Chillán</span><h1 className="display-5 fw-bold text-primary">Distribución rápida directamente a tu hogar</h1><p className="lead">Gas licuado seguro y confiable en Chillán y comunas aledañas.</p><Link className="btn btn-primary btn-lg" to="/productos">Ver cilindros</Link></div><div className="col-lg-6"><div className="card p-4 shadow"><OrderForm products={products} onSubmit={v=>{const p=products.find(x=>String(x.id)===v.cylinder);if(p){add(p);setPhone(v.phone);navigate('/carrito');}}}/></div></div></div><h2 className="h3">Compra rápido</h2><ProductGrid products={products} onAdd={add}/></>:<Navigate to={landing(role)} replace/>}/>
 <Route path="/productos" element={shop?catalog:<Navigate to={landing(role)} replace/>}/><Route path="/carrito" element={shop?<><h1 className="h2">Tu carrito</h1><Cart items={cart} onRemove={id=>setCart(c=>removeFromCart(c,id))} onClear={()=>setCart([])} user={user} phone={phone} onOrdered={refresh}/></>:<Navigate to={landing(role)} replace/>}/>
 <Route path="/login" element={user?<Navigate to={landing(role)} replace/>:<Login onLogin={login}/>}/><Route path="/registro" element={user?<Navigate to={landing(role)} replace/>:<Registro/>}/><Route path="/admin/login" element={<Navigate to="/login" replace/>}/>
 <Route path="/mis-pedidos" element={<Guard user={user} allow={shop}><MisPedidos/></Guard>}/><Route path="/perfil" element={<Guard user={user} allow={shop}><EditarPerfil/></Guard>}/><Route path="/editar-perfil" element={<Navigate to="/perfil" replace/>}/><Route path="/admin/usuarios" element={<Navigate to="/gestion/usuarios" replace/>}/>
 {['productos','boletas','categorias','usuarios'].map(k=><Route key={k} path={'/gestion/'+k} element={<Guard user={user} allow={['productos','boletas'].includes(k)?staff:admin}><Gestion key={k} kind={k} admin={admin} currentUser={user} onChange={refresh} onLogout={logout}/></Guard>}/>)}<Route path="*" element={<Navigate to={landing(role)} replace/>}/></Routes></main><footer className="bg-primary text-white text-center py-4">Gas El Volcán — Chillán</footer></>;
}

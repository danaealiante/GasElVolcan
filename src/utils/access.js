export const isStaff = role => ['ADMINISTRADOR','VENDEDOR'].includes(role);
export const canShop = role => !role || role === 'CLIENTE' || role === 'ADMINISTRADOR';
export const canAdmin = role => role === 'ADMINISTRADOR';
export const landing = role => isStaff(role) ? '/gestion/productos' : '/';
export function orderPayload(cart,direccion,telefono) {
  return { direccion: direccion.trim(), telefono: telefono.trim(), items: cart.map(x=>({productoId:Number(x.id),cantidad:x.quantity})) };
}

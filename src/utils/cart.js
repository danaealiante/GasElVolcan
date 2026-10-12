export function addToCart(cart, product) {
  const current = cart.find((item) => item.id === product.id);
  if (current) return cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
  return [...cart, { ...product, quantity: 1 }];
}

export function removeFromCart(cart, productId) {
  return cart.flatMap((item) => item.id !== productId ? [item] : item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []);
}

export function cartTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

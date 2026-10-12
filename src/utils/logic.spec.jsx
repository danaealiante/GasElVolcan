import { addToCart, removeFromCart, cartTotal } from './cart';
import { validateOrder } from './validation';

const product = { id: '11kg', name: 'Cilindro 11 kg', price: 18200 };

describe('logica del carrito y validaciones', () => {
  it('agrega un producto nuevo', () => expect(addToCart([], product)).toEqual([{ ...product, quantity: 1 }]));
  it('incrementa la cantidad de un producto repetido', () => expect(addToCart([{ ...product, quantity: 1 }], product)[0].quantity).toBe(2));
  it('quita una unidad', () => expect(removeFromCart([{ ...product, quantity: 2 }], product.id)[0].quantity).toBe(1));
  it('elimina la ultima unidad', () => expect(removeFromCart([{ ...product, quantity: 1 }], product.id)).toEqual([]));
  it('calcula el total', () => expect(cartTotal([{ ...product, quantity: 2 }])).toBe(36400));
  it('rechaza un formulario vacio', () => expect(Object.keys(validateOrder({ phone: '', cylinder: '' }))).toEqual(['phone', 'cylinder']));
  it('rechaza un celular invalido', () => expect(validateOrder({ phone: '123', cylinder: '11kg' }).phone).toBeDefined());
  it('acepta un pedido valido', () => expect(validateOrder({ phone: '987654321', cylinder: '11kg' })).toEqual({}));
});

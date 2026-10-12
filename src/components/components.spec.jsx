import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { OrderForm } from './OrderForm';

const product = { id: '5kg', name: 'Cilindro 5 kg', description: 'Test', price: 10500 };

describe('componentes React', () => {
  it('renderiza una tarjeta y ejecuta agregar', () => {
    const onAdd = jasmine.createSpy('onAdd');
    render(<ProductCard product={product} onAdd={onAdd} />);
    expect(screen.getByText('Cilindro 5 kg')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));
    expect(onAdd).toHaveBeenCalledWith(product);
  });
  it('muestra errores de validacion del formulario', () => {
    render(<OrderForm onSubmit={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(screen.getByText(/numero de celular/i)).toBeTruthy();
    expect(screen.getByText(/formato de cilindro/i)).toBeTruthy();
  });
});

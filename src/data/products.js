export const products = [
  { id: '5kg', name: 'Cilindro 5 kg', description: 'Ideal para estufas pequenas, cocinillas y camping.', price: 10500 },
  { id: '11kg', name: 'Cilindro 11 kg', description: 'El formato preferido para el consumo residencial cotidiano.', price: 18200, featured: true },
  { id: '15kg', name: 'Cilindro 15 kg', description: 'Rendimiento extendido para calefaccion y hogar numeroso.', price: 24900 }
];

export const formatCurrency = (value) => `$${value.toLocaleString('es-CL')}`;

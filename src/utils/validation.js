export function validateOrder({ phone, cylinder }) {
  const errors = {};
  const normalizedPhone = phone.trim();
  if (!normalizedPhone) errors.phone = 'Por favor ingrese su numero de celular para continuar.';
  else if (!/^[0-9]{8,9}$/.test(normalizedPhone)) errors.phone = 'Ingresa un numero valido de 8 a 9 digitos.';
  if (!cylinder) errors.cylinder = 'Debes seleccionar un formato de cilindro.';
  return errors;
}

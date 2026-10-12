# Gas El Volcan - React

## Cumplimiento de la rubrica

| Requisito | Antes de este cambio | Estado actual | Evidencia |
| --- | --- | --- | --- |
| Proyecto creado con Vite/React | No cumplia: HTML/JS sueltos | Cumple | `index.html`, `src/main.jsx`, `vite` en `package.json` |
| Componentes reutilizables | No tenia `components/` | Cumple | `src/components/Navbar.jsx`, `ProductCard.jsx`, `Cart.jsx`, `OrderForm.jsx` |
| Navegacion React Router | No tenia Router | Cumple | Rutas `/`, `/productos` y `/carrito` en `src/App.jsx` |
| Carrito migrado a estado React | No tenia carrito React | Cumple | `useState`, `useEffect`, `src/utils/cart.js` y persistencia en `localStorage` |
| Props, estados y Bootstrap responsivo | Usaba Tailwind y JS imperativo | Cumple | Props, hooks, grid `col-12 col-md-6 col-lg-4` y navbar colapsable |
| Formularios con validacion React | Validacion imperativa en `assets/js/main.js` | Cumple | `OrderForm.jsx` y `src/utils/validation.js` |
| 10 pruebas Jasmine/Karma | No tenia pruebas configuradas | Cumple | 8 pruebas de logica y 2 de componentes en `src/**/*.spec.jsx` |
| Mocks/espias | No tenia spies | Cumple | `jasmine.createSpy` en la prueba de `ProductCard` |
| Reporte de cobertura | No tenia cobertura | Cumple | `karma-coverage`, `npm run test:coverage`, carpeta `coverage/` |

## Comandos

```bash
npm install
npm run dev
npm test
npm run test:coverage
npm run build
```

Karma usa `ChromeHeadless`; si Chrome no esta en el PATH, configura `CHROME_BIN` antes de ejecutar las pruebas.
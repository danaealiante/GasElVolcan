// El catálogo procede exclusivamente del backend. No se simulan productos.
export const formatCurrency = value => Number(value).toLocaleString('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0});

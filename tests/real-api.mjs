// Ejecutar solo contra una base de datos desechable de CI o de demostración.
import assert from 'node:assert/strict';
import {createApi} from '../src/services/api.js';
const base=process.env.TEST_API_URL||'http://localhost:8080';
if(process.env.ALLOW_DESTRUCTIVE_TESTS!=='yes')throw new Error('Usar exclusivamente una base de pruebas: ALLOW_DESTRUCTIVE_TESTS=yes');
const admin=createApi(base),seller=createApi(base),client=createApi(base),other=createApi(base);
const id=Date.now(),password='PruebaV2Temporal!';
assert.equal((await admin.login(process.env.TEST_ADMIN_EMAIL,process.env.TEST_ADMIN_PASSWORD)).rol,'ADMINISTRADOR');
const cat=await admin.save('categorias',{nombre:`CI ${id}`,descripcion:'Prueba'});
const product=await admin.save('productos',{nombre:`Cilindro CI ${id}`,descripcion:'Prueba',precio:23500,stock:8,categoriaId:cat.id,activo:true});
const v=await admin.save('usuarios',{nombre:'Vendedor CI',email:`v${id}@test.local`,password,telefono:null,rol:'VENDEDOR',activo:true});
assert.equal((await seller.login(v.email,password)).rol,'VENDEDOR');assert.ok((await seller.list('productos')).some(x=>x.id===product.id));await assert.rejects(seller.list('usuarios'),{status:403});await assert.rejects(seller.remove('productos',product.id),{status:403});
for(const [a,pre] of [[client,'c'],[other,'o']]){const email=`${pre}${id}@test.local`;await a.register({nombre:'Cliente CI',email,password,telefono:'912345678'});assert.equal((await a.login(email,password)).rol,'CLIENTE');}
assert.ok((await client.products()).some(x=>x.id===product.id));await assert.rejects(client.list('boletas'),{status:403});const b=await client.order({direccion:'Calle CI 123',telefono:'912345678',items:[{productoId:product.id,cantidad:2}]});assert.equal(b.total,47000);assert.equal((await seller.detail('boletas',b.id)).id,b.id);assert.equal((await client.myOrder(b.id)).id,b.id);await assert.rejects(other.myOrder(b.id),{status:404});assert.equal((await admin.detail('productos',product.id)).stock,6);await admin.status(b.id,'CANCELADA');assert.equal((await admin.detail('productos',product.id)).stock,8);await admin.remove('boletas',b.id);await admin.remove('productos',product.id);await admin.remove('categorias',cat.id);await admin.remove('usuarios',v.id);assert.ok((await fetch(base+'/v3/api-docs')).ok);console.log('Integración REST real: roles, pedidos, stock, persistencia y Swagger comprobados.');

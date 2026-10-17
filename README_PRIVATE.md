# Norte Tech: web con catálogo, carrito y Mercado Pago

## Qué contiene la carpeta

```
norte-tech/
├── index.html               La web completa (diseño, catálogo, carrito)
├── api/
│   └── create-preference.js Función del servidor que crea el pago
└── README.md                Esta guía
```

## 1. Personalizar tus datos

Abrí `index.html` y buscá estos bloques dentro de `<script>`:

- `CFG.tel`: los tres teléfonos de WhatsApp, con código de país y sin signos. Ejemplo: `5493874000000`.
- `CFG.social`: nombre, usuario y enlace de cada red social.
- `LOC`: direcciones y horarios de los locales.
- `P`: el catálogo de productos (nombre, categoría, descripción y precio).

Si cambiás un precio o agregás un producto en `P`, hacé el mismo cambio en la lista `CATALOG` de `api/create-preference.js`. Tienen que estar en el mismo orden. El servidor usa esa lista para cobrar, así nadie puede alterar los precios desde el navegador.

## 2. Activar Mercado Pago

1. Entrá a Mercado Pago Developers (mercadopago.com.ar/developers) y creá una aplicación de tipo **Checkout Pro**.
2. En la sección de credenciales, copiá el **Access Token**. Primero usá el de prueba. Cuando todo funcione, cambialo por el de producción.
3. Subí esta carpeta a Vercel (vercel.com). Podés arrastrarla desde el panel o conectarla con un repositorio de GitHub.
4. En Vercel, en Settings, Environment Variables, cargá:
   - `MP_ACCESS_TOKEN`: el Access Token que copiaste.
   - `SITE_URL`: la dirección de tu web, sin barra final. Ejemplo: `https://nortetech.vercel.app`.
5. Volvé a desplegar el proyecto para que tome las variables.
6. Hacé una compra de prueba. Al terminar, Mercado Pago te devuelve a la web y se muestra el aviso de pago.

El Access Token nunca va dentro de `index.html`: cualquiera que abra la web podría verlo.

## 3. Opción sin servidor (solo link de pago)

Si publicás la web en un hosting común, que no ejecuta funciones, el botón de pago no puede crear el cobro por sí solo. En ese caso:

1. Creá un **Link de pago** desde tu cuenta de Mercado Pago.
2. En `index.html`, dejá `endpoint:""` y poné tu enlace en `link:"https://..."`.
3. El botón abre ese link y avisa el total del carrito. El cliente tiene que ingresar el monto a mano, porque un link fijo no recibe el total del carrito.

## 4. Probar en tu computadora

Con Node instalado, ejecutá `npx vercel dev` dentro de la carpeta. Para que funcione el pago, creá un archivo `.env` con `MP_ACCESS_TOKEN` y `SITE_URL=http://localhost:3000`.

## Notas

- Los pedidos por WhatsApp funcionan sin configurar Mercado Pago.
- El carrito se guarda en el navegador de cada cliente.
- Antes de salir a producción, verificá que los precios, los teléfonos y las direcciones sean los reales.
# web-tienda

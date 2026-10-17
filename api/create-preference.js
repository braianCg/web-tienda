// Función serverless para Vercel: crea el pago en Mercado Pago (Checkout Pro).
// El token vive solo en el servidor (variable de entorno). Nunca lo pongas en index.html.
//
// Variables de entorno necesarias:
//   MP_ACCESS_TOKEN  -> Access Token de tu aplicación en Mercado Pago
//   SITE_URL         -> dirección pública de tu web, sin barra final (https://tu-dominio.com)

// IMPORTANTE: los precios se validan acá, no en el navegador, para que nadie pueda
// cambiarlos. Esta lista debe tener el mismo orden y los mismos valores que el
// array P de index.html. Si cambiás un precio en un lado, cambialo en el otro.
const CATALOG = [
  ["Smartwatch S1", 38900],
  ["Smartwatch Sport", 46500],
  ["Pulsera Fit", 19900],
  ["Auricular TWS Air", 24900],
  ["Auricular Sport", 15800],
  ["Auricular con cable", 5900],
  ["TV Box 4K", 42000],
  ["TV Box Lite", 28500],
  ["Parlante Mini", 12900],
  ["Parlante Torre", 39900],
  ["Tira LED 5 m", 9800],
  ["Foco inteligente", 7500],
  ["Cable USB-C 2 m", 4500],
  ["Cargador 65 W", 18700],
  ["Dispenser de jabón", 11200],
  ["Proyector LED Home", 89900],
];

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const token = process.env.MP_ACCESS_TOKEN;
  const site = (process.env.SITE_URL || "").replace(/\/$/, "");
  if (!token || !site) {
    return res.status(500).json({ error: "Faltan MP_ACCESS_TOKEN o SITE_URL en el servidor" });
  }

  const body = req.body || {};
  const items = (Array.isArray(body.items) ? body.items : [])
    .slice(0, 50)
    .map((i) => {
      const product = CATALOG[Number(i.id)];
      const quantity = Math.floor(Number(i.quantity));
      if (!product || !(quantity >= 1) || quantity > 99) return null;
      return {
        title: product[0],
        quantity,
        unit_price: product[1],
        currency_id: "ARS",
      };
    })
    .filter(Boolean);

  if (!items.length) {
    return res.status(400).json({ error: "El pedido está vacío o tiene productos inválidos" });
  }

  try {
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
        back_urls: {
          success: site + "/?pago=ok",
          pending: site + "/?pago=pendiente",
          failure: site + "/?pago=error",
        },
        auto_return: "approved",
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.init_point) {
      return res.status(502).json({ error: "Mercado Pago rechazó la solicitud" });
    }
    return res.status(200).json({ url: data.init_point });
  } catch (err) {
    return res.status(502).json({ error: "No se pudo contactar a Mercado Pago" });
  }
};

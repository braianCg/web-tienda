export const CFG = {
  mp: { endpoint: "/api/create-preference", link: "" },
  tel: ["5493872205367", "5493872205367", "5493872205367"],
  social: [
    ["Instagram", "@nortetech", "https://www.instagram.com/"],
    ["TikTok", "@nortetech", "https://www.tiktok.com/"],
    ["Facebook", "/nortetech", "https://www.facebook.com/"],
  ],
};

export const LOC = [
  [
    "Local peatonal",
    "Calle Ejemplo 100",
    "Centro, Salta capital",
    [
      ["Lun a vie", "9 a 14 y 17 a 21:30"],
      ["Sábados", "9 a 21"],
    ],
  ],
  [
    "Local central",
    "Calle Ejemplo 400",
    "Centro, Salta capital",
    [
      ["Lun a sáb", "9 a 21"],
      ["Domingos", "10 a 14"],
    ],
  ],
  [
    "Posventa",
    "Calle Ejemplo 700",
    "Cambios y garantías",
    [["Lun a sáb", "9 a 21"]],
  ],
];

export const CATS = [
  ["Smartwatch", "⌚", "Notificaciones, GPS y salud", "Más vendido"],
  ["Auriculares", "🎧", "Bluetooth y con cable"],
  ["TV Box", "📺", "Convierte tu TV en Smart TV", "Popular"],
  ["Parlantes", "🔊", "Portátiles y recargables"],
  ["Luces LED", "💡", "Tiras, focos y lámparas"],
  ["Cables", "🔌", "HDMI, USB-C y cargadores"],
  ["Hogar", "🏠", "Artículos para equipar la casa"],
  ["Proyectores", "📽️", "Cine en casa con LED"],
];

const RAW_P = [
  ["Smartwatch S1", "Smartwatch", "Pantalla AMOLED, llamadas Bluetooth y siete días de batería.", 38900],
  ["Smartwatch Sport", "Smartwatch", "Resistente al agua, GPS y modos de entrenamiento.", 46500],
  ["Pulsera Fit", "Smartwatch", "Pulsera liviana con pulsómetro y control de sueño.", 19900],
  ["Auricular TWS Air", "Auriculares", "Inalámbricos con estuche de carga y cancelación de ruido.", 24900],
  ["Auricular Sport", "Auriculares", "Con gancho, resistentes al sudor y micrófono.", 15800],
  ["Auricular con cable", "Auriculares", "Plug 3,5 mm y control de volumen.", 5900],
  ["TV Box 4K", "TV Box", "Android, 4 GB de RAM, Wi-Fi y control remoto.", 42000],
  ["TV Box Lite", "TV Box", "Full HD, ideal para streaming diario.", 28500],
  ["Parlante Mini", "Parlantes", "Bluetooth, 10 horas de batería y llavero.", 12900],
  ["Parlante Torre", "Parlantes", "Sonido potente con luces y entrada USB.", 39900],
  ["Tira LED 5 m", "Luces LED", "Colores RGB con control remoto y adhesivo.", 9800],
  ["Foco inteligente", "Luces LED", "Cambia de color desde el celular.", 7500],
  ["Cable USB-C 2 m", "Cables", "Carga rápida y datos, trenzado reforzado.", 4500],
  ["Cargador 65 W", "Cables", "Carga celular, tablet y notebook.", 18700],
  ["Dispenser de jabón", "Hogar", "Automático con sensor y batería recargable.", 11200],
  ["Proyector LED Home", "Proyectores", "Full HD, 200 pulgadas y entrada HDMI.", 89900],
];

export const P = RAW_P.map((p, i) => ({
  id: i,
  name: p[0],
  cat: p[1],
  d: p[2],
  price: p[3],
  ico: (CATS.find((c) => c[0] === p[1]) || [])[1],
}));

export const money = (n) => "$" + n.toLocaleString("es-AR");

export const wa = (t, m) =>
  "https://wa.me/" + t + "?text=" + encodeURIComponent(m);

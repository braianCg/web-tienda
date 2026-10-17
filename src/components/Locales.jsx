import React, { useState } from 'react';
import { LOC, CFG, wa } from '../data/catalog';

export default function Locales({ showToast }) {
  const [showWholesaleModal, setShowWholesaleModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    phone: '',
    category: 'Smartwatch',
  });

  const handleWholesaleSubmit = (e) => {
    e.preventDefault();
    const message = `Hola, soy ${formData.name} de ${formData.business}. Quiero la lista mayorista de: ${formData.category}. Mi teléfono es ${formData.phone}.`;
    window.open(wa(CFG.tel[1], message), '_blank', 'noopener,noreferrer');
    setShowWholesaleModal(false);
    setFormData({ name: '', business: '', phone: '', category: 'Smartwatch' });
    showToast('Listo, te abrimos WhatsApp');
  };

  return (
    <section id="locales">
      <div className="wrap">
        <h2>Visitanos en Salta</h2>
        <p className="lead">
          Tres locales en la ciudad. Elegí el que te quede más cómodo.
        </p>
        <div className="locals" id="locals">
          {LOC.map((l, i) => (
            <article key={i} className="local">
              <span className="kind">{l[0]}</span>
              <h3>{l[1]}</h3>
              <address>{l[2]}</address>
              <dl>
                {l[3].map((h, j) => (
                  <React.Fragment key={j}>
                    <dt>{h[0]}</dt>
                    <dd>{h[1]}</dd>
                  </React.Fragment>
                ))}
              </dl>
              <div className="acts">
                <a
                  className="btn sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    l[1] + ', Salta, Argentina'
                  )}`}
                >
                  Ver en el mapa
                </a>
                <a
                  className="btn primary sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={wa(
                    CFG.tel[i],
                    `Hola, quiero consultar por el ${l[0].toLowerCase()}.`
                  )}
                >
                  WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="band warm">
          <div>
            <h3>Compras por mayor</h3>
            <p>
              Dejanos tus datos y te enviamos la lista con precios para
              revendedores.
            </p>
          </div>
          <button
            className="btn"
            id="wsBtn"
            onClick={() => setShowWholesaleModal(true)}
          >
            Pedir lista mayorista
          </button>
        </div>
      </div>

      {showWholesaleModal && (
        <dialog
          id="wsDlg"
          open
          style={{ display: 'block', position: 'fixed', zIndex: 100 }}
          onClick={(e) => {
            if (e.target.id === 'wsDlg') setShowWholesaleModal(false);
          }}
        >
          <h3>Lista para revendedores</h3>
          <form id="wsForm" onSubmit={handleWholesaleSubmit}>
            <label>
              Nombre
              <input
                name="n"
                required
                autoComplete="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </label>
            <label>
              Negocio
              <input
                name="b"
                required
                value={formData.business}
                onChange={(e) =>
                  setFormData({ ...formData, business: e.target.value })
                }
              />
            </label>
            <label>
              Teléfono
              <input
                name="t"
                type="tel"
                required
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </label>
            <label>
              Rubro que te interesa
              <select
                name="r"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option>Smartwatch</option>
                <option>Auriculares</option>
                <option>TV Box</option>
                <option>Parlantes</option>
                <option>Luces LED</option>
                <option>Varios</option>
              </select>
            </label>
            <div className="acts">
              <button className="btn primary" type="submit">
                Enviar por WhatsApp
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => setShowWholesaleModal(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </dialog>
      )}
    </section>
  );
}

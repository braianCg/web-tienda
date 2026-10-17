import React from 'react';
import { CFG, wa } from '../data/catalog';

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <h1>
            Tecnología <em>a buen precio</em>
          </h1>
          <p className="lead">
            Importamos electrónica y artículos para el hogar y los vendemos en
            nuestros locales. También enviamos a cualquier provincia.
          </p>
          <div className="cta">
            <a className="btn primary" href="#productos">
              Ver productos
            </a>
            <a
              className="btn"
              href={wa(
                CFG.tel[1],
                'Hola, quiero hacer una consulta sobre sus productos.'
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
        <div className="stats">
          <div className="stat">
            <b>20+</b>
            <span>años en el rubro</span>
          </div>
          <div className="stat">
            <b>3</b>
            <span>locales para visitar</span>
          </div>
          <div className="stat">
            <b>100%</b>
            <span>productos con garantía</span>
          </div>
        </div>
      </div>
    </section>
  );
}

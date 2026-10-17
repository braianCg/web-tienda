import React from 'react';
import { CFG, wa } from '../data/catalog';

export default function AboutUs() {
  return (
    <section className="why" id="nosotros">
      <div className="wrap">
        <h2>Dos décadas vendiendo tecnología</h2>
        <p className="lead">
          Somos una distribuidora con trayectoria. Tocá cada punto para ver el
          detalle.
        </p>
        <div className="why-grid">
          <details>
            <summary>Experiencia</summary>
            <p>
              Más de veinte años en electrónica importada nos permiten
              recomendarte lo que realmente te sirve.
            </p>
          </details>
          <details>
            <summary>Garantía</summary>
            <p>
              Cada producto tiene respaldo y un local dedicado a cambios y
              reclamos.
            </p>
          </details>
          <details>
            <summary>Envíos</summary>
            <p>
              Despachamos a todas las provincias, con seguimiento y embalaje
              seguro.
            </p>
          </details>
          <details>
            <summary>Atención personal</summary>
            <p>
              Te contesta una persona, no un bot. Consultá por WhatsApp o pasá
              por el local.
            </p>
          </details>
        </div>
        <div className="band">
          <div>
            <h3>¿Problemas con tu producto?</h3>
            <p>
              Escribinos con tu comprobante y te ayudamos a gestionar el cambio o
              la garantía.
            </p>
          </div>
          <a
            className="btn primary"
            href={wa(
              CFG.tel[2],
              'Hola, necesito soporte o gestionar una garantía. Mi comprobante de compra es:'
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar con soporte
          </a>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { CFG, LOC, wa } from '../data/catalog';

export function Socials() {
  return (
    <section id="redes" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <h2>Seguinos</h2>
        <p className="lead">Subimos ofertas y novedades todos los días.</p>
        <div className="socials" id="socials">
          {CFG.social.map((s, i) => (
            <a
              key={i}
              className="card-link"
              target="_blank"
              rel="noopener noreferrer"
              href={s[2]}
            >
              <b>{s[0]}</b>
              <span>{s[1]} · Ver perfil</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="contact" id="contacto">
      <div className="wrap">
        <h2>Contacto</h2>
        <p className="lead">
          Escribinos por WhatsApp o pasá por cualquiera de los locales.
        </p>
        <div className="cgrid" id="contacts">
          {LOC.map((l, i) => (
            <a
              key={i}
              className="card-link"
              target="_blank"
              rel="noopener noreferrer"
              href={wa(
                CFG.tel[i],
                `Hola, quiero consultar por el ${l[0].toLowerCase()}.`
              )}
            >
              <b>{l[0]}</b>
              <span>Escribir por WhatsApp</span>
            </a>
          ))}
          <a
            className="card-link"
            target="_blank"
            rel="noopener noreferrer"
            href={CFG.social[0][2]}
          >
            <b>Instagram</b>
            <span>Mensajes directos siempre abiertos</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <a className="logo" href="#inicio">
              NorteTech
            </a>
            <p style={{ marginTop: '8px', maxWidth: '34ch' }}>
              Electrónica importada y artículos para el hogar. Salta, Argentina.
            </p>
          </div>
          <ul>
            <li>
              <a href="#productos">Productos</a>
            </li>
            <li>
              <a href="#nosotros">Nosotros</a>
            </li>
            <li>
              <a href="#locales">Locales</a>
            </li>
            <li>
              <a href="#redes">Redes</a>
            </li>
            <li>
              <a href="#contacto">Contacto</a>
            </li>
          </ul>
        </div>
        <p className="copy">© 2026 NorteTech. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

import React, { useState } from 'react';

export default function Header({ cartCount, onOpenCart, theme, toggleTheme }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header>
      <div className="wrap bar">
        <a className="logo" href="#inicio">
          <span>Norte</span>Tech
        </a>
        <nav id="nav" className={navOpen ? 'open' : ''} aria-label="Principal">
          <ul>
            <li>
              <a href="#productos" onClick={() => setNavOpen(false)}>
                Productos
              </a>
            </li>
            <li>
              <a href="#nosotros" onClick={() => setNavOpen(false)}>
                Nosotros
              </a>
            </li>
            <li>
              <a href="#locales" onClick={() => setNavOpen(false)}>
                Locales
              </a>
            </li>
            <li>
              <a href="#redes" onClick={() => setNavOpen(false)}>
                Redes
              </a>
            </li>
            <li>
              <a href="#contacto" onClick={() => setNavOpen(false)}>
                Contacto
              </a>
            </li>
          </ul>
        </nav>
        <button
          className="ib"
          id="theme"
          aria-label="Cambiar tema claro u oscuro"
          onClick={toggleTheme}
        >
          🌓
        </button>
        <button
          className="ib"
          id="cartBtn"
          aria-label="Abrir carrito"
          onClick={onOpenCart}
        >
          🛒
          <span className="badge" id="count">
            {cartCount}
          </span>
        </button>
        <button
          className="ib burger"
          id="burger"
          aria-label="Abrir menú"
          aria-expanded={navOpen}
          onClick={() => setNavOpen(!navOpen)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}

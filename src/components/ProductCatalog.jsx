import React, { useState, useRef } from 'react';
import { CATS, P, money, CFG, wa } from '../data/catalog';

export default function ProductCatalog({ onAddToCart, showToast }) {
  const [selectedCat, setSelectedCat] = useState('');
  const [query, setQuery] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);
  const toolsRef = useRef(null);

  const filteredProducts = P.filter((p) => {
    const matchesCat = !selectedCat || p.cat === selectedCat;
    const matchesSearch = (p.name + ' ' + p.d + ' ' + p.cat)
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCatClick = (catName) => {
    setSelectedCat(selectedCat === catName ? '' : catName);
    if (toolsRef.current) {
      toolsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setSelectedCat('');
    setQuery('');
  };

  const openDetail = (prod) => {
    setDetailProduct(prod);
  };

  const closeDetail = () => {
    setDetailProduct(null);
  };

  return (
    <section id="productos">
      <div className="wrap">
        <h2>Productos</h2>
        <p className="lead">
          Elegí una categoría, buscá por nombre y armá tu pedido. Lo cerramos por
          WhatsApp.
        </p>

        <div className="cats" id="cats">
          {CATS.map((c) => {
            const isPressed = selectedCat === c[0];
            const count = P.filter((p) => p.cat === c[0]).length;
            return (
              <button
                key={c[0]}
                className="cat"
                data-cat={c[0]}
                aria-pressed={isPressed}
                onClick={() => handleCatClick(c[0])}
              >
                {c[3] && <span className="tag">{c[3]}</span>}
                <span className="ico">{c[1]}</span>
                <h3>{c[0]}</h3>
                <p>{c[2]}</p>
                <small>{count} productos</small>
              </button>
            );
          })}
        </div>

        <div className="tools" ref={toolsRef}>
          <input
            id="q"
            type="search"
            placeholder="Buscar producto"
            aria-label="Buscar producto"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="state" id="state">
            {(selectedCat ? selectedCat : 'Todas las categorías') +
              ' · ' +
              filteredProducts.length +
              ' resultados'}
          </span>
          <button className="btn sm" id="reset" onClick={handleReset}>
            Ver todo
          </button>
        </div>

        <div className="grid" id="grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <article
                key={p.id}
                className="prod"
                tabIndex={0}
                data-id={p.id}
                onClick={() => openDetail(p)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') openDetail(p);
                }}
              >
                <div className="thumb">{p.ico}</div>
                <h3>{p.name}</h3>
                <p>{p.d}</p>
                <div className="row">
                  <b>{money(p.price)}</b>
                  <button
                    className="btn primary sm"
                    data-add={p.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(p.id);
                      showToast(p.name + ' agregado');
                    }}
                  >
                    Agregar
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="empty">
              No encontramos productos con esa búsqueda. Probá con otra palabra o
              tocá Ver todo.
            </p>
          )}
        </div>
      </div>

      {detailProduct && (
        <dialog
          id="dlg"
          open
          style={{ display: 'block', position: 'fixed', zIndex: 100 }}
          onClick={(e) => {
            if (e.target.id === 'dlg') closeDetail();
          }}
        >
          <div id="dlgBody">
            <div className="big">{detailProduct.ico}</div>
            <h3>{detailProduct.name}</h3>
            <p className="lead" style={{ margin: '8px 0' }}>
              {detailProduct.d}
            </p>
            <p>
              <b style={{ fontFamily: 'var(--head)', fontSize: '1.5rem' }}>
                {money(detailProduct.price)}
              </b>{' '}
              <span className="lead">· Garantía incluida</span>
            </p>
            <div className="acts">
              <button
                className="btn primary"
                onClick={() => {
                  onAddToCart(detailProduct.id);
                  showToast(detailProduct.name + ' agregado');
                  closeDetail();
                }}
              >
                Agregar al carrito
              </button>
              <a
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
                href={wa(
                  CFG.tel[1],
                  'Hola, quiero consultar por: ' + detailProduct.name
                )}
              >
                Consultar
              </a>
              <button className="btn" onClick={closeDetail}>
                Cerrar
              </button>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
}

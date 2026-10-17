import React, { useState } from 'react';
import { P, money, CFG, wa } from '../data/catalog';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onClearCart,
  showToast,
}) {
  const [paying, setPaying] = useState(false);

  const cartIds = Object.keys(cart);
  const totalAmount = cartIds.reduce(
    (sum, id) => sum + cart[id] * P[id].price,
    0
  );
  const isEmpty = cartIds.length === 0;

  const handleSendWhatsApp = () => {
    if (isEmpty) return;
    const message =
      'Hola, quiero hacer este pedido:\n' +
      cartIds
        .map(
          (i) =>
            '• ' +
            cart[i] +
            ' x ' +
            P[i].name +
            ' (' +
            money(P[i].price * cart[i]) +
            ')'
        )
        .join('\n') +
      '\nTotal: ' +
      money(totalAmount) +
      '\n¿Tienen stock y cómo coordinamos?';
    window.open(wa(CFG.tel[1], message), '_blank', 'noopener,noreferrer');
  };

  const handlePay = async () => {
    if (isEmpty) return;

    if (CFG.mp.endpoint) {
      setPaying(true);
      try {
        const response = await fetch(CFG.mp.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cartIds.map((i) => ({
              id: Number(i),
              quantity: cart[i],
            })),
          }),
        });
        const data = await response.json();
        if (!data.url) throw new Error('No URL received');
        window.location.href = data.url;
        return;
      } catch (e) {
        showToast(
          'No pudimos abrir Mercado Pago. Probá de nuevo o pedí por WhatsApp.'
        );
      } finally {
        setPaying(false);
      }
      return;
    }

    if (CFG.mp.link) {
      window.open(CFG.mp.link, '_blank', 'noopener,noreferrer');
      showToast('Total a pagar: ' + money(totalAmount));
      return;
    }

    showToast(
      'El pago online todavía no está activado. Enviá tu pedido por WhatsApp.'
    );
  };

  return (
    <>
      <div
        className={`shade ${isOpen ? 'on' : ''}`}
        id="shade"
        onClick={onClose}
      />
      <aside
        className={`drawer ${isOpen ? 'on' : ''}`}
        id="drawer"
        aria-label="Carrito"
        aria-hidden={!isOpen}
      >
        <header>
          <h3>Tu pedido</h3>
          <button className="ib" id="closeCart" aria-label="Cerrar carrito" onClick={onClose}>
            ✕
          </button>
        </header>
        <div className="items" id="items">
          {!isEmpty ? (
            cartIds.map((i) => (
              <div key={i} className="item">
                <span className="e">{P[i].ico}</span>
                <div>
                  <b>{P[i].name}</b>
                  <small>{money(P[i].price)} c/u</small>
                </div>
                <div className="qty">
                  <button
                    data-q={i}
                    data-n="-1"
                    aria-label="Quitar uno"
                    onClick={() => onUpdateQty(Number(i), -1)}
                  >
                    –
                  </button>
                  <span>{cart[i]}</span>
                  <button
                    data-q={i}
                    data-n="1"
                    aria-label="Sumar uno"
                    onClick={() => onUpdateQty(Number(i), 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="lead">
              Tu carrito está vacío. Agregá productos desde el catálogo.
            </p>
          )}
        </div>
        <div className="foot2">
          <div className="total">
            <span>Total</span>
            <span id="total">{money(totalAmount)}</span>
          </div>
          <button
            className="btn mp"
            id="pay"
            disabled={isEmpty || paying}
            onClick={handlePay}
          >
            {paying ? 'Abriendo Mercado Pago…' : 'Pagar con Mercado Pago'}
          </button>
          <button
            className="btn primary"
            id="send"
            disabled={isEmpty}
            onClick={handleSendWhatsApp}
          >
            Enviar pedido por WhatsApp
          </button>
          <button
            className="btn sm"
            id="clear"
            disabled={isEmpty}
            onClick={() => {
              onClearCart();
              showToast('Carrito vaciado');
            }}
          >
            Vaciar carrito
          </button>
        </div>
      </aside>
    </>
  );
}

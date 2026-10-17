import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import ProductCatalog from './components/ProductCatalog';
import AboutUs from './components/AboutUs';
import Locales from './components/Locales';
import { Socials, Contact, Footer } from './components/FooterAndSocial';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.dataset.theme || 'auto';
  });

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nt-cart') || '{}');
    } catch (e) {
      return {};
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastState, setToastState] = useState({ message: '', show: false });
  const toastTimeoutRef = useRef(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nt-cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Handle payment status query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pg = params.get('pago');
    if (pg) {
      if (pg === 'ok') {
        setCart({});
      }
      setTimeout(() => {
        const msg =
          pg === 'ok'
            ? 'Pago recibido. ¡Gracias por tu compra!'
            : pg === 'pendiente'
            ? 'Tu pago está pendiente de acreditación.'
            : 'El pago no se completó. Podés intentarlo de nuevo.';
        showToast(msg);
      }, 400);
    }
  }, []);

  const showToast = (message) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastState({ message, show: true });
    toastTimeoutRef.current = setTimeout(() => {
      setToastState({ message: '', show: false });
    }, 2200);
  };

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDarkCurrently = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;

    const nextTheme = isDarkCurrently ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    setTheme(nextTheme);
  };

  const handleAddToCart = (id, delta = 1) => {
    setCart((prevCart) => {
      const currentQty = prevCart[id] || 0;
      const nextQty = currentQty + delta;
      const updated = { ...prevCart };
      if (nextQty <= 0) {
        delete updated[id];
      } else {
        updated[id] = nextQty;
      }
      return updated;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  const totalCartItems = Object.values(cart).reduce((s, qty) => s + qty, 0);

  return (
    <>
      <Header
        cartCount={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main id="inicio">
        <Hero />
        <Ticker />
        <ProductCatalog onAddToCart={handleAddToCart} showToast={showToast} />
        <AboutUs />
        <Locales showToast={showToast} />
        <Socials />
        <Contact />
      </main>
      <Footer />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleAddToCart}
        onClearCart={handleClearCart}
        showToast={showToast}
      />
      <Toast toastState={toastState} />
    </>
  );
}

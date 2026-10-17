import React from 'react';

export default function Toast({ toastState }) {
  return (
    <div
      className={`toast ${toastState.show ? 'on' : ''}`}
      id="toast"
      role="status"
      aria-live="polite"
    >
      {toastState.message}
    </div>
  );
}

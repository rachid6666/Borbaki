import React from 'react';

const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="error-modal">
      <h2>Error</h2>
      <p>{message}</p>
      {onClose && (
        <button onClick={onClose}>Close</button>
      )}
    </div>
  );
};

export default ErrorModal;

import React from 'react';
import './CustomAlert.css'; // Add your styles

const CustomAlert = ({ message, onClose, isModal }) => {
  return (
    <div className={`custom-alert ${isModal ? 'modal' : 'non-modal'}`}>
      <div className="alert-content">
        <p>{message}</p>
        {isModal && <button onClick={onClose}>Close</button>}
      </div>
    </div>
  );
};

export default CustomAlert;

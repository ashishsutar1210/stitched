import React, { useState } from 'react';
import ImagePreview from './ImagePreview';

const Modal = ({ show, onClose, user }) => {
  const [previewImage, setPreviewImage] = useState(null);

  if (!show) {
    return null;
  }

  const handleClose = () => {
    setPreviewImage(null); // also clear preview on modal close
    onClose();
  };

  return (
    <>
      <div className="modal-backdrop">
        <div className="modal">
          <button onClick={handleClose} className="modal-close">&times;</button>
          {user ? (
            <>
              <h2>{user.name}</h2>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Dress Type:</strong> {user.dressType}{user.dressType === 'Other' && user.otherDressType ? ` (${user.otherDressType})` : ''}</p>
              <p><strong>Description:</strong> {user.description}</p>
              <p><strong>Time Ready:</strong> {new Date(user.timeReady).toLocaleString()}</p>
              <div>
                <strong>Measurements:</strong>
                <ul>
                  {user.measurements && Object.entries(user.measurements).map(([key, value]) =>
                    value ? <li key={key}>{key}: {value}</li> : null
                  )}
                </ul>
              </div>
              <div>
                <strong>Images:</strong>
                <div className="modal-images">
                  {user.images && user.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="material"
                      className="thumb"
                      onClick={() => setPreviewImage(img)}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : <p>No user data.</p>}
        </div>
      </div>
      <ImagePreview src={previewImage} onClose={() => setPreviewImage(null)} />
    </>
  );
};

export default Modal; 
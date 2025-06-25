import React from 'react';

const ImagePreview = ({ src, onClose }) => {
  if (!src) {
    return null;
  }

  return (
    <div className="image-preview-backdrop" onClick={onClose}>
      <div className="image-preview-content">
        <button onClick={onClose} className="image-preview-close">&times;</button>
        <img src={src} alt="Preview" />
      </div>
    </div>
  );
};

export default ImagePreview; 
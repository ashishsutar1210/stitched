import React from 'react';
import { apiRequest } from '../utils/api';

const categories = ['Dress', 'Blouse', 'Suit', 'Other'];

function DesignGallery({ designs, onDelete }) {
  const handleDelete = async (id) => {
    if (window.confirm('Delete this design?')) {
      try {
        await apiRequest(`/api/designs/${id}`, { method: 'DELETE' });
        onDelete();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  const designsByCategory = (cat) => designs.filter(d => d.category === cat);

  return (
    <div className="design-gallery">
      {designs.length === 0 && <p>No designs yet.</p>}
      {categories.map(cat => (
        designsByCategory(cat).length > 0 && (
          <div key={cat} className="design-section">
            <h3>{cat}</h3>
            <div className="gallery-grid">
              {designsByCategory(cat).map(design => (
                <div className="design-card" key={design._id}>
                  <img src={design.imageUrl} alt={design.title || 'Design'} />
                  <div className="design-info">
                    <h4>{design.title}</h4>
                    <p>{design.description}</p>
                    {onDelete && <button onClick={() => handleDelete(design._id)}>Delete</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}

export default DesignGallery; 
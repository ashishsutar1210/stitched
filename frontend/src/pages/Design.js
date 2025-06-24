import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';
import { isLoggedIn } from '../utils/auth';
import DesignGallery from '../components/DesignGallery';
import DesignUpload from '../components/DesignUpload';

function Design() {
  const [designs, setDesigns] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    apiRequest('/api/designs', { method: 'GET', headers: {} })
      .then(setDesigns)
      .catch(() => setDesigns([]));
  }, [refresh]);

  const handleUpload = () => setRefresh(r => !r);
  const handleDelete = () => setRefresh(r => !r);

  return (
    <div className="design-page">
      <h2>Design Gallery</h2>
      {isLoggedIn() && <DesignUpload onSuccess={handleUpload} />}
      <DesignGallery designs={designs} onDelete={isLoggedIn() ? handleDelete : null} />
    </div>
  );
}

export default Design; 
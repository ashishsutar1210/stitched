import React, { useState } from 'react';
import { apiRequest } from '../utils/api';

const categories = ['Dress', 'Blouse', 'Suit', 'Other'];

function DesignUpload({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Dress');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!file) return setError('Image required');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', file);
    try {
      await apiRequest('/api/designs', { method: 'POST', body: formData });
      setTitle(''); setDescription(''); setFile(null); setCategory('Dress');
      onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="design-upload" onSubmit={handleSubmit} encType="multipart/form-data">
      <h3>Upload New Design</h3>
      <select value={category} onChange={e => setCategory(e.target.value)} required>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default DesignUpload; 
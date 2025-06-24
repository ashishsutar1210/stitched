import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';

const dressTypes = [
  'Blouse', 'Saree', 'Top', 'Suite', 'Dress', 'Other'
];

function UserForm({ user, onSuccess }) {
  const [form, setForm] = useState({
    name: '', phone: '', address: '', description: '', dressType: '', otherDressType: '',
    measurements: { sleeveLength: '', sleeveWidth: '', shoulder: '', waist: '', chest: '', height: '' },
    timeReady: '', images: []
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setForm({ ...user, measurements: user.measurements || form.measurements, timeReady: user.timeReady ? user.timeReady.slice(0, 16) : '' });
    } else {
      setForm({
        name: '', phone: '', address: '', description: '', dressType: '', otherDressType: '',
        measurements: { sleeveLength: '', sleeveWidth: '', shoulder: '', waist: '', chest: '', height: '' },
        timeReady: '', images: []
      });
      setFiles([]);
    }
    setError('');
    // eslint-disable-next-line
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name in form.measurements) {
      setForm(f => ({ ...f, measurements: { ...f.measurements, [name]: value } }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleFileChange = e => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'measurements') {
        formData.append('measurements', JSON.stringify(value));
      } else if (key !== 'images') {
        formData.append(key, value);
      }
    });
    files.forEach(f => formData.append('images', f));
    try {
      if (user && user._id) {
        await apiRequest(`/api/users/${user._id}`, { method: 'PUT', body: formData });
      } else {
        await apiRequest('/api/users', { method: 'POST', body: formData });
      }
      onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <h3>{user ? 'Edit User' : 'Add User'}</h3>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <select name="dressType" value={form.dressType} onChange={handleChange} required>
        <option value="">Select Dress Type</option>
        {dressTypes.map(type => <option key={type} value={type}>{type}</option>)}
      </select>
      {form.dressType === 'Other' && (
        <input name="otherDressType" value={form.otherDressType} onChange={handleChange} placeholder="Specify Dress Type" />
      )}
      <div className="measurements">
        <label>Measurements:</label>
        {Object.keys(form.measurements).map(key => (
          <input key={key} name={key} value={form.measurements[key]} onChange={handleChange} placeholder={key.replace(/([A-Z])/g, ' $1')} />
        ))}
      </div>
      <label>Time Ready:</label>
      <input type="datetime-local" name="timeReady" value={form.timeReady} onChange={handleChange} />
      <label>Material Images:</label>
      <input type="file" name="images" multiple accept="image/*" onChange={handleFileChange} />
      <button type="submit">{user ? 'Update' : 'Add'} User</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default UserForm; 
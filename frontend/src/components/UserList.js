import React, { useState } from 'react';
import { apiRequest } from '../utils/api';
import ImagePreview from './ImagePreview';

function UserList({ users, onEdit, onDelete }) {
  const [previewImage, setPreviewImage] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      try {
        await apiRequest(`/api/users/${id}`, { method: 'DELETE' });
        onDelete();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  return (
    <>
      <div className="user-list">
        <h3>All Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Phone</th><th>Dress Type</th><th>Time Ready</th>
              <th>Measurements</th>
              <th>Images</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.dressType}{user.dressType === 'Other' && user.otherDressType ? ` (${user.otherDressType})` : ''}</td>
                <td>{user.timeReady ? new Date(user.timeReady).toLocaleString() : ''}</td>
                <td>
                  {user.measurements && (
                    <ul>
                      {Object.entries(user.measurements).map(([key, value]) =>
                        value ? <li key={key}>{key}: {value}</li> : null
                      )}
                    </ul>
                  )}
                </td>
                <td>
                  {user.images && user.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="material"
                      className="thumb"
                      onClick={() => setPreviewImage(img)}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </td>
                <td>
                  <button onClick={() => onEdit(user)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(user._id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ImagePreview src={previewImage} onClose={() => setPreviewImage(null)} />
    </>
  );
}

export default UserList; 
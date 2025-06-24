import React from 'react';
import { apiRequest } from '../utils/api';

function UserList({ users, onEdit, onDelete }) {
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
    <div className="user-list">
      <h3>All Users</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Phone</th><th>Dress Type</th><th>Time Ready</th><th>Images</th><th>Actions</th>
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
                {user.images && user.images.map((img, i) => (
                  <img key={i} src={img} alt="material" className="thumb" />
                ))}
              </td>
              <td>
                <button onClick={() => onEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList; 
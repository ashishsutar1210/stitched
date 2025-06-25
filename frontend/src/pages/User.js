import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';
import ProtectedRoute from '../components/ProtectedRoute';
import NotificationBanner from '../components/NotificationBanner';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import Modal from '../components/Modal';

function daysUntil(date) {
  const now = new Date();
  const target = new Date(date);
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

function User() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalUser, setModalUser] = useState(null);
  const [notification, setNotification] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [soonUsers, setSoonUsers] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const query = searchTerm ? `?search=${searchTerm}` : '';
      apiRequest(`/api/users${query}`)
        .then(setUsers)
        .catch(() => setUsers([]));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [refresh, searchTerm]);

  useEffect(() => {
    const soon = users.filter(u => u.timeReady && [2, 3].includes(daysUntil(u.timeReady)));
    setSoonUsers(soon);
    if (soon.length > 0) {
      const names = soon.map(u => u.name || 'Unnamed').join(', ');
      setNotification(`Reminder: Orders for ${names} are due in 2 or 3 days!`);
    } else {
      setNotification('');
    }
  }, [users]);

  const handleEdit = (user) => setSelectedUser(user);
  const handleFormSuccess = () => {
    setSelectedUser(null);
    setRefresh(r => !r);
  };

  return (
    <ProtectedRoute>
      <div className="user-page">
        <h2>User Management</h2>
        <NotificationBanner message={notification} />
        {soonUsers.length > 0 && (
          <div className="soon-users">
            <h4>Due Soon:</h4>
            <div className="soon-users-list">
              {soonUsers.map(user => (
                <button key={user._id} onClick={() => setModalUser(user)} className="btn-soon">
                  {user.name} - {new Date(user.timeReady).toLocaleDateString()}
                </button>
              ))}
            </div>
          </div>
        )}
        <UserForm user={selectedUser} onSuccess={handleFormSuccess} />
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ margin: '10px 0' }}
        />
        <UserList users={users} onEdit={handleEdit} onDelete={handleFormSuccess} />
        <Modal show={!!modalUser} onClose={() => setModalUser(null)} user={modalUser} />
      </div>
    </ProtectedRoute>
  );
}

export default User; 
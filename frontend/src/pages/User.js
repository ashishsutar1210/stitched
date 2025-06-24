import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';
import ProtectedRoute from '../components/ProtectedRoute';
import NotificationBanner from '../components/NotificationBanner';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';

function daysUntil(date) {
  const now = new Date();
  const target = new Date(date);
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

function User() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notification, setNotification] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    apiRequest('/api/users')
      .then(setUsers)
      .catch(() => setUsers([]));
  }, [refresh]);

  useEffect(() => {
    const soon = users.filter(u => u.timeReady && [2, 3].includes(daysUntil(u.timeReady)));
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
        <UserForm user={selectedUser} onSuccess={handleFormSuccess} />
        <UserList users={users} onEdit={handleEdit} onDelete={handleFormSuccess} />
      </div>
    </ProtectedRoute>
  );
}

export default User; 
import React from 'react';

function NotificationBanner({ message }) {
  if (!message) return null;
  return (
    <div className="notification-banner">
      {message}
    </div>
  );
}

export default NotificationBanner; 
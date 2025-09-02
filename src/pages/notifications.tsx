// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCheck, faTrash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import notificationsService from '../services/notificationsService';
import LoadingSpinner from '../components/LoadingSpinner';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationsService.getUserNotifications();
      setNotifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationsService.markAsRead(notificationId);
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, read: true }
            : notif
        )
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await notificationsService.deleteNotification(notificationId);
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationsService.markAllAsRead();
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'BOOKING_CONFIRMED':
      case 'BOOKING_CANCELLED':
        return faCheck;
      case 'GAME_INVITATION':
        return faBell;
      case 'PAYMENT_REMINDER':
        return faEnvelope;
      default:
        return faBell;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'BOOKING_CONFIRMED':
        return '#27ae60';
      case 'BOOKING_CANCELLED':
        return '#e74c3c';
      case 'GAME_INVITATION':
        return '#3498db';
      case 'PAYMENT_REMINDER':
        return '#f39c12';
      default:
        return '#95a5a6';
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading notifications..." />;
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p style={{ color: '#e74c3c' }}>Error: {error}</p>
        <button onClick={fetchNotifications}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        borderBottom: '1px solid #eee',
        paddingBottom: '20px'
      }}>
        <h1 style={{ margin: 0, color: '#2c3e50' }}>
          <FontAwesomeIcon icon={faBell} style={{ marginRight: '10px' }} />
          Notifications
        </h1>
        {notifications.length > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Mark All as Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          color: '#7f8c8d'
        }}>
          <FontAwesomeIcon icon={faBell} size="3x" style={{ marginBottom: '20px' }} />
          <h3>No notifications yet</h3>
          <p>You'll see notifications here when you have new activity.</p>
        </div>
      ) : (
        <div>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '15px',
                backgroundColor: notification.read ? '#fff' : '#f8f9fa',
                borderLeft: `4px solid ${getNotificationColor(notification.type)}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                  <FontAwesomeIcon
                    icon={getNotificationIcon(notification.type)}
                    style={{
                      color: getNotificationColor(notification.type),
                      marginRight: '15px',
                      marginTop: '3px',
                      fontSize: '18px'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      margin: '0 0 8px 0', 
                      color: notification.read ? '#2c3e50' : '#000',
                      fontWeight: notification.read ? 'normal' : 'bold'
                    }}>
                      {notification.title}
                    </h4>
                    <p style={{ 
                      margin: '0 0 10px 0', 
                      color: '#7f8c8d',
                      lineHeight: '1.5'
                    }}>
                      {notification.message}
                    </p>
                    <small style={{ color: '#95a5a6' }}>
                      {new Date(notification.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteNotification(notification.id)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications; 
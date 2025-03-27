import React, { useState } from 'react';

const Notification = () => {
  const [notificationVisible, setNotificationVisible] = useState(false);

  const handleShow = () => {
    setNotificationVisible(true);

    // Automatically hide the notification after 3 seconds
    setTimeout(() => {
      setNotificationVisible(false);
    }, 3000);
  };

  const handleClose = () => {
    setNotificationVisible(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Successful Application Notification </h1>
      <button
        onClick={handleShow}
        className="px-4 py-2 bg-green-500 text-white outline-none rounded-md hover:bg-green-600 transition"
      >
        Show Notification
      </button>

      {/* Notification Display */}
      {notificationVisible && (
        <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded shadow-lg transition-transform transform translate-y-0" style={{ zIndex: 1000 }}>
          <p>Your job application was successful!</p>
          <button onClick={handleClose} className="ml-4 text-white underline">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;
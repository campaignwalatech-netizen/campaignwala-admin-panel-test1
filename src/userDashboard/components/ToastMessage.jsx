import React from 'react';

const ToastMessage = () => {
  return (
    <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-2 px-3 sm:px-4 rounded-md text-xs sm:text-sm flex items-center justify-between mx-2 sm:mx-4 lg:mx-6 mt-3 sm:mt-4">
      <p>✅ Success toast message</p>
    </div>
  );
};

export default ToastMessage;
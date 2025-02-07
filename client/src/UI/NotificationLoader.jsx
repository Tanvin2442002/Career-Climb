import React from 'react';

const NotificationLoader = () => {
  return (
    <div className="gap-1 grid grid-cols-5">
      <div className="col-span-1 animate-pulse bg-gray-300 w-12 h-12 rounded-full" />
      <div className="col-span-4 flex flex-col w-full gap-2">
        <div className="animate-pulse bg-gray-300 w-11/12 h-5 rounded-full" />
        <div className="animate-pulse bg-gray-300 w-9/12 h-5 rounded-full" />
      </div>
    </div>
  );
}

export default NotificationLoader;

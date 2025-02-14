import React, { useEffect, useState } from "react";
import { supabase } from "../../Auth/SupabaseClient";
import NotificationLoader from "../../UI/NotificationLoader";
const url = process.env.REACT_APP_API_URL;

const NotificationCard = ({ notification }) => {

  return (
    <div className="flex items-center mt-3 hover:bg-gray-100 rounded-lg px-1 pl-0 py-2 cursor-pointer border-b">
      <div className="flex flex-shrink-0 items-end">
        <img className="h-14 w-14 rounded-full" src="https://res.cloudinary.com/dojfzled8/image/upload/v1738605701/zaima_vyjcbj.jpg" alt="User" />
      </div>
      <div className="ml-3 text-left">
        <span className="font-medium text-sm block">{notification.userName}</span>
        <p className="text-sm font-semibold text-gray-600">{notification.details}</p>
        <span className="text-xs text-green-500 font-semibold">{notification.time}</span>
      </div>
    </div>
  );
};

const NotificationList = ({ userId, setShowNotifications }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/notifications/${userId}`);
      const data = await response.json();
      console.log(data);
      setLoading(false);
      if (response.ok) {
        setNotifications(data.notifications);
      } else {
        console.error("Error fetching notifications:", data.message);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const channel = supabase
      .channel(`notifications-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notification",
          filter: `receiver_id=eq.${userId}`,
        },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();
    console.log(channel);
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return (
    <div className="bg-gray-100 absolute right-0 top-8 max-w-sm flex justify-center items-center">
      <div className="bg-white w-screen px-4 py-3 rounded-lg shadow-lg">
        <div className="flex items-center justify-between text-left border-b-2">

          {loading && <div className="animate-pulse bg-gray-300 w-7/12 h-5 rounded-full mb-2" />}
          {!loading && <span className="font-medium text-lg">Notifications</span>}

          <button 
            className="bg-gray-200 p-2 absolute top-1 right-1 rounded-full hover:scale-110 transition duration-100"
            onClick={() => setShowNotifications(false)}
          >
            <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto max-h-screen my-2">

          {loading && <NotificationLoader />}
          {!loading && notifications.length === 0 && <p className="text-center">No Notifications</p>}
          {!loading && notifications.map((notification, index) => (
            <NotificationCard key={index} notification={notification} />
          ))}

        </div>
      </div>
    </div>
  );
};

export default NotificationList;

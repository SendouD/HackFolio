import React, { useEffect, useState } from "react";

function NotificationsComponent(props) {
  const [data, setData] = useState([]);
  const [notis, setNotis] = useState({});

  useEffect(() => {
    getMessagesStatus();
  }, [props.currUser, props.flag]);

  useEffect(() => {
    let temp = {};
    if (data.length !== 0) {
      data.data.forEach((ele) => {
        if (ele.from !== props.currUser) {
          const from = ele.from;
          temp[from] = (temp[from] || 0) + 1;
        }
      });
    }
    setNotis(temp);
  }, [data, props.currUser]);

  async function getMessagesStatus() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/getReadStatus/${props.currUser}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setData(await response.json());
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  function NotificationBox({ from, count }) {
    return (
      <div
        className="cursor-pointer bg-white hover:bg-gray-50 border-l-4 border-indigo-600 mb-2 shadow-sm transition-all"
        onClick={() => props.setCurrUser(from)}
      >
        <div className="flex items-center p-3">
          <div className="h-2 w-2 bg-indigo-600 rounded-full mr-3"></div>
          <div className="flex-1">
            <p className="font-medium">{from}</p>
            <p className="text-xs text-gray-500">
              {count} unread message{count > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
      <div className="bg-indigo-600 text-white p-3">
        <h2 className="text-xl font-medium">Notifications</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        {Object.entries(notis).length === 0 ? (
          <p className="text-center text-gray-400 mt-4">No new notifications</p>
        ) : (
          Object.entries(notis).map(([from, count], i) => (
            <NotificationBox key={i} from={from} count={count} />
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationsComponent;
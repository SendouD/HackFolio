import { useEffect, useRef, useState } from "react";

function ChatSelectionWindow(props) {
  const [data, setData] = useState(null);
  const addInpRef = useRef(null);
  const msgsEndRef = useRef(null);
  
  useEffect(() => {
    getUsers();
  }, []);
  
  async function getUsers() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/getFriends`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setData(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  async function handleAdd(e) {
    e.preventDefault();
    const email = addInpRef.current.value;
    if (!email.trim()) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/addFriends`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
        credentials: 'include',
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      console.log(await response.json());
      
      setData(prev => ({
        ...prev,
        interactedEmails: [...prev.interactedEmails, email]
      }));
      
      addInpRef.current.value = "";
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }
  
  return (
    <div className="flex flex-col h-full">
      <form onSubmit={handleAdd} className="p-3 border-b border-gray-100 flex">
        <input 
          type="text" 
          className="flex-1 border border-gray-200 rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" 
          placeholder="Add contact by email"
          ref={addInpRef}
        />
        <button 
          className="bg-indigo-600 text-white px-3 py-2 rounded-r hover:bg-indigo-700 transition-colors" 
          type="submit"
        >
          Add
        </button>
      </form>
      
      <div className="flex-1 overflow-y-auto">
        {data && data.interactedEmails.length > 0 ? (
          data.interactedEmails.map((email, i) => (
            <div 
              key={i}
              className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => props.setCurrUser(email)}
            >
              {email}
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-400">
            No contacts yet
          </div>
        )}
        <div ref={msgsEndRef} />
      </div>
    </div>
  );
}

export default ChatSelectionWindow;
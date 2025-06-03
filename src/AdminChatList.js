import React, { useEffect, useState } from 'react';
import { adminDb } from './firebase';
import { collection, query, where, onSnapshot, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import './AdminChatList.css';

const AdminChatList = ({ onSelectRoom }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Listen to chats collection to get active chat rooms with latest message
    const chatsCol = collection(adminDb, 'chats');
    const q = query(chatsCol, orderBy('lastUpdated', 'desc'));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const rooms = [];
      for (const docSnap of querySnapshot.docs) {
        const roomId = docSnap.id;
        // Get user info for this roomId
        const userDoc = await getDoc(doc(adminDb, 'users', roomId));
        if (userDoc.exists() && userDoc.data().role === 'user') {
          const roomData = docSnap.data();
          rooms.push({
            id: roomId,
            user: userDoc.data(),
            lastMessage: roomData.lastMessage || '',
            lastUpdated: roomData.lastUpdated ? roomData.lastUpdated.toDate() : null,
          });
        }
      }
      setChatRooms(rooms);
      setError(null);
    }, (err) => {
      console.error('Error fetching chat rooms:', err);
      setError('Failed to load chat rooms: ' + err.message);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="admin-chatlist-container">
      <h2>Chats</h2>
      <button onClick={() => onSelectRoom(null)} style={{ marginBottom: '10px' }}>
        Back to Chats
      </button>
      {error ? (
        <p className="error-message">{error}</p>
      ) : chatRooms.length === 0 ? (
        <p>No active chats.</p>
      ) : (
        <ul className="chatlist">
          {chatRooms.map(({ id, user, lastMessage, lastUpdated }) => (
            <li key={id} onClick={() => onSelectRoom(id)} className="chatlist-item">
              <div className="chatlist-avatar">{user.email ? user.email.charAt(0).toUpperCase() : id.charAt(0).toUpperCase()}</div>
              <div className="chatlist-info">
                <div className="chatlist-name">{user.email || id}</div>
                <div className="chatlist-last-message">{lastMessage}</div>
                <div className="chatlist-timestamp">{lastUpdated ? lastUpdated.toLocaleString() : ''}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminChatList;

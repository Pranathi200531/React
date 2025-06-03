import React, { useEffect, useState, useRef } from 'react';
import { adminDb } from './firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import './Chat.css';

const ChatPage = ({ roomId, onBack, isAdmin, user }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!roomId) return;

        // Use adminDb for all chats to have shared chat rooms
        const db = adminDb;
        const messagesCol = collection(db, 'chats', roomId, 'messages');
        const q = query(messagesCol, orderBy('createdAt', 'asc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push({ id: doc.id, ...doc.data() });
            });
            setMessages(msgs);
            scrollToBottom();
        }, (error) => {
            console.error('Error fetching messages:', error);
        });

        return () => unsubscribe();
    }, [roomId]);


    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;

        // Use adminDb for all chats
        const db = adminDb;
        const messagesCol = collection(db, 'chats', roomId, 'messages');
        const chatDocRef = doc(db, 'chats', roomId);

        try {
            await addDoc(messagesCol, {
                text: newMessage,
                createdAt: serverTimestamp(),
                sender: isAdmin ? 'admin' : (user ? user.uid : 'user'),
            });
            // Update last message and timestamp in chat room document for AdminChatList
            await updateDoc(chatDocRef, {
                lastMessage: newMessage,
                lastUpdated: serverTimestamp(),
            });
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        !roomId ? (
            <div>Please select a chat room to start messaging.</div>
        ) : (
            <div className="chat-container">
                <div className="chat-header">
                    <button onClick={onBack} className="clear-btn">Back</button>
                    <h2>Chat Room: {roomId}</h2>
                </div>
                <div className="chat-messages">
                    {messages.map((msg) => {
                        const isSent = msg.sender === (isAdmin ? 'admin' : (user ? user.uid : 'user'));
                        return (
                            <div key={msg.id} className={`message ${isSent ? 'sent' : 'received'}`}>
                                <div className="message-meta">
                                    <strong>{msg.sender.charAt(0).toUpperCase() + msg.sender.slice(1)}</strong> - {formatTimestamp(msg.createdAt)}
                                </div>
                                <span>{msg.text}</span>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
                <form className="chat-input-form" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button type="submit" className="send-btn" disabled={newMessage.trim() === ''}>Send</button>
                </form>
            </div>
        )
    );
};

export default ChatPage;

import React, { useState, useEffect, useRef } from 'react';

const ChatRoomPage = ({ roomId, onBack }) => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'admin', text: 'Hello! How can I help you today?' },
        { id: 2, sender: 'user', text: 'Hi, I have a question about your service.' }
    ]);
    const [inputText, setInputText] = useState('');
    const [adminInput, setAdminInput] = useState('');
    const messagesEndRef = useRef(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = () => {
        if (inputText.trim() === '') return;
        const newMessage = {
            id: messages.length + 1,
            sender: 'user',
            text: inputText.trim()
        };
        setMessages([...messages, newMessage]);
        setInputText('');
    };

    const handleAdminSend = () => {
        if (adminInput.trim() === '') return;
        const newAdminMessage = {
            id: messages.length + 1,
            sender: 'admin',
            text: adminInput.trim()
        };
        setMessages([...messages, newAdminMessage]);
        setAdminInput('');
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc' }}>
            <header style={{ padding: '10px', backgroundColor: '#075E54', color: 'black', display: 'flex', alignItems: 'center' }}>
                <button onClick={onBack} style={{ marginRight: '10px', background: 'none', border: 'none', color: 'black', fontSize: '18px', cursor: 'pointer' }}>←</button>
                <h2 style={{ margin: 0 }}>Chat Room</h2>
            </header>
            <div style={{ flex: 1, padding: '10px', overflowY: 'auto', backgroundColor: '#ECE5DD' }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{
                        display: 'flex',
                        justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        marginBottom: '10px'
                    }}>
                        <div style={{
                            backgroundColor: msg.sender === 'user' ? '#DCF8C6' : 'green',
                            padding: '8px 12px',
                            borderRadius: '7.5px',
                            maxWidth: '70%',
                            boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
                            color: msg.sender === 'user' ? 'black' : 'white'
                        }}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <footer style={{ padding: '10px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <textarea
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyPress={handleInputKeyPress}
                    placeholder="Type a message"
                    style={{ flex: 1, resize: 'none', borderRadius: '20px', padding: '10px', border: '1px solid', color: 'black' }}
                    rows={1}
                />
                <button onClick={handleSend} style={{ marginLeft: '10px', backgroundColor: 'pink', color: 'black', border: 'none', borderRadius: '20px', padding: '10px 15px', cursor: 'pointer' }}>
                    Send
                </button>
            </footer>
            <footer style={{ padding: '10px', backgroundColor: '#e0e0e0', display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                <textarea
                    value={adminInput}
                    onChange={e => setAdminInput(e.target.value)}
                    placeholder="Admin reply"
                    style={{ flex: 1, resize: 'none', borderRadius: '20px', padding: '10px', border: '1px solid #ccc', color: 'black' }}
                    rows={1}
                />
                <button onClick={handleAdminSend} style={{ marginLeft: '10px', backgroundColor: '#128C7E', color: 'white', border: 'none', borderRadius: '20px', padding: '10px 15px', cursor: 'pointer' }}>
                    Send
                </button>
            </footer>
        </div>
    );
};

export default ChatRoomPage;

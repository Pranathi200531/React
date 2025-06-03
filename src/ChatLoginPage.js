import React, { useState } from 'react';
import AdminAuth from './AdminAuth';
import UserAuth from './UserAuth';
import AdminChatList from './AdminChatList';
import ChatPage from './ChatPage';
import MoviesWebsite from './MoviesWebsite';

const ChatLoginPage = () => {
    const [loginType, setLoginType] = useState(null); // 'admin' or 'user'
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [userChatActive, setUserChatActive] = useState(false);
    const [showMoviesWebsite, setShowMoviesWebsite] = useState(false);

    const handleAdminLoginSuccess = (userData) => {
        setUser(userData.user);
        setIsAdmin(true);
        setSelectedRoom(null);
        setUserChatActive(false);
        setShowMoviesWebsite(false);
    };

    const handleUserLoginSuccess = (userData) => {
        setUser(userData.user);
        setIsAdmin(false);
        setSelectedRoom(null);
        setUserChatActive(false);
        setShowMoviesWebsite(true);
    };

    const handleSelectRoom = (roomId) => {
        setSelectedRoom(roomId);
    };

    const handleBackToList = () => {
        setSelectedRoom(null);
    };

    const handleUserChatBack = () => {
        setUserChatActive(false);
    };

    const handleLogout = () => {
        setUser(null);
        setIsAdmin(false);
        setSelectedRoom(null);
        setUserChatActive(false);
        setLoginType(null);
        setShowMoviesWebsite(false);
    };

    if (!loginType) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Login to Chat</h2>
                <button onClick={() => setLoginType('admin')} style={{ marginRight: '20px', padding: '10px 20px' }}>
                    Admin Login
                </button>
                <button onClick={() => setLoginType('user')} style={{ padding: '10px 20px' }}>
                    User Login
                </button>
            </div>
        );
    }

    if (loginType === 'admin' && !user) {
        return <AdminAuth onUserChanged={handleAdminLoginSuccess} onLogout={handleLogout} />;
    }

    if (loginType === 'user' && !user) {
        return <UserAuth onUserChanged={handleUserLoginSuccess} onLogout={handleLogout} />;
    }

    // After login
    if (isAdmin) {
        if (!selectedRoom) {
            return (
                <div>
                    <button onClick={handleLogout} style={{ margin: '10px' }}>Logout</button>
                    <AdminChatList onSelectRoom={handleSelectRoom} />
                </div>
            );
        } else {
            return (
                <div>
                    <button onClick={handleLogout} style={{ margin: '10px' }}>Logout</button>
                    <ChatPage roomId={selectedRoom} onBack={handleBackToList} isAdmin={true} user={user} />
                </div>
            );
        }
    } else {
        if (!showMoviesWebsite) {
            return (
                <div>
                    <button onClick={handleLogout} style={{ margin: '10px' }}>Logout</button>
                    <MoviesWebsite onChatButtonClick={() => setShowMoviesWebsite(true)} />
                </div>
            );
        } else {
            return (
                <div>
                    <button onClick={handleLogout} style={{ margin: '10px' }}>Logout</button>
                    <ChatPage roomId={user.uid} onBack={() => setShowMoviesWebsite(false)} isAdmin={false} user={user} />
                </div>
            );
        }
    }
};

export default ChatLoginPage;

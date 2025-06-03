import React, { useState } from 'react';
import MoviesWebsite from './MoviesWebsite';
import UserAuth from './UserAuth';
import AdminAuth from './AdminAuth';
import ChatPage from './ChatPage';
import AdminChatList from './AdminChatList';
import AboutPage from './AboutPage';

const App = () => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [userChatActive, setUserChatActive] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
    const [authType, setAuthType] = useState('user'); // 'user' or 'admin'

    const handleLogout = () => {
        setUser(null);
        setIsAdmin(false);
        setSelectedRoom(null);
        setUserChatActive(false);
        setShowLogin(false);
        setShowAdminLogin(false);
        setShowSignup(false);
    };

    const handleSelectRoom = (roomId) => {
        setSelectedRoom(roomId);
    };

    const handleBackToList = () => {
        setSelectedRoom(null);
    };

    const handleUserChatBack = () => {
        setUserChatActive(false);
        setUser(null);
    };

    const handleAboutClick = () => {
        setShowAbout(true);
    };

    const handleAboutBack = () => {
        setShowAbout(false);
    };

    const handleLoginClick = () => {
        setAuthMode('login');
        setAuthType('user');
        setShowLogin(true);
        setShowSignup(false);
        setShowAdminLogin(false);
    };

    const handleAdminLoginClick = () => {
        setAuthMode('login');
        setAuthType('admin');
        setShowAdminLogin(true);
        setShowLogin(false);
        setShowSignup(false);
    };

    const handleSignupClick = () => {
        setAuthMode('signup');
        setAuthType('user');
        setShowSignup(true);
        setShowLogin(false);
        setShowAdminLogin(false);
    };

    const handleUserLoggedIn = (userData) => {
        setUser(userData);
        setIsAdmin(false);
        setShowLogin(false);
        setShowSignup(false);
        setUserChatActive(true);
    };

    const handleAdminLoggedIn = (adminData) => {
        setUser(adminData);
        setIsAdmin(true);
        setShowAdminLogin(false);
        setSelectedRoom(null);
    };

    if (showLogin) {
        if (authType === 'user') {
            return <UserAuth onUserChanged={handleUserLoggedIn} onBack={() => setShowLogin(false)} />;
        } else {
            return <AdminAuth onUserChanged={handleAdminLoggedIn} onBack={() => setShowAdminLogin(false)} />;
        }
    }

    if (showSignup) {
        if (authType === 'user') {
            return <UserAuth onUserChanged={handleUserLoggedIn} onBack={() => setShowSignup(false)} />;
        } else {
            return <AdminAuth onUserChanged={handleAdminLoggedIn} onBack={() => setShowSignup(false)} />;
        }
    }

    if (userChatActive && user) {
        return <ChatPage roomId={user.uid} onBack={handleUserChatBack} />;
    }

    if (isAdmin) {
        if (!selectedRoom) {
            return <AdminChatList onSelectRoom={handleSelectRoom} onLogout={handleLogout} />;
        } else {
            return <ChatPage roomId={selectedRoom} onBack={handleBackToList} onLogout={handleLogout} />;
        }
    }

    if (showAbout) {
        return <AboutPage onBack={handleAboutBack} />;
    }

    return (
        <MoviesWebsite
            onLoginClick={handleLoginClick}
            onAdminLoginClick={handleAdminLoginClick}
            onSignupClick={handleSignupClick}
            onAboutClick={handleAboutClick}
            user={user}
            onLogout={handleLogout}
        />
    );
};

export default App;

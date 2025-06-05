import React, { useState } from 'react';
import MoviesWebsite from './MoviesWebsite';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ChatPage from './ChatPage';
import ChatRoomPage from './ChatRoomPage';
import AdminChatList from './AdminChatList';
import AboutPage from './AboutPage';

const App = () => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [userChatActive, setUserChatActive] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [showLoginPage, setShowLoginPage] = useState(true);
    const [showSignupPage, setShowSignupPage] = useState(false);

    const handleLogout = () => {
        setUser(null);
        setIsAdmin(false);
        setSelectedRoom(null);
        setUserChatActive(false);
        setShowLoginPage(true);
        setShowSignupPage(false);
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
        setShowLoginPage(false);
        // Ensure after back from chat room page, user goes to home page
        // So no change needed here as MoviesWebsite is shown when user is set and userChatActive is false
    };

    // Fix for back button in chats
    const handleChatBack = () => {
        if (isAdmin) {
            if (selectedRoom) {
                setSelectedRoom(null);
            } else {
                setUser(null);
                setIsAdmin(false);
                setShowLoginPage(true);
            }
        } else {
            setUserChatActive(false);
            setUser(null);
            setShowLoginPage(true);
        }
    };

    const handleAboutClick = () => {
        setShowAbout(true);
    };

    const handleAboutBack = () => {
        setShowAbout(false);
    };

    const handleShowSignup = () => {
        setShowSignupPage(true);
        setShowLoginPage(false);
    };

    const handleShowLogin = () => {
        setShowLoginPage(true);
        setShowSignupPage(false);
    };

    const handleUserLoggedIn = (userData) => {
        setUser(userData);
        setIsAdmin(false);
        setUserChatActive(false);
        setShowLoginPage(false);
        setShowSignupPage(false);
    };

    const handleAdminLoggedIn = (adminData) => {
        setUser(adminData);
        setIsAdmin(true);
        setSelectedRoom(null);
        setUserChatActive(false);
        setShowLoginPage(false);
        setShowSignupPage(false);
    };

    if (showLoginPage) {
        return (
            <LoginPage
                onUserLoggedIn={handleUserLoggedIn}
                onAdminLoggedIn={handleAdminLoggedIn}
                onBack={() => { }}
                onShowSignup={handleShowSignup}
            />
        );
    }

    if (showSignupPage) {
        return (
            <SignupPage
                onUserSignedUp={handleUserLoggedIn}
                onAdminSignedUp={handleAdminLoggedIn}
                onBack={handleShowLogin}
            />
        );
    }

    if (userChatActive && user) {
        return <ChatRoomPage roomId={user.uid} onBack={() => {
            // On back from chat room page, go to home page by hiding chat
            setUserChatActive(false);
        }} />;
    }

    if (isAdmin) {
        if (!selectedRoom) {
            // Select the first room automatically if available
            // Assuming AdminChatList component can provide rooms list or we can set a default room here
            // For now, we will select a dummy room id 'defaultRoom' if none selected
            setSelectedRoom('defaultRoom');
            return null; // Wait for state update
        } else {
            return <ChatPage roomId={selectedRoom} onBack={handleBackToList} onLogout={handleLogout} />;
        }
    }

    if (showAbout) {
        return <AboutPage onBack={handleAboutBack} />;
    }

    if (user && !userChatActive && !isAdmin) {
        return (
            <MoviesWebsite
                onLoginClick={handleShowLogin}
                onAdminLoginClick={handleShowLogin}
                onSignupClick={handleShowSignup}
                onAboutClick={handleAboutClick}
                user={user}
                onLogout={handleLogout}
                onUserChatOpen={() => setUserChatActive(true)}
            />
        );
    }

    return null;
};

export default App;

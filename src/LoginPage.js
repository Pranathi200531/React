import React, { useState } from 'react';
import UserAuth from './UserAuth';
import AdminAuth from './AdminAuth';

const LoginPage = ({ onUserLoggedIn, onAdminLoggedIn, onBack }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    const handleUserChanged = (userData) => {
        onUserLoggedIn(userData);
    };

    const handleAdminChanged = (adminData) => {
        onAdminLoggedIn(adminData);
    };

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <button onClick={() => setIsAdmin(false)} disabled={!isAdmin}>
                    User Login
                </button>
                <button onClick={() => setIsAdmin(true)} disabled={isAdmin}>
                    Admin Login
                </button>
            </div>
            {isAdmin ? (
                <AdminAuth onUserChanged={handleAdminChanged} />
            ) : (
                <UserAuth onUserChanged={handleUserChanged} />
            )}
            <button onClick={onBack} style={{ marginTop: '20px' }}>
                Back
            </button>
        </div>
    );
};

export default LoginPage;

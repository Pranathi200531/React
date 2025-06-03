import React, { useState } from 'react';
import UserAuth from './UserAuth';
import AdminAuth from './AdminAuth';

const SignupPage = ({ onUserSignedUp, onAdminSignedUp, onBack }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    const handleUserChanged = (userData) => {
        onUserSignedUp(userData);
    };

    const handleAdminChanged = (adminData) => {
        onAdminSignedUp(adminData);
    };

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <button onClick={() => setIsAdmin(false)} disabled={!isAdmin}>
                    User Sign Up
                </button>
                <button onClick={() => setIsAdmin(true)} disabled={isAdmin}>
                    Admin Sign Up
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

export default SignupPage;

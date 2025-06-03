import React from 'react';

const AuthSelectionPage = ({ onSelectLogin, onSelectSignup }) => {
    return (
        <div className="auth-selection-container">
            <h2>Welcome! Please choose an option:</h2>
            <div className="button-group">
                <button className="btn" onClick={onSelectLogin}>Login</button>
                <button className="btn" onClick={onSelectSignup}>Sign Up</button>
            </div>
        </div>
    );
};

export default AuthSelectionPage;

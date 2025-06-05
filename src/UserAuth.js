import React, { useState } from 'react';
import { userAuth, userDb } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import UserProfile from './UserProfile';
import './Auth.css';

const UserAuth = ({ onUserChanged, onSwitchToAdmin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState('Pranathi');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const toggleMode = () => {
    setError('');
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(userAuth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(userAuth, email, password);
        // Save user details in Firestore
        const user = userCredential.user;
        await setDoc(doc(userDb, 'users', user.uid), {
          userName,
          email: user.email,
          contactNo,
          gender,
          role: 'user',
          createdAt: new Date(),
        });
      }
      const user = userCredential.user;
      setLoggedInUser(user);
      onUserChanged({ user, userName, email, contactNo, gender, role: 'user' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleShowProfile = () => {
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleUserProfileUpdate = (updatedDetails) => {
    // Update loggedInUser or other state as needed
    setLoggedInUser({ ...loggedInUser, ...updatedDetails });
  };

  if (showProfile) {
    return <UserProfile onClose={handleCloseProfile} onUserProfileUpdate={handleUserProfileUpdate} />;
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'User Login' : 'User Sign Up'}</h2>
        {!isLogin && (
          <>
            <div className="input-group">
              <label htmlFor="userName">User Name</label>
              <input
                id="userName"
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="input-group">
              <label htmlFor="contactNo">Contact Number</label>
              <input
                id="contactNo"
                type="tel"
                required
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                placeholder="Enter your contact number"
              />
            </div>
            <div className="input-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </>
        )}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        {loggedInUser && !isLogin && (
          <button type="button" className="btn" onClick={handleShowProfile} style={{ marginTop: '10px' }}>
            Profile
          </button>
        )}
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span className="toggle-link" onClick={toggleMode}>
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </form>
      <div style={{ marginTop: '20px' }}>
        <button onClick={onSwitchToAdmin}>Admin Login</button>
      </div>
    </div>
  );
};

export default UserAuth;

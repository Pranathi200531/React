import React, { useEffect, useState } from 'react';
import { userAuth, userDb } from './firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';


const UserProfile = ({ onClose, onUserProfileUpdate }) => {
    const [userDetails, setUserDetails] = useState({
        userName: '',
        email: '',
        contactNo: '',
        gender: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const user = userAuth.currentUser;

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        const docRef = doc(userDb, 'users', user.uid);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setUserDetails(docSnap.data());
            } else {
                setUserDetails({
                    userName: '',
                    email: '',
                    contactNo: '',
                    gender: '',
                });
            }
            setLoading(false);
        }, (err) => {
            console.error('Error fetching user details:', err);
            setError('Failed to fetch user details.');
            setLoading(false);
        });
        return () => unsubscribe();
    }, [user]);

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        console.log('handleSave called');
        console.log('Current user:', user);
        console.log('User details to save:', userDetails);
        setError('');
        if (!user) {
            setError('User not authenticated.');
            console.error('User not authenticated.');
            return;
        }
        try {
            const docRef = doc(userDb, 'users', user.uid);
            await setDoc(docRef, userDetails, { merge: true });
            alert('Profile updated successfully.');
            if (onUserProfileUpdate) {
                onUserProfileUpdate(userDetails);
            }
            onClose();
            window.location.href = '/';
        } catch (err) {
            console.error('Error updating user profile:', err);
            setError('Failed to update profile: ' + err.message);
            alert('Failed to update profile: ' + err.message);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            {error && <p className="error">{error}</p>}
            <div className="input-group">
                <label htmlFor="userName">User Name</label>
                <input
                    id="userName"
                    name="userName"
                    type="text"
                    value={userDetails.userName || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={userDetails.email || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="contactNo">Contact Number</label>
                <input
                    id="contactNo"
                    name="contactNo"
                    type="tel"
                    value={userDetails.contactNo || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="gender">Gender</label>
                <select
                    id="gender"
                    name="gender"
                    value={userDetails.gender || ''}
                    onChange={handleChange}
                >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <button onClick={handleSave} className="btn">Save</button>
            <button onClick={onClose} className="btn" style={{ marginLeft: '10px' }}>Cancel</button>
            <button onClick={onClose} className="btn" style={{ marginLeft: '10px' }}>Back</button>
        </div>
    );
};

export default UserProfile;

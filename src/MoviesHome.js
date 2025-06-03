import React, { useState } from "react";
import { auth, database } from "./firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import "./Movies.css";

function MoviesHome({ onLoginSuccess, showAboutPage }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [language, setLanguage] = useState("English");
    const [error, setError] = useState("");
    const [userDetails, setUserDetails] = useState(null);

    const handleLogin = async () => {
        setError("");
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUserDetails(user);
            // Save preferred language to database
            await set(ref(database, 'users/' + user.uid), {
                email: user.email,
                language: language
            });
            onLoginSuccess(true);
        } catch (err) {
            setError(err.message);
            onLoginSuccess(false);
        }
    };

    const handleSignup = async () => {
        setError("");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUserDetails(user);
            // Save preferred language to database
            await set(ref(database, 'users/' + user.uid), {
                email: user.email,
                language: language
            });
            onLoginSuccess(true);
        } catch (err) {
            setError(err.message);
            onLoginSuccess(false);
        }
    };

    return (
        <div className="movies-container">
            {userDetails && <h2>Welcome, {userDetails.email}</h2>}
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <div className="movies-form">
                <label>Email:</label><br />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="movies-form">
                <label>Password:</label><br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="movies-form">
                <label>Preferred Movie Language:</label><br />
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="English">English</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Korean">Korean</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="Chinese">Chinese</option>
                </select>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button
                onClick={isLogin ? handleLogin : handleSignup}
                className="movies-button"
            >
                {isLogin ? "Login" : "Sign Up"}
            </button>
            <p style={{ marginTop: "10px" }}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
                    {isLogin ? "Sign Up" : "Login"}
                </button>
            </p>
            <button className="nav-button" onClick={showAboutPage}>About</button>
            {userDetails && (
                <div className="user-details">
                    <h3>User Details</h3>
                    <p>Email: {userDetails.email}</p>
                    <p>UID: {userDetails.uid}</p>
                </div>
            )}
        </div>
    );
}

export default MoviesHome;

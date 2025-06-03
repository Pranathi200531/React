import React from "react";

function AboutPage({ onBack }) {
    return (
        <div className="about-page">
            <h1>Welcome to Cinema Gala</h1>
            <p>
                This is a movie streaming platform inspired by Netflix.
                It showcases movies in multiple languages and provides a personalized experience.
            </p>
            <p>
                About the developer: I am a passionate software engineer with experience in building web applications using React and Firebase.
            </p>
            <button onClick={onBack} className="back-button">
                Back
            </button>
        </div>
    );
}

export default AboutPage;

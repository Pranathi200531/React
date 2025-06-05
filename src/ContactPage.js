import React, { useState } from "react";
import { userDb } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function ContactPage({ onBack, currentUser }) {
  const [name, setName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Please fill in all fields.');
      return;
    }
    setSending(true);
    setError(null);
    setSuccess(null);
    try {
      const messagesCol = collection(userDb, 'contactMessages');
      await addDoc(messagesCol, {
        name,
        email,
        message,
        createdAt: serverTimestamp(),
      });
      setSuccess('Message sent successfully!');
      setMessage('');
    } catch (err) {
      setError('Failed to send message: ' + err.message);
    }
    setSending(false);
  };

  return (
    <div className="contact-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <nav className="navbar" style={{ width: '100%', maxWidth: '600px' }}>
        <button className="back-button" onClick={onBack}>Back</button>
        <h2 style={{ textAlign: 'center' }}>Contact Us</h2>
      </nav>
      <main className="contact-main" style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <h3>Contact Information</h3>
        <p>Email: contact@moviesapp.com</p>
        <p>Phone: +1 234 567 8900</p>
        <p>Address: 123 Movie St, Film City, CA</p>
        <h3>Send us a message</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <label style={{ width: '100%', textAlign: 'left' }}>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={sending}
              style={{ width: '100%' }}
            />
          </label>
          <label style={{ width: '100%', textAlign: 'left' }}>
            Email:
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={sending}
              style={{ width: '100%' }}
            />
          </label>
          <label style={{ width: '100%', textAlign: 'left' }}>
            Message:
            <textarea
              name="message"
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={sending}
              style={{ width: '100%' }}
            />
          </label>
          <button type="submit" disabled={sending} style={{ alignSelf: 'center' }}>Send</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </main>
    </div>
  );
}

export default ContactPage;

// @ts-nocheck
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [fieldError, setFieldError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setError('');
        setFieldError('');
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setFieldError('Enter a valid email');
            return;
        }
        setLoading(true);
        try {
            await authService.forgotPassword(email);
            setMessage('If an account exists for this email, a reset link has been sent.');
        } catch (err) {
            setError(err.message || 'Failed to send reset link');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: '2rem' }}>
            <div style={{ maxWidth: '440px', width: '100%', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Forgot your password?</h2>
                <p style={{ marginTop: '-0.5rem', marginBottom: '1.5rem', color: '#666' }}>Enter your email and we'll send you a link to reset it.</p>

                {message && (
                    <div style={{ padding: '0.75rem', marginBottom: '1rem', backgroundColor: '#f4fff4', color: '#1a7f37', borderRadius: '4px', border: '1px solid #b4f1b4' }}>{message}</div>
                )}
                {error && (
                    <div style={{ padding: '0.75rem', marginBottom: '1rem', backgroundColor: '#fee', color: '#c33', borderRadius: '4px', border: '1px solid #fcc' }}>{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                        {fieldError && <div style={{ color: '#c33', fontSize: 12, marginTop: 6 }}>{fieldError}</div>}
                    </div>

                    <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'Sending...' : 'Send reset link'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <Link to="/login">Back to login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;



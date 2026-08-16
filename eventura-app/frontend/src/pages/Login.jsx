import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Extract a clean username from the email input (e.g. "nimraa@gmail.com" becomes "nimraa")
    const username = email.includes('@') ? email.split('@')[0] : (email || 'user');
    
    // Store user session with both email and name so the navbar updates instantly
    localStorage.setItem('user', JSON.stringify({ email: email || 'user@example.com', name: username }));
    localStorage.setItem('registered_user_name', username);
    
    // Broadcast storage event so Navbar updates immediately without reload
    window.dispatchEvent(new Event('storage'));

    setSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#0b0f19] px-4">
      <div className="w-full max-w-md p-8 bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl backdrop-blur-sm">
        <div className="text-center mb-8">
          <span className="p-3 bg-blue-600/20 text-blue-400 rounded-xl text-2xl inline-block mb-3">
            🔑
          </span>
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-1">Log in to manage your bookings and events</p>
        </div>

        {success && (
          <div className="mb-6 p-3 bg-green-950/80 border border-green-800/80 text-green-300 text-sm rounded-xl text-center">
            ✓ Logged in successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Email or Username
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. alex@example.com"
              className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/80 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/80 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 transition-all text-sm mt-2"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
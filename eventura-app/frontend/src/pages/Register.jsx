import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save user details and the specific name to localStorage keys that Navbar checks
    localStorage.setItem('user', JSON.stringify({ name, email }));
    localStorage.setItem('registered_user_name', name);
    
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
            ✨
          </span>
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-gray-400 text-sm mt-1">Join Eventura to discover and host events</p>
        </div>

        {success && (
          <div className="mb-6 p-3 bg-green-950/80 border border-green-800/80 text-green-300 text-sm rounded-xl text-center">
            ✓ Account registered successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Johnson"
              className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/80 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
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
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 transition-all text-sm mt-2 cursor-pointer"
          >
            Register Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
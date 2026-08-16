import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Mail, Lock, User, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import API from '../api';

export default function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const response = await API.post(endpoint, formData);

      const { token, user, message } = response.data;

      // Save Auth Token and User Details in localStorage
      localStorage.setItem('eventura_token', token);
      localStorage.setItem('eventura_user', JSON.stringify(user));

      // Update Global State
      setUser(user);
      setSuccessMessage(message || 'Authentication successful!');

      // Redirect home after 1 second
      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (error) {
      console.error('Auth Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Server connection error. Please ensure backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8">
        
        {/* Toggle Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 ${
              isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-4 h-4" /> Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 ${
              !isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-4 h-4" /> Register
          </button>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-slate-900">
            {isLogin ? 'Welcome Back to Eventura' : 'Create Your Account'}
          </h2>
          <p className="text-slate-500 text-xs mt-1">
            {isLogin ? 'Sign in to access your booked tickets' : 'Join to explore and book exclusive events'}
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert Box */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600" />
            <span>{successMessage} Redirecting...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name field (Register only) */}
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  required={!isLogin}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Role selection (Register only) */}
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Account Role</label>
              <div className="relative">
                <Shield className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition bg-white appearance-none"
                >
                  <option value="user">Attendee / Student (Book Tickets)</option>
                  <option value="admin">Organizer / Admin (Create & Manage Events)</option>
                </select>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

      </div>
    </div>
  );
}
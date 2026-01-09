import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../cms/CMSContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useCMS();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple password check - as requested by user
    if (password === 'filt') {
      login();
      navigate('/');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-charcoal mb-2">Administration</h1>
          <p className="text-charcoal-light font-light">Connectez-vous pour modifier le site</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal-light mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-sage/50 border border-white/10 rounded-lg text-charcoal focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-colors"
              placeholder="••••••••"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
              <SafeIcon icon={FiIcons.FiAlertCircle} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-clay text-paper font-medium py-3 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            <SafeIcon icon={FiIcons.FiLock} />
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../cms/CMSContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useCMS();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Identifiants incorrects ou erreur de connexion');
    } finally {
      setLoading(false);
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
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-sage/50 border border-white/10 rounded-lg text-charcoal focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-colors"
              placeholder="admin@exemple.com"
              autoFocus
              required
            />
          </div>

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
              required
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
            disabled={loading}
            className="w-full bg-clay text-paper font-medium py-3 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-paper"></span>
            ) : (
                <SafeIcon icon={FiIcons.FiLock} />
            )}
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

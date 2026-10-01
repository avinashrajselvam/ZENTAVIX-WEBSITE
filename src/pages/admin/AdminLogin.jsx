import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';
import './AdminLogin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Admin Login | Zentavix Portal';
    
    // Check if user is already logged in
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          navigate('/admin');
        }
      });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase is not configured yet. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data?.session) {
        navigate('/admin');
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials or login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-icon-wrap">
            <ShieldCheck size={28} color="#168BFF" />
          </div>
          <h2>Admin Portal</h2>
          <p>Sign in to manage client enquiries and leads</p>
        </div>

        {error && (
          <div className="admin-login-alert">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form className="admin-login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="admin-input-wrap">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                className="form-input with-icon"
                placeholder="admin@zentavix.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="admin-input-wrap">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                className="form-input with-icon"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full"
            disabled={loading}
            style={{ justifyContent: 'center', marginTop: '12px' }}
          >
            {loading ? 'Authenticating...' : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Zentavix Internal Security</p>
        </div>
      </div>
    </div>
  );
}

// src/components/SignupPage.jsx
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../AuthContext';

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim() || !repeatPassword.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== repeatPassword) {
      setError('Passwords do not match.');
      return;
    }
    login(email.trim());
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 2,
        py: 6,
        background: 'linear-gradient(135deg, #ede8ff 0%, #F4F2FA 60%, #f0ebff 100%)',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: { xs: 3, sm: 5 },
          border: '1px solid rgba(103,58,183,0.12)',
          boxShadow: '0 8px 40px rgba(103,58,183,0.12)',
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', mb: 0.5 }}>
            Create account 🚀
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Join MyApp and start sharing your posts
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            id="signup-email"
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            autoComplete="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="signup-password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            autoComplete="new-password"
            helperText="Minimum 6 characters"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="signup-repeat-password"
            label="Repeat Password"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            fullWidth
            autoComplete="new-password"
            error={repeatPassword.length > 0 && password !== repeatPassword}
            helperText={repeatPassword.length > 0 && password !== repeatPassword ? 'Passwords do not match' : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          <Button
            id="signup-submit"
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 1, py: 1.5, fontSize: '1rem', fontWeight: 700 }}
          >
            Sign Up
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center', color: 'text.secondary' }}>
          Already have an account?{' '}
          <Link component={RouterLink} to="/login" underline="hover" sx={{ color: 'primary.main', fontWeight: 600 }}>
            Log in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

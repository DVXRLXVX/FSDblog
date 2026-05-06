// src/components/TopBar.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../AuthContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Users', path: '/users' },
  { label: 'About', path: '/about' },
];

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar sx={{ gap: 0.5 }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          onClick={() => navigate('/')}
          sx={{
            fontWeight: 800,
            letterSpacing: '-0.5px',
            cursor: 'pointer',
            mr: 3,
            fontSize: '1.3rem',
          }}
        >
          ✦ MyApp
        </Typography>

        {/* Nav Links */}
        {navLinks.map(({ label, path }) => (
          <Button
            key={path}
            color="inherit"
            onClick={() => navigate(path)}
            sx={{
              fontWeight: location.pathname === path ? 700 : 400,
              opacity: location.pathname === path ? 1 : 0.85,
              borderBottom: location.pathname === path ? '2px solid rgba(255,255,255,0.8)' : '2px solid transparent',
              borderRadius: 0,
              px: 1.5,
              minWidth: 'auto',
              '&:hover': { opacity: 1, background: 'rgba(255,255,255,0.1)' },
            }}
          >
            {label}
          </Button>
        ))}

        <Box sx={{ flexGrow: 1 }} />

        {/* Auth section */}
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/new-post')}
              sx={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                '&:hover': {
                  background: 'rgba(255,255,255,0.3)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                },
                boxShadow: 'none',
              }}
            >
              New Post
            </Button>
            <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.3)', mx: 0.5 }} />
            <Chip
              label={user}
              size="small"
              sx={{
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                fontWeight: 600,
                maxWidth: 180,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            />
            <Button
              color="inherit"
              endIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ opacity: 0.85, '&:hover': { opacity: 1 } }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => navigate('/login')}
            sx={{
              borderColor: 'rgba(255,255,255,0.5)',
              color: '#fff',
              '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,0.1)' },
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
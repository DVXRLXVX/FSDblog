// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './AuthContext';
import TopBar from './components/TopBar';
import Feed from './components/Feed';
import UsersPage from './components/UsersPage';
import UserPostsFeed from './components/UserPostsFeed';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import NewPostPage from './components/NewPostPage';
import AboutPage from './components/AboutPage';
import ProtectedRoute from './components/ProtectedRoute';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F4F2FA',
      paper: '#ffffff',
    },
    primary: {
      main: '#673ab7',
      light: '#CB94F7',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7C4DFF',
    },
    text: {
      primary: '#1a1a2e',
      secondary: '#6B6B7B',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(103, 58, 183, 0.08)',
          background: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #673ab7 0%, #9c6fe4 100%)',
          boxShadow: '0 4px 14px rgba(103, 58, 183, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5528a5 0%, #8b5fd3 100%)',
            boxShadow: '0 6px 20px rgba(103, 58, 183, 0.45)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0 2px 20px rgba(103, 58, 183, 0.15)',
          background: 'linear-gradient(90deg, #673ab7 0%, #9c6fe4 100%)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            background: 'linear-gradient(135deg, #673ab7 0%, #9c6fe4 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.9rem',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <TopBar />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/user-posts/:userId" element={<UserPostsFeed />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/new-post"
              element={
                <ProtectedRoute>
                  <NewPostPage />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
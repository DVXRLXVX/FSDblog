// src/components/AboutPage.jsx
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

const features = [
  { emoji: '📰', label: 'Social Feed', desc: 'Browse posts from the community with infinite load-more pagination.' },
  { emoji: '👥', label: 'Users Directory', desc: 'Explore all users, search by email, and view their post history.' },
  { emoji: '🔐', label: 'Authentication', desc: 'Sign up or log in to unlock post creation features.' },
  { emoji: '✍️', label: 'Post Creation', desc: 'Write and publish your own posts to share with everyone.' },
];

const stack = ['React 19', 'Material UI v9', 'React Router v6', 'Axios', 'JSONPlaceholder API', 'Vite'];

export default function AboutPage() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        bgcolor: 'background.default',
        background: 'linear-gradient(135deg, #f0ebff 0%, #F4F2FA 60%, #ede8ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 720 }}>
        {/* Hero Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 6 },
            textAlign: 'center',
            border: '1px solid rgba(103,58,183,0.12)',
            boxShadow: '0 8px 40px rgba(103,58,183,0.12)',
            mb: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #673ab7, #9c6fe4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            ✦ MyApp
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, mb: 3 }}>
            A modern social blog platform built with React & MUI
          </Typography>
          <Divider sx={{ mb: 3, borderColor: 'rgba(103,58,183,0.1)' }} />
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            MyApp is a full-stack inspired social blogging platform where users can discover posts, explore community members, and share their own stories.
            Built as a university assignment demonstrating modern React patterns, MUI design systems, and RESTful API integration.
          </Typography>
        </Paper>

        {/* Features Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2,
            mb: 3,
          }}
        >
          {features.map(({ emoji, label, desc }) => (
            <Paper
              key={label}
              elevation={0}
              sx={{
                p: 3,
                border: '1px solid rgba(103,58,183,0.1)',
                boxShadow: '0 4px 20px rgba(103,58,183,0.07)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 30px rgba(103,58,183,0.15)',
                },
              }}
            >
              <Typography variant="h4" sx={{ mb: 1 }}>{emoji}</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
                {label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {desc}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Tech Stack */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: '1px solid rgba(103,58,183,0.1)',
            boxShadow: '0 4px 20px rgba(103,58,183,0.07)',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
            🛠 Tech Stack
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {stack.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                sx={{
                  background: 'linear-gradient(135deg, #f0ebff, #ede8ff)',
                  color: 'primary.main',
                  fontWeight: 600,
                  border: '1px solid rgba(103,58,183,0.15)',
                }}
              />
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

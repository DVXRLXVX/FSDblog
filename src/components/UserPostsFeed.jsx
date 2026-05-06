// src/components/UserPostsFeed.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SinglePost from './SinglePost';
import { fetchPostsByUser, fetchUsers } from '../api';

export default function UserPostsFeed() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [allPosts, allUsers] = await Promise.all([
          fetchPostsByUser(userId),
          fetchUsers(1, 10),
        ]);
        setPosts(allPosts);
        // Try to find the user name
        const found = allUsers.find((u) => String(u.id) === String(userId));
        setUser(found || null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  const getInitials = (name) =>
    name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        bgcolor: 'background.default',
        background: 'linear-gradient(135deg, #f8f5ff 0%, #F4F2FA 100%)',
        py: 5,
        px: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
        {/* Back button */}
        <Button
          id="back-to-users"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/users')}
          sx={{ mb: 3, color: 'primary.main', fontWeight: 600, px: 0 }}
        >
          Back to Users
        </Button>

        {/* User header card */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            border: '1px solid rgba(103,58,183,0.12)',
            boxShadow: '0 4px 24px rgba(103,58,183,0.08)',
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              background: 'linear-gradient(135deg, #673ab7, #9c6fe4)',
              fontSize: '1.2rem',
              fontWeight: 700,
            }}
          >
            {user ? getInitials(user.name) : `U${userId}`}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
              {user ? user.name : `User #${userId}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email || `user${userId}@example.com`} • {posts.length} post{posts.length !== 1 ? 's' : ''}
            </Typography>
          </Box>
        </Paper>

        {/* Posts grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : posts.length === 0 ? (
          <Typography align="center" color="text.secondary" sx={{ py: 8 }}>
            No posts found for this user.
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 3,
            }}
          >
            {posts.map((post) => (
              <SinglePost key={post.id} {...post} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

// src/components/NewPostPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import CreateIcon from '@mui/icons-material/Create';
import { createPost } from '../api';
import { useAuth } from '../AuthContext';

export default function NewPostPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePublish = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) { setError('Title is required.'); return; }
    if (!body.trim()) { setError('Body is required.'); return; }

    setLoading(true);
    try {
      await createPost(title.trim(), body.trim(), user || 'you@myapp.com');
      navigate('/');
    } catch {
      setError('Failed to publish post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        bgcolor: 'background.default',
        background: 'linear-gradient(135deg, #f0ebff 0%, #F4F2FA 100%)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        py: 6,
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 680,
          p: { xs: 3, sm: 5 },
          border: '1px solid rgba(103,58,183,0.12)',
          boxShadow: '0 8px 40px rgba(103,58,183,0.12)',
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #673ab7, #9c6fe4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CreateIcon sx={{ color: '#fff', fontSize: 22 }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', lineHeight: 1.2 }}>
              Create New Post
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Share your thoughts with the community
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: 'rgba(103,58,183,0.1)' }} />

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handlePublish}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            id="new-post-title"
            label="Post Title"
            placeholder="Write a compelling title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            inputProps={{ maxLength: 120 }}
            helperText={`${title.length}/120 characters`}
          />

          <TextField
            id="new-post-body"
            label="Post Body"
            placeholder="Share your story, ideas, or thoughts..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            fullWidth
            multiline
            rows={8}
            inputProps={{ maxLength: 2000 }}
            helperText={`${body.length}/2000 characters`}
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 1 }}>
            <Button
              id="new-post-cancel"
              variant="outlined"
              color="primary"
              onClick={() => navigate('/')}
              disabled={loading}
              sx={{ px: 3, py: 1.2 }}
            >
              Cancel
            </Button>
            <Button
              id="new-post-publish"
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <CreateIcon />}
              sx={{ px: 4, py: 1.2, fontWeight: 700, fontSize: '0.95rem' }}
            >
              {loading ? 'Publishing...' : 'Publish'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

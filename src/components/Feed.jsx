import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import SinglePost from './SinglePost';
import { fetchPosts } from '../api';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const localPosts = posts.filter(p => p.isLocal);

  const loadPosts = async (nextPage = 1) => {
    setIsLoading(true);
    try {
      const newPosts = await fetchPosts(nextPage, 10);
      if (Array.isArray(newPosts) && newPosts.length > 0) {
        setPosts(prev => nextPage === 1 ? newPosts : [...prev, ...newPosts]);
      } else if (nextPage === 1) {
        setPosts([]);
      }
      setPage(nextPage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(1);
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4, px: 3 }}>
      {/* Section header for local posts */}
      {localPosts.length > 0 && (
        <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 2 }}>
          <Chip
            label={`✨ ${localPosts.length} new post${localPosts.length > 1 ? 's' : ''} you published`}
            sx={{
              background: 'linear-gradient(135deg, #673ab7, #9c6fe4)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.82rem',
              px: 1,
            }}
          />
        </Box>
      )}

      {/* CSS Grid: always exactly 2 equal columns */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 3,
          maxWidth: 1100,
          mx: 'auto',
        }}
      >
        {posts.length === 0 && !isLoading ? (
          <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', color: 'text.secondary', mt: 4 }}>
            <Typography variant="body1">No posts found.</Typography>
          </Box>
        ) : (
          posts.map((post) => (
            <SinglePost key={post.id} {...post} />
          ))
        )}
      </Box>

      {/* Load More / Spinner */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        {isLoading ? (
          <CircularProgress color="primary" />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => loadPosts(page + 1)}
            sx={{ minWidth: 160, borderRadius: 8, py: 1.2, fontSize: '1rem', fontWeight: 700 }}
          >
            Load More
          </Button>
        )}
      </Box>
    </Box>
  );
}
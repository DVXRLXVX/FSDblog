// src/components/UsersPage.jsx
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArticleIcon from '@mui/icons-material/Article';
import { fetchUsers, fetchPostCountByUser } from '../api';

export default function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [postCounts, setPostCounts] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingCounts, setLoadingCounts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const loadUsers = useCallback(async (nextPage = 1) => {
    setLoading(true);
    try {
      const newUsers = await fetchUsers(nextPage, 10);
      if (newUsers.length < 10) setHasMore(false);
      setUsers((prev) => nextPage === 1 ? newUsers : [...prev, ...newUsers]);
      setPage(nextPage);

      // Fetch post counts for new users
      setLoadingCounts(true);
      const counts = {};
      await Promise.all(
        newUsers.map(async (u) => {
          counts[u.id] = await fetchPostCountByUser(u.id);
        })
      );
      setPostCounts((prev) => ({ ...prev, ...counts }));
    } finally {
      setLoading(false);
      setLoadingCounts(false);
    }
  }, []);

  useEffect(() => {
    loadUsers(1);
  }, [loadUsers]);

  // Filter users by email
  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <Box sx={{ maxWidth: 900, mx: 'auto' }}>
        {/* Page Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #673ab7, #9c6fe4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PeopleAltIcon sx={{ color: '#fff', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', lineHeight: 1.2 }}>
              Community
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Browse and discover users
            </Typography>
          </Box>
        </Box>

        {/* Search Bar */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            border: '1px solid rgba(103,58,183,0.12)',
            boxShadow: '0 4px 20px rgba(103,58,183,0.08)',
          }}
        >
          <TextField
            id="users-search"
            fullWidth
            placeholder="Search users by email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'primary.main' }} />
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {/* Users Table */}
        <Paper
          elevation={0}
          sx={{
            border: '1px solid rgba(103,58,183,0.12)',
            boxShadow: '0 4px 24px rgba(103,58,183,0.08)',
            overflow: 'hidden',
            mb: 3,
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: 3 }}>User</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Niche</TableCell>
                  <TableCell align="center">Posts</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading && filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                      <CircularProgress color="primary" />
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                      No users found matching &quot;{searchQuery}&quot;
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user, idx) => (
                    <TableRow
                      key={user.id}
                      sx={{
                        bgcolor: idx % 2 === 0 ? '#fff' : 'rgba(103,58,183,0.02)',
                        transition: 'background 0.15s',
                        '&:hover': { bgcolor: 'rgba(103,58,183,0.05)' },
                      }}
                    >
                      {/* User avatar + name */}
                      <TableCell sx={{ pl: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar
                            sx={{
                              width: 36,
                              height: 36,
                              background: 'linear-gradient(135deg, #673ab7, #9c6fe4)',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                            }}
                          >
                            {getInitials(user.name)}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            {user.name}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Email */}
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                          {user.email}
                        </Typography>
                      </TableCell>

                      {/* Niche */}
                      <TableCell>
                        <Chip
                          label={`${user.nicheEmoji} ${user.niche}`}
                          size="small"
                          sx={{
                            background: 'rgba(103,58,183,0.08)',
                            color: 'primary.main',
                            fontWeight: 600,
                            borderRadius: '8px'
                          }}
                        />
                      </TableCell>

                      {/* Post count */}
                      <TableCell align="center">
                        {loadingCounts && postCounts[user.id] === undefined ? (
                          <CircularProgress size={16} color="primary" />
                        ) : (
                          <Chip
                            icon={<ArticleIcon sx={{ fontSize: '14px !important' }} />}
                            label={postCounts[user.id] ?? '—'}
                            size="small"
                            sx={{
                              background: 'linear-gradient(135deg, #f0ebff, #ede8ff)',
                              color: 'primary.main',
                              fontWeight: 700,
                              border: '1px solid rgba(103,58,183,0.15)',
                            }}
                          />
                        )}
                      </TableCell>

                      {/* See Posts button */}
                      <TableCell align="center">
                        <Button
                          id={`see-posts-${user.id}`}
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => navigate(`/user-posts/${user.id}`)}
                          sx={{ px: 2.5, py: 0.7, fontSize: '0.78rem' }}
                        >
                          See Posts
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Load More */}
        {!searchQuery && hasMore && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {loading ? (
              <CircularProgress color="primary" />
            ) : (
              <Button
                id="users-load-more"
                variant="contained"
                color="primary"
                onClick={() => loadUsers(page + 1)}
                sx={{ minWidth: 160, py: 1.2, fontWeight: 700 }}
              >
                Load More
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

export default function SinglePost({ title, email, body }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Card
      elevation={0}
      sx={{
        // Width is controlled by CSS Grid parent (repeat(2, 1fr)) — no width needed here
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        background: '#ffffff',
        transition: 'box-shadow 0.2s, transform 0.2s',
        '&:hover': {
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        {/* Title — bold, dark, wraps naturally */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#1a1a2e',
            mb: 0.5,
            lineHeight: 1.4,
            wordBreak: 'break-word',
          }}
        >
          {title}
        </Typography>

        {/* Email — styled like a link */}
        <Typography
          variant="body2"
          sx={{
            color: '#6C63FF',
            fontWeight: 500,
            mb: 2,
            fontSize: '0.82rem',
          }}
        >
          {email}
        </Typography>

        {/* Body — truncated unless expanded */}
        <Typography
          variant="body2"
          sx={{
            color: '#555',
            lineHeight: 1.7,
            wordBreak: 'break-word',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {body}
        </Typography>

        {/* "..." indicator when truncated is handled automatically by webkit-line-clamp */}
      </CardContent>

      {/* Read More button always at the bottom */}
      <CardActions sx={{ px: 3, pb: 2.5, pt: 0 }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => setModalOpen(true)}
          sx={{
            borderRadius: '999px',
            px: 3,
            py: 0.8,
            fontWeight: 600,
            fontSize: '0.82rem',
            textTransform: 'none',
            background: 'linear-gradient(135deg, #7C4DFF 0%, #CB94F7 100%)',
            boxShadow: '0 3px 10px rgba(124, 77, 255, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #6a3de8 0%, #b87ef0 100%)',
              boxShadow: '0 5px 16px rgba(124, 77, 255, 0.4)',
            },
          }}
        >
          Read More
        </Button>
      </CardActions>

      {/* Floating Modal for full post content */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 1,
            height: '60vh',
            minHeight: '60vh',
            maxHeight: '60vh',
          }
        }}
      >
        <DialogTitle sx={{ pr: 6, fontWeight: 800, color: '#1a1a2e', lineHeight: 1.4 }}>
          {title}
          <IconButton
            aria-label="close"
            onClick={() => setModalOpen(false)}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: 'rgba(0,0,0,0.05)' }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ color: '#6C63FF', fontWeight: 600 }}>
              {email}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
            {body}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1.5 }}>
          <Button
            onClick={() => setModalOpen(false)}
            variant="contained"
            sx={{
              borderRadius: '999px',
              px: 4,
              background: 'linear-gradient(135deg, #7C4DFF 0%, #CB94F7 100%)',
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

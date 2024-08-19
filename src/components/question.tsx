import { memo } from 'react';
import { Box, Typography, IconButton } from '@mui/joy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
  question?: string;
  onClick?: () => void;
  isExpanded?: boolean;
};

const Question = memo(({ question, onClick, isExpanded }: Props) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0',
        backgroundColor: 'transparent',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          fontStyle: 'italic',
          textAlign: 'left',
          fontFamily: 'serif',
          fontSize: '1.75rem',
          lineHeight: 1.2,
        }}
      >
        {question}
      </Typography>
      <IconButton
        size="small"
        sx={{
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <ExpandMoreIcon />
      </IconButton>
    </Box>
  );
});

export default Question;

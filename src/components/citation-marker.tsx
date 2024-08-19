import { Typography } from '@mui/joy';

type CitationMarkerProps = {
  number: number;
  onClick: (index: number) => void;
};

const CitationMarker = ({ number, onClick }: CitationMarkerProps) => {
  const handleClick = () => {
    onClick(number);
  };

  return (
    <Typography
      level="body-xs"
      component="span"
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        color: '#0077cc',
        textDecoration: 'underline',
        marginLeft: '0.2rem',
        verticalAlign: 'super'
      }}
    >
      [{number}]
    </Typography>
  );
};

export default CitationMarker;

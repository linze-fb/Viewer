import { Box, Link, Typography } from '@mui/joy';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Citation } from '../model/answer';

type Props = {
  citation: Citation;
  index: number;
  showSnippet: boolean;
  toggleSnippet: () => void;
};

const CitationItem = ({ citation, index, showSnippet, toggleSnippet }: Props) => {
  const {
    href,
    title,
    journal_name,
    dt_published,
    authors_string,
    publication_info_string,
  } = citation.metadata.citation_detail;

  const publicationDate = new Date(dt_published).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  const parsedSnippet = citation.metadata.snippet_text.split(/\n(?!.*\n)/)[1]?.trim() || '';

  return (
    <Box id={`citation-${index}`} sx={{ marginBottom: '1.5em', display: 'flex', alignItems: 'flex-start' }}>
      <Typography
        component="span"
        sx={{
          fontSize: '0.875rem',
          fontWeight: 'bold',
          marginRight: '0.5rem',
        }}
      >
        {index}.
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Typography component="div" sx={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
          <Link href={href} target="_blank" rel="noopener noreferrer" underline="hover">
            <strong>{title}</strong>
          </Link>. {authors_string}. <em>{journal_name}</em>. {publicationDate}; {publication_info_string}.
          {parsedSnippet && (
            <Typography
              component="span"
              onClick={toggleSnippet}
              sx={{
                cursor: 'pointer',
                color: '#0077cc',
                marginLeft: '0.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '0.875rem',
              }}
            >
              More {showSnippet ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            </Typography>
          )}
        </Typography>
        <Collapse in={showSnippet} timeout="auto" unmountOnExit>
          <Typography sx={{ mt: 1, fontStyle: 'italic', fontSize: '0.875rem' }}>
            {parsedSnippet}
          </Typography>
        </Collapse>
      </Box>
    </Box>
  );
};

export default CitationItem;

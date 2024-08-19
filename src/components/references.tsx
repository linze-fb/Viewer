import { useRef, useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/joy';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Citation } from '../model/answer';
import CitationItem from './citation-item';

type ReferencesProps = {
  citationsArray: Citation[];
  highlightedIndex: number | null;
  isExpanded: boolean;
  onToggleExpand: () => void;
};

const References = ({ citationsArray, highlightedIndex, isExpanded, onToggleExpand }: ReferencesProps) => {
  const citationRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());
  const [snippetStates, setSnippetStates] = useState<Map<number, boolean>>(new Map());

  useEffect(() => {
    if (highlightedIndex !== null && isExpanded) {
      const citationElement = citationRefs.current.get(highlightedIndex);
      if (citationElement) {
        citationElement.style.backgroundColor = '#e0f7fa';
        setTimeout(() => {
          citationElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
        setTimeout(() => {
          citationElement.style.backgroundColor = 'transparent';
        }, 1500);
      }
    }
  }, [highlightedIndex, isExpanded]);

  const toggleSnippet = (index: number) => {
    setSnippetStates((prev) => {
      const newStates = new Map(prev);
      newStates.set(index, !newStates.get(index));
      return newStates;
    });
  };

  return (
    <Box>
      <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 0',
        }}
        onClick={onToggleExpand}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 'bold',
          }}>
          References
        </Typography>
        <IconButton size="small" sx={{
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}>
          <ExpandMoreIcon />
        </IconButton>
      </Box>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box sx={{ paddingLeft: '1rem', paddingTop: '0.5rem' }}>
          {citationsArray.map((citation, index) => (
            <Box
              key={index}
              ref={(ele) => citationRefs.current.set(index + 1, ele)}
              sx={{
                mb: 1.5,
                fontSize: '0.875rem',
                backgroundColor: highlightedIndex === index + 1 ? '#f0f0f0' : 'transparent',
                transition: 'background-color 0.3s',
              }}
            >
              <CitationItem
                citation={citation}
                index={index + 1}
                showSnippet={snippetStates.get(index + 1) || false}
                toggleSnippet={() => toggleSnippet(index + 1)}
              />
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default References;

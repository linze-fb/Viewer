import { memo, useMemo, useState, Fragment } from 'react';
import { Box, Typography, Divider, Card } from '@mui/joy';
import Collapse from '@mui/material/Collapse';
import Answer, { Citation } from '../model/answer';
import Question from './question';
import References from './references';
import CitationMarker from './citation-marker';

type Props = {
  answer: Answer;
  isExpanded: boolean;
  onToggleExpand: () => void;
};

const QuestionAndAnswer = memo(({ answer, isExpanded, onToggleExpand }: Props) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [isReferencesExpanded, setIsReferencesExpanded] = useState(false);

  const { citationMap, citations } = useMemo(() => {
    const citationMap = new Map<number, number>();
    const citations = new Map<number, Citation>();
    let counter = 1;

    answer.output.articlesection_set.forEach((section) => {
      section.articleparagraph_set.forEach((paragraph) => {
        paragraph.articlespan_set.forEach((span) => {
          span.citations.forEach((citation) => {
            const pmid = citation.metadata.citation_detail.pmid;
            if (!citationMap.has(pmid)) {
              citationMap.set(pmid, counter);
              citations.set(pmid, citation);
              counter += 1;
            }
          });
        });
      });
    });

    return { citationMap, citations };
  }, [answer]);

  // Sort the citations in order of appearance and remove duplicates
  const cleanedSections = useMemo(() => {
    return answer.output.articlesection_set.map((section) =>
      section.articleparagraph_set.map((paragraph) =>
        paragraph.articlespan_set.map((span) => {
          const citationNumbers = span.citations.map((citation) => {
            const pmid = citation.metadata.citation_detail.pmid;
            return citationMap.get(pmid);
          });

          const sortedUniqueCitationNumbers = Array.from(
            new Set(citationNumbers)
          ).sort((a, b) => (a ?? 0) - (b ?? 0));

          return {
            text: span.text,
            citationNumbers: sortedUniqueCitationNumbers,
            citations: span.citations,
          };
        })
      )
    );
  }, [answer, citationMap]);

  const citationsArray = Array.from(citations.values());

  // When clicking on a citation marker, the references section should expand and the corresponding citation highlighted
  const handleMarkerClick = (index: number) => {
    setHighlightedIndex(index);
    setIsReferencesExpanded(true);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        padding: '2rem',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        gap: '0',
      }}
    >
      <Question question={answer.question} onClick={onToggleExpand} isExpanded={isExpanded} />
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box sx={{
          mt: 4,
          borderTop: '1px solid #ddd',
        }}>
          {cleanedSections.map((section, sectionIndex) => (
            <Box key={sectionIndex} component="section" sx={{ mb: 2 }}>
              {section.map((paragraph, paragraphIndex) => (
                <Typography key={paragraphIndex} component="p" sx={{ mb: 1.5 }}>
                  {paragraph.map((span, spanIndex) => (
                    <Fragment key={spanIndex}>
                      <Box
                        component="span"
                        dangerouslySetInnerHTML={{ __html: span.text }}
                        sx={{ display: 'inline' }}
                      />
                      {span.citationNumbers.map((number, index) => (
                        <CitationMarker
                          key={index}
                          number={number!}
                          onClick={handleMarkerClick}
                        />
                      ))}
                    </Fragment>
                  ))}
                </Typography>
              ))}
            </Box>
          ))}
          <Divider sx={{ my: 3 }} />
          <References
            citationsArray={citationsArray}
            highlightedIndex={highlightedIndex}
            isExpanded={isReferencesExpanded}
            onToggleExpand={() => {
              setIsReferencesExpanded((prev) => !prev);
              setHighlightedIndex(null);
            }}
          />
        </Box>
      </Collapse>
    </Card>
  );
});

export default QuestionAndAnswer;

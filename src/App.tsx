import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import CircularProgress from '@mui/joy/CircularProgress';
import { Box, Input, Button } from '@mui/joy';
import QuestionAndAnswer from './components/question-and-answer';
import Answer from './model/answer';
import { data } from './model/data';

const App = () => {
  const [answerArray, setAnswerArray] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const lastAnswerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    // Simulate a fetch, not loading directly from source due to CORS
    const simulatedFetch = new Promise<void>((resolve) => {
      setTimeout(() => {
        setAnswerArray((prevDataArray) => [...prevDataArray, data]);
        setExpandedIndex(answerArray.length);
        resolve();
      }, 1000);
    });

    const minimumDelay = new Promise<void>((resolve) => setTimeout(resolve, 1000));

    try {
      await Promise.all([simulatedFetch, minimumDelay]);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: '#fff',
          padding: '1rem 2rem',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <Input
          placeholder="What is the latest standard of care for atopic dermatitis?"
          variant="outlined"
          fullWidth
          disabled
          sx={{
            maxWidth: '800px',
            cursor: 'not-allowed',
          }}
        />
        <Button
          variant="solid"
          onClick={fetchData}
          sx={{
            cursor: 'pointer',
          }}
        >
          Ask
        </Button>
      </Box>


      <Box sx={{ marginTop: '1rem' }}>
        {answerArray.map((answer, answerIndex) => (
          <Box
            key={answerIndex}
            ref={answerIndex === answerArray.length - 1 ? lastAnswerRef : null}
            sx={{ marginBottom: '1.5rem' }}
          >
            <QuestionAndAnswer
              answer={answer}
              isExpanded={expandedIndex === answerIndex}
              onToggleExpand={() => setExpandedIndex(answerIndex === expandedIndex ? null : answerIndex)}
            />
          </Box>
        ))}
      </Box>

      {loading && (
        <div className="loading-container">
          <CircularProgress />
        </div>
      )}
    </Box>
  );
};

export default App;

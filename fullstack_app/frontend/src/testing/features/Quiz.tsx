import { Box, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Matching from "./Matching";
import Sorting from "./Sorting";
import SingleChoice from "./SingleChoice";
import MultiChoice from "./MultiChoice";
import { RootState } from '../../store';

interface QuizProps { data: any[]; }

function Quiz({ data }: QuizProps) {
  const [results, setResults] = useState<{ correct: number; total: number }[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const lists = useSelector((state: RootState) => state.lists.lists);

  const handleCheck = () => {
    const newResults = data.map((item, index) => {
      const currentList = lists[index] || [];
      let correct = 0;
      if (item.type === "M") {
        item.tasks.forEach((task: any, ti: number) => {
          if (ti < currentList.length && currentList[ti] === task.answer) correct++;
        });
      } else if (item.type === "S") {
        item.tasks.forEach((task: any) => {
          const idx = currentList.indexOf(task.question);
          if (idx !== -1 && String(idx + 1) === task.answer) correct++;
        });
      } else if (item.type === "C") {
        if (currentList.length > 0 && currentList[0] === item.tasks[0].answer) correct = 1;
      } else if (item.type === "R") {
        const userAnswers = [...currentList].sort().join('|');
        const correctAnswers = item.tasks[0].answer.split('|').sort().join('|');
        if (userAnswers === correctAnswers) correct = 1;
      }
      return { correct, total: item.type === "C" || item.type === "R" ? 1 : item.tasks.length };
    });
    setResults(newResults);
    setShowResults(true);
  };

  const handleReset = () => {
    setResults([]);
    setShowResults(false);
    setResetKey(prev => prev + 1);
  };

  const renderTask = (item: any, index: number) => {
    switch (item.type) {
      case "M": return <Matching index={index} tasks={item.tasks} resetKey={resetKey} />;
      case "S": return <Sorting index={index} tasks={item.tasks} resetKey={resetKey} />;
      case "C": return <SingleChoice index={index} tasks={item.tasks} resetKey={resetKey} />;
      case "R": return <MultiChoice index={index} tasks={item.tasks} resetKey={resetKey} />;
      default: return null;
    }
  };

  return (
    <Container maxWidth="md">
      <div key={resetKey}>
        {data.map((item: any, index: number) => (
          <Box key={item.id} component="section" sx={{ m: 2, p: 2 }}>
            <Typography variant="h5" gutterBottom>{index + 1}. {item.title}</Typography>
            {renderTask(item, index)}
          </Box>
        ))}
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button variant="contained" onClick={handleCheck}>Проверить</Button>
        <Button variant="contained" onClick={handleReset}>Начать снова</Button>
      </Box>
      {showResults && (
        <Box sx={{ mt: 4, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom align="center">Результаты тестирования</Typography>
          {results.map((r, i) => (
            <Typography key={i} variant="body1" sx={{ mt: 1 }}>Задание {i + 1}: верно {r.correct} из {r.total}</Typography>
          ))}
          <Typography variant="h6" sx={{ mt: 2 }} align="center">
            Итого: {results.reduce((s, r) => s + r.correct, 0)} из {results.reduce((s, r) => s + r.total, 0)}
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Quiz;
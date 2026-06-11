import { Box, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { quiz } from "../quizData";
import Matching from "./Matching";
import Sorting from "./Sorting";
import { RootState } from '../../store';

function Quiz() {
    const [results, setResults] = useState<{ correct: number; total: number }[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [resetKey, setResetKey] = useState(0);
    const lists = useSelector((state: RootState) => state.lists.lists);

    const handleCheck = () => {
        const newResults = quiz.map((item, index) => {
            const currentList = lists[index] || [];
            let correct = 0;

            if (item.type === "M") {
                item.tasks.forEach((task, taskIndex) => {
                    if (taskIndex < currentList.length && currentList[taskIndex] === task.answer) {
                        correct++;
                    }
                });
            } else if (item.type === "S") {
                item.tasks.forEach((task) => {
                    const currentIndex = currentList.indexOf(task.question);
                    if (currentIndex !== -1 && String(currentIndex + 1) === task.answer) {
                        correct++;
                    }
                });
            }

            return { correct, total: item.tasks.length };
        });
        setResults(newResults);
        setShowResults(true);
    };

    const handleReset = () => {
        setResults([]);
        setShowResults(false);
        setResetKey(prev => prev + 1);
    };

    return (
        <Container maxWidth="md">
            <div key={resetKey}>
                {quiz.map((item, index) => (
                    <Box key={item.id} component="section" sx={{ m: 2, p: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            {index + 1}. {item.title}
                        </Typography>
                        {item.type === "M" ? (
                            <Matching index={index} tasks={item.tasks} resetKey={resetKey} />
                        ) : (
                            <Sorting index={index} tasks={item.tasks} resetKey={resetKey} />
                        )}
                    </Box>
                ))}
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button variant="contained" onClick={handleCheck}>Проверить</Button>
                <Button variant="contained" onClick={handleReset}>Начать снова</Button>
            </Box>
            {showResults && (
                <Box sx={{ mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '5px' }}>
                    <Typography variant="h5" gutterBottom align="center">
                        Результаты тестирования
                    </Typography>
                    {results.map((result, index) => (
                        <Typography key={index} variant="body1" sx={{ mt: 1 }}>
                            Задание {index + 1}: верно {result.correct} из {result.total}
                        </Typography>
                    ))}
                    <Typography variant="h6" sx={{ mt: 2 }} align="center">
                        Итого: {results.reduce((sum, r) => sum + r.correct, 0)} из{' '}
                        {results.reduce((sum, r) => sum + r.total, 0)}
                    </Typography>
                </Box>
            )}
        </Container>
    );
}

export default Quiz;
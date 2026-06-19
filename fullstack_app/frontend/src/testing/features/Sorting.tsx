import { Box } from '@mui/material';
import { tTasks } from "../quizData";
import SortableList from "./SortableList";
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from './quizSlice';

interface ComponentProps { index: number; tasks: tTasks; resetKey: number; }

function Sorting({ index, tasks, resetKey }: ComponentProps) {
  const dispatch = useDispatch();
  const questions = useMemo(() => {
    const arr = tasks.map(item => item.question);
    return arr.sort(() => Math.random() - 0.5);
  }, [tasks, resetKey]);

  useEffect(() => { dispatch(addList({ index, items: questions })); }, [questions, dispatch, index]);

  return (
    <Box>
      <SortableList index={index} answers={questions} />
    </Box>
  );
}

export default Sorting;
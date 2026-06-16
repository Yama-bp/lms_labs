import { RadioGroup, FormControlLabel, Radio, FormControl } from '@mui/material';
import { tTasks } from "../quizData";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addList, setDraggedItems } from './quizSlice';

interface ComponentProps { index: number; tasks: tTasks; resetKey: number; }

function SingleChoice({ index, tasks, resetKey }: ComponentProps) {
  const dispatch = useDispatch();
  const task = tasks[0];
  const options = task.options || [];

  useEffect(() => {
    dispatch(addList({ index, items: [] }));
  }, [resetKey, dispatch, index]);

  const handleChange = (_: any, value: string) => {
    dispatch(setDraggedItems({ index, items: [value] }));
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup onChange={handleChange}>
        {options.map((opt, i) => (
          <FormControlLabel key={i} value={opt} control={<Radio />} label={opt} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default SingleChoice;
import { RadioGroup, FormControlLabel, Radio, FormControl } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addList, setDraggedItems } from './quizSlice';

interface ComponentProps { index: number; tasks: any[]; resetKey: number; }

function SingleChoice({ index, tasks, resetKey }: ComponentProps) {
  const dispatch = useDispatch();
  const task = tasks[0];
  const options: string[] = task.options || [];

  useEffect(() => {
    dispatch(addList({ index, items: [] }));
  }, [resetKey, dispatch, index]);

  const handleChange = (_: any, value: string) => {
    dispatch(setDraggedItems({ index, items: [value] }));
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup onChange={handleChange}>
        {options.map((opt: string, i: number) => (
          <FormControlLabel key={i} value={opt} control={<Radio />} label={opt} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default SingleChoice;
import * as React from 'react';
import { FormGroup, FormControlLabel, Checkbox, FormControl } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addList, setDraggedItems } from './quizSlice';

interface ComponentProps { index: number; tasks: any[]; resetKey: number; }

function MultiChoice({ index, tasks, resetKey }: ComponentProps) {
  const dispatch = useDispatch();
  const task = tasks[0];
  const options: string[] = task.options || [];
  const [selected, setSelected] = React.useState<string[]>([]);

  useEffect(() => {
    dispatch(addList({ index, items: [] }));
    setSelected([]);
  }, [resetKey, dispatch, index]);

  const handleChange = (opt: string, checked: boolean) => {
    const newSelected = checked
      ? [...selected, opt].sort()
      : selected.filter(s => s !== opt);
    setSelected(newSelected);
    dispatch(setDraggedItems({ index, items: newSelected }));
  };

  return (
    <FormControl component="fieldset">
      <FormGroup>
        {options.map((opt: string, i: number) => (
          <FormControlLabel key={i}
            control={<Checkbox checked={selected.includes(opt)}
              onChange={(_, c) => handleChange(opt, c)} />}
            label={opt} />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default MultiChoice;
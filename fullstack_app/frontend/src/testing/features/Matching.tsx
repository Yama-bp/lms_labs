import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import SortableList from "./SortableList";
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from './quizSlice';

interface ComponentProps { index: number; tasks: any[]; resetKey: number; }

function Matching({ index, tasks, resetKey }: ComponentProps) {
  const dispatch = useDispatch();
  const answers = useMemo(() => {
    const arr = tasks.map((item: any) => item.answer);
    return arr.sort(() => Math.random() - 0.5);
  }, [tasks, resetKey]);

  useEffect(() => { dispatch(addList({ index, items: answers })); }, [answers, dispatch, index]);

  return (
    <Grid container spacing={2}>
      <Grid xs={6}>
        <List>
          {tasks.map((item: any, idx: number) => (
            <ListItem key={idx}>
              <ListItemButton sx={{ border: '1px solid gray', borderRadius: 1, textAlign: 'right' }}>
                <ListItemText primary={item.question} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid xs={6}>
        <SortableList index={index} answers={answers} />
      </Grid>
    </Grid>
  );
}

export default Matching;
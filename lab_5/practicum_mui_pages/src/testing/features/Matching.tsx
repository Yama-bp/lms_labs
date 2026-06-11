import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { tTasks } from "../quizData";
import SortableList from "./SortableList";
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from './quizSlice';

interface ComponentProps {
    index: number;
    tasks: tTasks;
    resetKey: number;
}

function Matching({ index, tasks, resetKey }: ComponentProps) {
    const dispatch = useDispatch();

    const answers = useMemo(() => {
        const arr = tasks.map(item => item.answer);
        return arr.sort(() => Math.random() - 0.5);
    }, [tasks, resetKey]);

    useEffect(() => {
        dispatch(addList({ index, items: answers }));
    }, [answers, dispatch, index]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <List>
                    {tasks.map((item, idx) => (
                        <ListItem key={idx}>
                            <ListItemButton
                                sx={{
                                    border: '1px solid gray',
                                    borderRadius: '5px',
                                    textAlign: 'right',
                                }}
                            >
                                <ListItemText primary={item.question} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item xs={6}>
                <SortableList index={index} answers={answers} />
            </Grid>
        </Grid>
    );
}

export default Matching;
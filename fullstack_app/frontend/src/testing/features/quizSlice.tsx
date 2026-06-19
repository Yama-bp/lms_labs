import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListsState { lists: string[][]; }

const initialState: ListsState = { lists: [] };

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      state.lists.splice(action.payload.index, 0, action.payload.items);
    },
    setDraggedItems: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      if (index >= 0 && index < state.lists.length) state.lists[index] = items;
    },
  },
});

export const { addList, setDraggedItems } = listsSlice.actions;
export default listsSlice.reducer;
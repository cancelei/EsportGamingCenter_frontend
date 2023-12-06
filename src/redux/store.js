import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './features/gamesSlice';

const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});

export default store;
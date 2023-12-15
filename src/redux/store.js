import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './fts/gamesSlice';

const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});

export default store;

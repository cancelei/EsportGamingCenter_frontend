import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  games: [],
  gameById: {},
  reservedGame: {},
  isLoading: true,
  error: null,
};

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
  const url = 'http://127.0.0.1:3000/api/games';
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
});

export const fetchGameById = createAsyncThunk('games/fetchGameById', async (gameId) => {
  const url = `http://127.0.0.1:3000/api/games/${gameId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
});

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    gameCreated: (state, action) => {
      state.games?.push(action.payload);
    },
    reservedGame(state, action) {
      const id = action.payload;
      const reserved = state.games.games.find((game) => game.id === id);
      state.reservedGame = reserved;
    },
    gameRemoved(state, action) {
      const game = state.games.games.find((game) => game.id === action.payload);
      if (game) {
        game.isRemoved = true;
      }
    },
  },
  extraReducers: {
    // Fetch Games
    [fetchGames.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchGames.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.games = action.payload;
    },
    [fetchGames.rejected]: (state) => {
      state.isLoading = false;
    },
    // Fetch Game By Id
    [fetchGameById.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchGameById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.gameById = action.payload;
    },
    [fetchGameById.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { gameCreated, reservedGame, gameRemoved } = gamesSlice.actions;
export const getAllGames = (state) => state.games.games;
export default gamesSlice.reducer;

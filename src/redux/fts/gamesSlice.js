import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
  games: [],
  gameById: {},
  reservedGame: {},
  isLoading: true,
  error: null,
};

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
  const url = 'http://127.0.0.1:3000/api/games'; // URL actualizada para el espacio de nombres 'api'
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
});

export const fetchGameById = createAsyncThunk('games/fetchGameById', async (data) => {
  const url = `http://127.0.0.1:3000/api/v1/users/${data.userId}/games/${data.gameId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
});

export const addNewGames = createAsyncThunk('games/addNewGames', async (data) => {
  const { authToken } = data.id;
  try {
    const config = {
      headers: {
        authorization: authToken,
        'Content-Type': 'application/json',
      },
    };
    const baseUrl = `http://127.0.0.1:3000/api/v1/users/${data.id}/games`;

    const response = await axios.post(
      baseUrl,
      JSON.stringify({
        game: data.game,
      }),
      config,
    );
    toast.success(`Game Successfully ${response.statusText} `);
    return response.data;
  } catch (error) {
    toast.error('Opps failed to create Game');
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
    // Add New Game
    [addNewGames.pending]: (state) => {
      state.isLoading = true;
    },
    [addNewGames.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.games.push(action.payload);
    },
    [addNewGames.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export const getAllGames = (state) => state.games.games;
export default gamesSlice.reducer;

import React from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import Login from './Components/auth/SignInForm';
import Register from './Components/auth/SignUpForm';
import AddGamesForm from './Components/games/AddGamesForm';
import Session from './Components/session/Session';
import MainPage from './Components/games/MainPage';
import DeleteGame from './Components/games/DeleteGame';
import Reservations from './Components/reservations/Reservations';
import GameDetails from './Components/details/GameDetails';
import './App.css';
import GamesListComponent from './Components/games/GamesListComponent';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ParentComponent from './Components/reservations/ReservationForm';

const App = () => (
    <AuthProvider
      authType="cookie"
      authName="_auth"
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Session />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/games"
            element={(
              <RequireAuth loginPath="/login">
                <MainPage />
              </RequireAuth>
            )}
          />
          <Route
            path="/addGame"
            element={(
              <RequireAuth loginPath="/login">
                <AddGamesForm />
              </RequireAuth>
            )}
          />
          <Route
            path="/gamelist"
            element={(
              <RequireAuth loginPath="/login">
                <GamesListComponent />
              </RequireAuth>
            )}
          />
          <Route
            path="/details/:gameId"
            element={(
              <RequireAuth loginPath="/login">
                <GameDetails />
              </RequireAuth>
            )}
          />
          <Route
            path="/games/delete"
            element={(
              <RequireAuth loginPath="/login">
                <DeleteGame />
              </RequireAuth>
            )}
          />
          <Route
            path="/reservations"
            element={(
              <RequireAuth loginPath="/login">
                <Reservations />
              </RequireAuth>
            )}
          />
          <Route
            path="/reservations/new"
            element={(
              <RequireAuth loginPath="/login">
                <ParentComponent />
              </RequireAuth>
            )}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );

export default App;

import React from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import Login from './Components/auth/SignInForm'; // Asegúrate de que este path sea correcto
import Register from './Components/auth/SignUpForm'; // Asegúrate de que este path sea correcto
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Session />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route element={<RequireAuth />}> */}
        <Route exact path="/addGame" element={<AddGamesForm />} />
        <Route path="/games" element={<MainPage />} />
        <Route path="/gamelist" element={<GamesListComponent />} />
        <Route path="/details/:gameId" element={<GameDetails />} />
        <Route path="/games/delete" element={<DeleteGame />} />
        <Route path="/reservations" element={<Reservations />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;

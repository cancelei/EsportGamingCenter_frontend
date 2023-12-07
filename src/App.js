import React from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import Login from './Components/Login'; // Asegúrate de que este path sea correcto
import Register from './Components/Register'; // Asegúrate de que este path sea correcto
import AddGamesForm from './Components/games/AddGamesForm';
import Session from './Components/session/Session';
import MainPage from './Components/games/MainPage';
import DeleteGame from './Components/games/DeleteGame';
import Reservations from './Components/reservations/Reservations';
import GameDetails from './Components/details/GameDetails';
import './App.css';

function App() {
  return (
    <Routes>
      <Router>
        <Route path="/" element={<Session />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route element={<RequireAuth />}> */}
        <Route exact path="/addGame" element={<AddGamesForm />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/details/:gameId" element={<GameDetails />} />
        <Route path="/games/delete" element={<DeleteGame />} />
        <Route path="/reservations" element={<Reservations />} />
        {/* </Route> */}
      </Router>
    </Routes>
  );
}

export default App;

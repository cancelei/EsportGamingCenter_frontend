import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GameCarousel from './GameCarousel';
import { fetchGames } from '../../redux/fts/gamesSlice'; // Importar la acción fetchGames de Redux
import '../../assets/css/carousel.css';

function MainPage() {
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchGames()); // Cargar juegos desde el backend
  }, [dispatch]);

  return (

    <div className="main-page-container">
      <h1 className="main-title">Esport Gaming Center</h1>
      <GameCarousel games={games} />
    </div>
  );
}

export default MainPage;

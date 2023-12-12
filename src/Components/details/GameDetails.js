import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { fetchGameById } from '../../redux/fts/gamesSlice';
import '../../assets/css/carousel.css';

function GameDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gameId } = useParams();
  const gameDetails = useSelector((state) => state.games.gameById);

  useEffect(() => {
    dispatch(fetchGameById(gameId));
  }, [dispatch, gameId]);

  const handleReserve = async () => {

    const reservationDate = new Date().toISOString().split('T')[0];
    const setupConfig = "Configuración estándar";
    const status = "Pendiente";

    try {
      const response = await fetch(`http://localhost:3000/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reservation: {
            game_id: gameId,
            user_id: userId,
            reservation_date: reservationDate,
            setup_config: setupConfig,
            status: status
          }
        }),
      });

      if (response.ok) {
        alert('Reserva realizada con éxito!');
        navigate('/reservations');
      } else {
        const errorData = await response.json();
        console.error('Error al realizar la reserva:', errorData);
        alert('Error al realizar la reserva');
      }
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
      alert('Error al realizar la reserva');
    }
  };


  return (
    <>
      <Navbar />
      <div>
        <h2 className="headerDetails">Game Details</h2>
        {gameDetails.isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="Details">
            {/* Asegúrate de que estos nombres coincidan con la estructura de datos de tu backend */}
            <img src={gameDetails.image_url} alt={gameDetails.title} />
            <h3>{gameDetails.title}</h3>
            <p>Description: {gameDetails.description}</p>
            {/* Resto de los detalles del juego */}
            <button className="reserveButton" onClick={handleReserve}>Reservar</button>
          </div>
        )}
      </div>
    </>
  );
}

export default GameDetails;

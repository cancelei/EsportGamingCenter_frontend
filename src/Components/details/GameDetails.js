/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { fetchGameById } from '../../redux/features/gamesSlice';
import '../../assets/css/carousel.css';

function GameDetails() {
  const dispatch = useDispatch();
  const { userId, gameId } = useParams();
  const gameDetails = useSelector((state) => state.games.gameById);

  useEffect(() => {
    if (userId && gameId) {
      dispatch(fetchGameById({ userId, gameId }));
    }
  }, [dispatch, userId, gameId]);

  return (
    <>
      <Navbar />
      <div>
        <h2 className="headerDetails">Game Details</h2>
        {gameDetails.isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="Details">
            <img src={gameDetails.image} alt={gameDetails.name} />
            <h3>{gameDetails.name}</h3>
            <p>Genre: {gameDetails.genre}</p>
            <p>Finance Fee: {gameDetails.finance_fee}</p>
            <p>Option to Purchase: {gameDetails.option_to_purchase}</p>
            <p>Total Amount Payable: {gameDetails.total_amount_payable}</p>
            <p>Duration: {gameDetails.duration} days</p>
            <p>Description: {gameDetails.description}</p>
            {/* Link to the Reserve Page */}
            <Link to="../reservations/Reservations.jsx">
              <button className="reserveButton">Reserved</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default GameDetails;
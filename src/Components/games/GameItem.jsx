import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchGameById } from '../../redux/fts/gamesSlice';

const GameItem = ({ game, classNames }) => {
  const { id } = JSON.parse(localStorage.getItem('Token')) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDispatch = (gameId) => {
    dispatch(fetchGameById({ userId: id, gameId }));
    navigate('../details/GameDetails.js');
  };

  return (
    <li style={{ width: '18rem' }}>
      <button
        onClick={() => handleDispatch(game.id)}
        className={classNames.button}
        type="button"
      >
        <div className={classNames.gameBody}>
          <div className={classNames.imageContainer}>
            <img
              src={game.image}
              alt={game.name}
              className={classNames.image}
            />
          </div>
          <h6 className={classNames.title}>{game.name}</h6>
          <p className={classNames.discription}>{game.description}</p>
        </div>
      </button>
    </li>
  );
};

GameItem.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  classNames: PropTypes.shape({
    button: PropTypes.string,
    gameBody: PropTypes.string,
    imageContainer: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    discription: PropTypes.string,
  }).isRequired,
};

export default GameItem;

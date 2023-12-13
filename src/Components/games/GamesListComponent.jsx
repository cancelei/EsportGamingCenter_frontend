import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GamesListComponent.css'; // Importar el archivo CSS
import background from '../../assets/background.webp';

function GamesListComponent() {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    const fetchGames = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/games');
            setGames(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const deleteGame = async (gameId, event) => {
        event.stopPropagation(); // Previene la propagación del evento al elemento padre
        try {
            await axios.delete(`http://localhost:3000/api/games/${gameId}`);
            fetchGames();
        } catch (error) {
            console.error(error);
        }
    };

    const handleGameClick = (gameId) => {
        navigate(`/details/${gameId}`);
    };


    return (
      <div className="games-list-container" style={{ backgroundImage: `url(${background})` }}>
          <button className="new-game-button" onClick={() => navigate('/addgame')}>New Game</button>
          <ul className="games-list">
              {games.map((game) => (
                  <li key={game.id} className="game-list-item" onClick={() => handleGameClick(game.id)}>
                      <h3 className="game-header">{game.title}</h3>
                      <p className="game-description">{game.description}</p>
                      <img className="game-image" src={game.image_url} alt={game.title} />
                      <button className="delete-button" onClick={(e) => deleteGame(game.id, e)}>Delete</button>
                  </li>
              ))}
          </ul>
      </div>
  );
}

export default GamesListComponent;

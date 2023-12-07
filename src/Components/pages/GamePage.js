import React, { useState, useEffect } from 'react';
import DeleteGame from './DeleteGame';

function GamePage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:3000/games');
        const data = await response.json();

        if (response.ok) {
          setGames(data);
        } else {
          console.error('Error fetching games:', data);
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const handleDelete = async (deletedGameId) => {
    try {
      const response = await fetch(`http://localhost:3000/games/${deletedGameId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If the backend deletion is successful, update the state to remove the deleted game
        setGames((prevGames) => prevGames.filter((game) => game.id !== deletedGameId));
      } else {
        console.error('Error deleting game on the backend');
        // Handle errors here
      }
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  return (
    <div>
      <h2>Game Page</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <strong>{game.title}</strong>: {game.description}
            <DeleteGame gameId={game.id} onDelete={() => handleDelete(game.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GamePage;

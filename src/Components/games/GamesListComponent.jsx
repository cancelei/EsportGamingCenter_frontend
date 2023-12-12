import React, { useState, useEffect } from 'react';
import axios from 'axios';
import background from '../../assets/background.webp';

function GamesListComponent() {
  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/games'); // Replace '/api/games' with your backend API endpoint
      setGames(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const deleteGame = async (gameId) => {
    try {
      await axios.delete(`http://localhost:3000/api/games/${gameId}`); // Replace '/api/games' with your backend API endpoint
      fetchGames();
    } catch (error) {
      console.error(error);
    }
  };

  const styles = {
    container: {
      textAlign: 'center',
      padding: '20px',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center', // Center the image in the container
      backgroundRepeat: 'no-repeat', // Prevent the image from repeating
      minHeight: '100vh', // Minimum height of 100% of the viewport height
      filter: 'brightness(0.9)', // Adjust the brightness filter as needed
      minWidth: '100vw', // Minimum width of 100% of the viewport width
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      background: '#f0f0f0',
      margin: '10px 0',
      padding: '10px',
      borderRadius: '5px',
    },
    gameImage: {
      maxWidth: '200px',
      maxHeight: '200px',
      borderRadius: '5px',
    },
    gameHeader: {
      color: '#333',
      margin: '5px 0',
    },
    gameDescription: {
      color: '#666',
      fontSize: '14px',
    },
    deleteButton: {
      background: '#ff4d4d',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    newGameButton: {
      background: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      cursor: 'pointer',
      marginBottom: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <button type="submit" style={styles.newGameButton} onClick={() => window.location.href = '/addgame'}>New Game</button>
      <ul style={styles.list}>
        {games.map((game) => (
          <li key={game.id} style={styles.listItem}>
            <h3 style={styles.gameHeader}>{game.title}</h3>
            <p style={styles.gameDescription}>{game.description}</p>
            <p>{game.genre}</p>
            <img style={styles.gameImage} src={game.image_url} alt={game.title} />
            <button type="submit" style={styles.deleteButton} onClick={() => deleteGame(game.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GamesListComponent;

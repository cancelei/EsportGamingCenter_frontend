import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import background from '../../assets/background.webp';

function GamesListComponent() {
  const [games, setGames] = useState([]); // Added this line

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/games'); // Replace '/api/games' with your backend API endpoint
      setGames(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // const styles = {
  //   container: {
  //     textAlign: 'center',
  //     padding: '20px',
  //     backgroundImage: `url(${background})`,
  //     backgroundSize: 'cover',
  //     backgroundPosition: 'center',
  //     backgroundRepeat: 'no-repeat',
  //     minHeight: '100vh',
  //     maxWidth: '100vw',
  //     filter: 'brightness(0.9)',
  //   },
  //   list: {
  //     listStyleType: 'none',
  //     padding: 0,
  //   },
  //   listItem: {
  //     background: '#f0f0f0',
  //     margin: '100px 350px',
  //     padding: '10px',
  //     borderRadius: '5px',
  //   },
  //   gameImage: {
  //     maxWidth: '300px',
  //     maxHeight: '300px',
  //     borderRadius: '5px',
  //   },
  //   gameHeader: {
  //     color: '#333',
  //     margin: '5px 0',
  //   },
  //   gameDescription: {
  //     color: '#666',
  //     fontSize: '14px',
  //   },
  //   deleteButton: {
  //     background: '#ff4d4d',
  //     color: 'white',
  //     border: 'none',
  //     borderRadius: '5px',
  //     padding: '10px 20px',
  //     cursor: 'pointer',
  //     marginTop: '10px',
  //   },
  //   newGameButton: {
  //     background: '#4CAF50',
  //     color: 'white',
  //     border: 'none',
  //     borderRadius: '5px',
  //     padding: '10px 20px',
  //     cursor: 'pointer',
  //     marginBottom: '20px',
  //   },
  // };

  return (
    <div>
      {games.map((game) => (
        <div key={game.id}>
          <h2>{game.name}</h2>
          <p>{game.description}</p>
        </div>
      ))}
      <button type="submit" onClick={() => { window.location.href = '/addgame'; }}>New Game</button>
    </div>
  );
}

export default GamesListComponent;

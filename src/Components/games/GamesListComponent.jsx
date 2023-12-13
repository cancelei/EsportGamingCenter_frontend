import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import background from '../../assets/background.webp';

function GamesListComponent() {
    const [games, setGames] = useState([]);
    const navigate = useNavigate(); // Inicializa navigate

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

    const styles = {
        container: {
            textAlign: 'center',
            padding: '20px',
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            filter: 'brightness(0.9)',
            minWidth: '100vw',
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
            cursor: 'pointer', // Cambia el cursor a pointer para indicar que es clickeable
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
            <button type="submit" style={styles.newGameButton} onClick={() => navigate('/addgame')}>New Game</button>
            <ul style={styles.list}>
                {games.map((game) => (
                    <li key={game.id} style={styles.listItem} onClick={() => handleGameClick(game.id)}>
                        <h3 style={styles.gameHeader}>{game.title}</h3>
                        <p style={styles.gameDescription}>{game.description}</p>
                        <img style={styles.gameImage} src={game.image_url} alt={game.title} />
                        <button type="button" style={styles.deleteButton} onClick={(e) => deleteGame(game.id, e)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GamesListComponent;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddGameForm.css';
import Navbar from '../Navbar';

function AddGameForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          game: {
            title,
            description,
            image_url: imageUrl,
          },
        }),
      });

      if (response.ok) {
        console.log('Game added successfully');
        // Navigate to the game list page after adding a game
        navigate('/gamelist');
      } else {
        console.error('Error adding game');
      }
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="body-background">
        <div className="formcontainer">
          <h2 className="addgame-title">Add New Game</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">
                Title:
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="description">
                Description:
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="imageUrl">
                Image URL:
                <input
                  type="text"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </label>
            </div>
            <button type="submit">Add Game</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddGameForm;

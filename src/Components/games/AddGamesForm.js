import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddGameForm.css';

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
        // Use history.push to navigate to the gameList page
        navigate('/gamelist');
      } else {
        console.error('Error adding game');
      }
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <div className="body-background">
      <div className="formcontainer">
        <h2>Add New Game</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <button type="submit">Add Game</button>
        </form>
      </div>
    </div>
  );
}

export default AddGameForm;

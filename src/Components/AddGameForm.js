import React, { useState } from 'react';

function AddGameForm({ onAddGame }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          game: {
            title: title,
            description: description,
          },
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Game added successfully:', data);
        onAddGame(data); // Notify parent component about the new game
      } else {
        console.error('Error adding game:', data);
      }
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <div>
      <h2>Add New Game</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Game</button>
      </form>
    </div>
  );
}

export default AddGameForm;

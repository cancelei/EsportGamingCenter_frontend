import React, { useState } from 'react';

function AddGameForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const imageOptions = [
    'image1.jpg', // Replace with actual image names in your project
    'image2.jpg',
    'image3.jpg',
    // Add more image names as needed
  ];

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
            image_url: selectedImage || imageUrl,
          },
        }),
      });

      if (response.ok) {
        console.log('Game added successfully');
        // Handle any additional logic or redirection after adding the game
      } else {
        console.error('Error adding game');
      }
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <div>
      <h2>Add Game</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="imageSelector">
            Select Image:
            <select
              id="imageSelector"
              value={selectedImage}
              onChange={(e) => setSelectedImage(e.target.value)}
            >
              <option value="">-- Select Image --</option>
              {imageOptions.map((image) => (
                <option key={image} value={image}>
                  {image}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="imageUrl">
            Or provide Image URL:
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add Game</button>
      </form>
    </div>
  );
}

export default AddGameForm;

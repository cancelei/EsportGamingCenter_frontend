import React from 'react';
import PropTypes from 'prop-types';
import { useAuthUser, useAuthHeader } from 'react-auth-kit';

const DeleteGame = ({ gameId, onDeleteGame }) => {
  const auth = useAuthUser();
  const header = useAuthHeader();
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/games/${gameId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-USER-EMAIL': auth().userEmail,
          'X-USER-TOKEN': header().split(' ')[1],
        },
      });

      if (response.ok) {
        console.log('Game deleted successfully');
        onDeleteGame(gameId);
      } else {
        console.error('Error deleting game');
      }
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  return (
    <button type="button" onClick={handleDelete}>Delete</button>
  );
};

DeleteGame.propTypes = {
  gameId: PropTypes.number.isRequired,
  onDeleteGame: PropTypes.func.isRequired,
};

export default DeleteGame;

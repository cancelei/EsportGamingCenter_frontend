import React, { useState } from 'react';
import FindGameComponent from './FindgameComponent';

function ParentComponent() {
  const [selectedGameId, setSelectedGameId] = useState(null);

  const handleGameChange = (gameId) => {
    setSelectedGameId(gameId);
  };

  return (
    <div>
      {/* Other components or content */}
      <ReservationForm selectedGameId={selectedGameId} onGameSelect={handleGameChange} />
      {/* Other components or content */}
    </div>
  );
}

function ReservationForm({ selectedGameId, onGameSelect }) {
  const [reservation_date, setReservation_date] = useState('');
  const [setup_config, setSetup_config] = useState('');
  const [user_id, setUser_id] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reservation: {
            reservation_date,
            setup_config,
            game_id: selectedGameId, // Use selectedGameId here
            user_id,
            status,
          },
        }),
      });

      if (response.ok) {
        console.log('Reservation added successfully');
      } else {
        console.error('Error adding reservation');
      }
    } catch (error) {
      console.error('Error adding reservation:', error);
    }
  };
  
  return (
    <div>
      <h2>Add New Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Reservation Date: </label>
          <input
            type="date"
            value={reservation_date}
            onChange={(e) => setReservation_date(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="setup_config">Set Up Config:</label>
          <textarea
            type="text"
            value={setup_config}
            onChange={(e) => setSetup_config(e.target.value)}
          />
        </div>
        <FindGameComponent onGameSelect={onGameSelect} />
        <div>
          <label htmlFor="user_id">User Info: </label>
          <input
            type="integer"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="status">Reservation Status: </label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <button type="submit">Add Reservation</button>
      </form>
    </div>
  );
}

export default ParentComponent;

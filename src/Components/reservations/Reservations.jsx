import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';

function Reservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:3000/reservations', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Aquí debes incluir también el token de autenticación si es necesario
          },
        });
        const data = await response.json();
        if (response.ok) {
          setReservations(data);
        } else {
          console.error('Error fetching reservations:', data);
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <>
      <Navbar />
      <div className="reservation-page-container">
        <h2>My Reservations</h2>
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              <strong>Game:</strong>
              {' '}
              {reservation.game.title}
              {' '}
              <br />
              <strong>Date:</strong>
              {' '}
              {new Date(reservation.reservation_date).toLocaleDateString()}
              {' '}
              <br />
              <strong>Config PC:</strong>
              {' '}
              {reservation.setup_config}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Reservations;

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ reservation_date: '', setup_config: '' });

  useEffect(() => {
    fetchReservations();
  }, []);

  if (!Array.isArray(reservations)) {
    return <div>No reservations available.</div>;
  }

  const fetchReservations = async () => {
    const token = localStorage.getItem('userToken'); // Recuperar el token de autenticación
  
    try {
      const response = await fetch('http://localhost:3000/api/reservations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Añadir token en la cabecera
        },
      });
      const data = await response.json();
      console.log(data); // Agrega esta línea
      if (response.ok) {
        setReservations(data);
      } else {
        console.error('Error fetching reservations:', data);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };
  

  const handleEdit = (reservation) => {
    setEditingId(reservation.id);
    setEditFormData({ reservation_date: reservation.reservation_date, setup_config: reservation.setup_config });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleUpdate = async (event, id) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/reservations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });
      const updatedReservation = await response.json();
      if (response.ok) {
        setReservations(reservations.map((reservation) => (reservation.id === id ? updatedReservation : reservation)));
        setEditingId(null);
      } else {
        console.error('Error updating reservation:', updatedReservation);
      }
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/reservations/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setReservations(reservations.filter((reservation) => reservation.id !== id));
      } else {
        console.error('Error deleting reservation');
      }
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  const handleFormChange = (event) => {
    setEditFormData({ ...editFormData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="reservation-page-container">
        <h2>My Reservations</h2>
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id} className="reservation-item">
              {reservation.game && (
                <div className="game-info">
                  <img src={reservation.game.image_url} alt={reservation.game.title} />
                  <div>
                    <h3>{reservation.game.title}</h3>
                    <p>{reservation.game.description}</p>
                  </div>
                </div>
              )}
              {!reservation.game && <p>No game data available</p>}
              <div className="reservation-details">
                <strong>Date:</strong>
                {' '}
                {new Date(reservation.reservation_date).toLocaleDateString()}
                <br />
                <strong>PC Config:</strong>
                {' '}
                {reservation.setup_config}
                <br />
              </div>
              <div className="reservation-actions">
                {editingId === reservation.id ? (
                  <form onSubmit={(e) => handleUpdate(e, reservation.id)}>
                    <input
                      type="date"
                      name="reservation_date"
                      value={editFormData.reservation_date}
                      onChange={handleFormChange}
                    />
                    <input
                      type="text"
                      name="setup_config"
                      value={editFormData.setup_config}
                      onChange={handleFormChange}
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <button type="button" onClick={() => handleEdit(reservation)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(reservation.id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Reservations;

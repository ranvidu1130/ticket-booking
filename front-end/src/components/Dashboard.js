import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CardComponent from './CardComponent';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/films`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch films');
      }

      const data = await response.json();
      if (data.success) {
        setFilms(data.data);
      } else {
        setError('Failed to load films');
      }
    } catch (err) {
      console.error('Error fetching films:', err);
      setError('Failed to fetch films');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = (filmId) => {
    console.log('Purchase clicked for film:', filmId);
    // Navigate to booking or seating page
    navigate('/booking', { state: { filmId } });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to FAUGET</h1>
        <p>Hello {user?.first_name}, choose your film and book your tickets!</p>
      </div>
      
      {loading && <div className="loading-message">Loading films...</div>}
      {error && <div className="error-message">{error}</div>}
      
      {!loading && !error && (
        <div className="films-grid">
          {films.map((film) => (
            <CardComponent 
              key={film.id} 
              film={film} 
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
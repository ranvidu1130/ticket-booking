import React, { useState } from 'react';
import './CardComponent.css';

function CardComponent({ film, onPurchase }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="film-card">
      <div 
        className="film-image-container"
        onMouseEnter={() => setShowDescription(true)}
        onMouseLeave={() => setShowDescription(false)}
      >
        <img src={film.image_url} alt={film.title} className="film-image" />
        {showDescription && (
          <div className="film-description-popup">
            <p>{film.description}</p>
          </div>
        )}
      </div>
      <div className="film-info">
        <h3 className="film-title">{film.title}</h3>
        <div className="film-details">
          <span className="film-genre">{film.genre}</span>
          <span className="film-duration">{film.duration}</span>
        </div>
        <div className="film-showtime">
          <span className="showtime-label">Showtime:</span>
          <span className="showtime-value">{film.show_time}</span>
        </div>
        <div className="film-footer">
          <span className="film-price">${film.price}</span>
          <button 
            className="purchase-button"
            onClick={() => onPurchase(film.id)}
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;

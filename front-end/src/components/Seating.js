import React, { useState } from 'react';
import './Seating.css';

function Seating() {
  const [selectedVenue, setSelectedVenue] = useState('');
  
  const venues = [
    {
      id: 1,
      name: 'Grand Arena',
      capacity: 5000,
      layout: 'arena',
      sections: ['VIP', 'General', 'Balcony']
    },
    {
      id: 2,
      name: 'Classic Theater',
      capacity: 800,
      layout: 'theater',
      sections: ['Orchestra', 'Mezzanine', 'Balcony']
    },
    {
      id: 3,
      name: 'Sports Stadium',
      capacity: 15000,
      layout: 'stadium',
      sections: ['Field Level', 'Club Level', 'Upper Deck']
    },
    {
      id: 4,
      name: 'Comedy Club',
      capacity: 200,
      layout: 'intimate',
      sections: ['Front Tables', 'Main Floor', 'Bar Seating']
    }
  ];

  const renderArenaLayout = () => (
    <div className="venue-layout arena-layout">
      <div className="stage-area">STAGE</div>
      
      <div className="vip-section">
        <h4>VIP Section</h4>
        <div className="seat-grid small">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="seat vip">VIP</div>
          ))}
        </div>
      </div>
      
      <div className="general-section">
        <h4>General Admission</h4>
        <div className="seat-grid large">
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i} className="seat general">GA</div>
          ))}
        </div>
      </div>
      
      <div className="balcony-section">
        <h4>Balcony</h4>
        <div className="seat-grid medium">
          {Array.from({ length: 60 }, (_, i) => (
            <div key={i} className="seat balcony">BAL</div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTheaterLayout = () => (
    <div className="venue-layout theater-layout">
      <div className="stage-area">STAGE</div>
      
      <div className="orchestra-section">
        <h4>Orchestra</h4>
        <div className="seat-grid theater-rows">
          {Array.from({ length: 8 }, (_, row) => (
            <div key={row} className="theater-row">
              <span className="row-label">{String.fromCharCode(65 + row)}</span>
              {Array.from({ length: 20 }, (_, seat) => (
                <div key={seat} className="seat orchestra">{seat + 1}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mezzanine-section">
        <h4>Mezzanine</h4>
        <div className="seat-grid theater-rows">
          {Array.from({ length: 6 }, (_, row) => (
            <div key={row} className="theater-row">
              <span className="row-label">M{row + 1}</span>
              {Array.from({ length: 18 }, (_, seat) => (
                <div key={seat} className="seat mezzanine">{seat + 1}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="balcony-section">
        <h4>Balcony</h4>
        <div className="seat-grid theater-rows">
          {Array.from({ length: 4 }, (_, row) => (
            <div key={row} className="theater-row">
              <span className="row-label">B{row + 1}</span>
              {Array.from({ length: 16 }, (_, seat) => (
                <div key={seat} className="seat balcony">{seat + 1}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStadiumLayout = () => (
    <div className="venue-layout stadium-layout">
      <div className="field-area">FIELD</div>
      
      <div className="field-level">
        <h4>Field Level</h4>
        <div className="stadium-sections">
          <div className="stadium-section">
            <span>Section 101-110</span>
            <div className="seat-grid stadium-small">
              {Array.from({ length: 50 }, (_, i) => (
                <div key={i} className="seat field-level">FL</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="club-level">
        <h4>Club Level</h4>
        <div className="stadium-sections">
          <div className="stadium-section">
            <span>Section 201-220</span>
            <div className="seat-grid stadium-medium">
              {Array.from({ length: 80 }, (_, i) => (
                <div key={i} className="seat club-level">CL</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="upper-deck">
        <h4>Upper Deck</h4>
        <div className="stadium-sections">
          <div className="stadium-section">
            <span>Section 301-340</span>
            <div className="seat-grid stadium-large">
              {Array.from({ length: 120 }, (_, i) => (
                <div key={i} className="seat upper-deck">UD</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntimateLayout = () => (
    <div className="venue-layout intimate-layout">
      <div className="stage-area small">STAGE</div>
      
      <div className="front-tables">
        <h4>Front Tables</h4>
        <div className="table-layout">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="table">
              <span>T{i + 1}</span>
              <div className="table-seats">
                {Array.from({ length: 4 }, (_, j) => (
                  <div key={j} className="seat front-table">S</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="main-floor">
        <h4>Main Floor</h4>
        <div className="seat-grid intimate-grid">
          {Array.from({ length: 40 }, (_, i) => (
            <div key={i} className="seat main-floor">MF</div>
          ))}
        </div>
      </div>
      
      <div className="bar-seating">
        <h4>Bar Seating</h4>
        <div className="bar-layout">
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="seat bar-seat">BS</div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVenueLayout = (venue) => {
    switch (venue.layout) {
      case 'arena':
        return renderArenaLayout();
      case 'theater':
        return renderTheaterLayout();
      case 'stadium':
        return renderStadiumLayout();
      case 'intimate':
        return renderIntimateLayout();
      default:
        return <div>Select a venue to view seating layout</div>;
    }
  };

  const selectedVenueData = venues.find(v => v.id === parseInt(selectedVenue));

  return (
    <div className="seating-container">
      <div className="seating-header">
        <h1>Seating Layouts</h1>
        <p>Explore our venue seating arrangements</p>
      </div>

      <div className="venue-selector">
        <h2>Select a Venue</h2>
        <div className="venue-cards">
          {venues.map(venue => (
            <div 
              key={venue.id} 
              className={`venue-card ${selectedVenue == venue.id ? 'selected' : ''}`}
              onClick={() => setSelectedVenue(venue.id)}
            >
              <h3>{venue.name}</h3>
              <p><strong>Capacity:</strong> {venue.capacity.toLocaleString()}</p>
              <p><strong>Layout:</strong> {venue.layout}</p>
              <p><strong>Sections:</strong> {venue.sections.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedVenueData && (
        <div className="venue-display">
          <div className="venue-info">
            <h2>{selectedVenueData.name} - Seating Layout</h2>
            <div className="venue-stats">
              <span>Total Capacity: {selectedVenueData.capacity.toLocaleString()}</span>
              <span>Sections: {selectedVenueData.sections.length}</span>
            </div>
          </div>

          <div className="seating-legend">
            <h3>Legend</h3>
            <div className="legend-items">
              <div className="legend-item">
                <div className="seat vip"></div>
                <span>VIP/Premium</span>
              </div>
              <div className="legend-item">
                <div className="seat general"></div>
                <span>General Admission</span>
              </div>
              <div className="legend-item">
                <div className="seat orchestra"></div>
                <span>Orchestra/Field Level</span>
              </div>
              <div className="legend-item">
                <div className="seat mezzanine"></div>
                <span>Mezzanine/Club</span>
              </div>
              <div className="legend-item">
                <div className="seat balcony"></div>
                <span>Balcony/Upper</span>
              </div>
            </div>
          </div>

          <div className="layout-container">
            {renderVenueLayout(selectedVenueData)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Seating;
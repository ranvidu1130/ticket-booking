import React, { useState } from 'react';
import './Seating.css';

function Seating() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // Define seating arrangement - each row has left and right sections
  const seatingLayout = [
    { row: 'A', leftSeats: 7, rightSeats: 7 },
    { row: 'B', leftSeats: 8, rightSeats: 8 },
    { row: 'C', leftSeats: 10, rightSeats: 10 }
  ];

  const handleSeatSelect = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const generateSeatId = (row, side, seatNumber) => {
    return `${row}${side}${seatNumber}`;
  };

  const isSeatOccupied = (seatId) => {
    // Randomly mark some seats as occupied for demo
    const occupiedSeats = ['AL3', 'AR5', 'BL2', 'BR7', 'CL4', 'CR9'];
    return occupiedSeats.includes(seatId);
  };

  const renderSeatSection = (row, side, seatCount) => {
    const seats = [];
    for (let i = 1; i <= seatCount; i++) {
      const seatId = generateSeatId(row, side, i);
      const isSelected = selectedSeats.includes(seatId);
      const isOccupied = isSeatOccupied(seatId);
      
      seats.push(
        <div
          key={seatId}
          className={`seat-square ${
            isOccupied ? 'occupied' : isSelected ? 'selected' : 'available'
          }`}
          onClick={() => !isOccupied && handleSeatSelect(seatId)}
        >
          {i}
        </div>
      );
    }
    return seats;
  };

  const renderRow = (rowData) => {
    return (
      <div key={rowData.row} className="theater-row">
        <div className="row-label">{rowData.row}</div>
        <div className="left-section">
          {renderSeatSection(rowData.row, 'L', rowData.leftSeats)}
        </div>
        <div className="center-aisle"></div>
        <div className="right-section">
          {renderSeatSection(rowData.row, 'R', rowData.rightSeats)}
        </div>
      </div>
    );
  };

  return (
    <div className="seating-container">
      <div className="seating-header">
        <h1>Theater Seating Layout</h1>
        <p>Select your preferred seats</p>
      </div>

      <div className="theater-layout">
        {/* Stage Area */}
        <div className="stage-area">
          <div className="stage">
            STAGE
          </div>
        </div>

        {/* Seating Area */}
        <div className="seating-area">
          {seatingLayout.map(rowData => renderRow(rowData))}
        </div>

        {/* Legend */}
        <div className="seating-legend">
          <div className="legend-items">
            <div className="legend-item">
              <div className="seat-square available"></div>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="seat-square selected"></div>
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <div className="seat-square occupied"></div>
              <span>Occupied</span>
            </div>
          </div>
        </div>

        {/* Selection Summary */}
        {selectedSeats.length > 0 && (
          <div className="selection-summary">
            <h3>Selected Seats:</h3>
            <div className="selected-seats-list">
              {selectedSeats.map(seatId => (
                <span key={seatId} className="selected-seat-tag">
                  {seatId}
                </span>
              ))}
            </div>
            <div className="summary-actions">
              <button 
                className="clear-btn"
                onClick={() => setSelectedSeats([])}
              >
                Clear Selection
              </button>
              <button className="book-btn">
                Book {selectedSeats.length} Seat{selectedSeats.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Seating;
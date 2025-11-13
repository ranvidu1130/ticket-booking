import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Booking.css';

function Booking() {
  const { user } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    event: '',
    seats: [],
    totalPrice: 0,
    date: '',
    time: ''
  });

  const events = [
    { id: 1, name: 'Concert: Rock Legends', date: '2025-12-15', time: '19:00', price: 75, venue: 'Grand Arena' },
    { id: 2, name: 'Theater: Shakespeare\'s Hamlet', date: '2025-12-20', time: '20:00', price: 45, venue: 'Classic Theater' },
    { id: 3, name: 'Sports: City Championship', date: '2025-12-25', time: '15:00', price: 35, venue: 'Sports Stadium' },
    { id: 4, name: 'Comedy Show: Stand-up Night', date: '2025-12-30', time: '21:00', price: 25, venue: 'Comedy Club' }
  ];

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setBookingData({
      ...bookingData,
      event: event.name,
      date: event.date,
      time: event.time
    });
    setBookingStep(2);
  };

  const handleSeatSelect = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const calculateTotal = () => {
    return selectedSeats.length * (selectedEvent?.price || 0);
  };

  const handleConfirmBooking = () => {
    const total = calculateTotal();
    setBookingData({
      ...bookingData,
      seats: selectedSeats,
      totalPrice: total
    });
    setBookingStep(3);
  };

  const handleFinalBooking = () => {
    // Here you would typically send the booking data to your backend
    alert(`Booking confirmed! Total: $${calculateTotal()}`);
    // Reset form
    setBookingStep(1);
    setSelectedEvent('');
    setSelectedSeats([]);
  };

  const renderSeatGrid = () => {
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const seatsPerRow = 10;
    
    return (
      <div className="seat-grid">
        <div className="screen">STAGE/SCREEN</div>
        {rows.map(row => (
          <div key={row} className="seat-row">
            <span className="row-label">{row}</span>
            {Array.from({ length: seatsPerRow }, (_, i) => {
              const seatNumber = `${row}${i + 1}`;
              const isSelected = selectedSeats.includes(seatNumber);
              const isOccupied = Math.random() > 0.7; // Random occupied seats for demo
              
              return (
                <button
                  key={seatNumber}
                  className={`seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}`}
                  onClick={() => !isOccupied && handleSeatSelect(seatNumber)}
                  disabled={isOccupied}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h1>Book Your Tickets</h1>
        <div className="booking-steps">
          <div className={`step ${bookingStep >= 1 ? 'active' : ''}`}>1. Select Event</div>
          <div className={`step ${bookingStep >= 2 ? 'active' : ''}`}>2. Choose Seats</div>
          <div className={`step ${bookingStep >= 3 ? 'active' : ''}`}>3. Confirm</div>
        </div>
      </div>

      {bookingStep === 1 && (
        <div className="events-section">
          <h2>Available Events</h2>
          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <h3>{event.name}</h3>
                <div className="event-details">
                  <p><strong>Venue:</strong> {event.venue}</p>
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Time:</strong> {event.time}</p>
                  <p className="price"><strong>Price:</strong> ${event.price}</p>
                </div>
                <button 
                  className="select-event-btn"
                  onClick={() => handleEventSelect(event)}
                >
                  Select Event
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {bookingStep === 2 && (
        <div className="seat-selection">
          <div className="event-info">
            <h2>{selectedEvent.name}</h2>
            <p>{selectedEvent.venue} | {selectedEvent.date} at {selectedEvent.time}</p>
          </div>
          
          <div className="seat-legend">
            <div className="legend-item">
              <div className="seat available"></div>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="seat selected"></div>
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <div className="seat occupied"></div>
              <span>Occupied</span>
            </div>
          </div>

          {renderSeatGrid()}

          <div className="booking-summary">
            <p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
            <p>Total: ${calculateTotal()}</p>
            <div className="booking-actions">
              <button onClick={() => setBookingStep(1)} className="btn-secondary">
                Back to Events
              </button>
              <button 
                onClick={handleConfirmBooking}
                disabled={selectedSeats.length === 0}
                className="btn-primary"
              >
                Confirm Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {bookingStep === 3 && (
        <div className="booking-confirmation">
          <h2>Booking Confirmation</h2>
          <div className="confirmation-details">
            <div className="detail-group">
              <h3>Event Details</h3>
              <p><strong>Event:</strong> {bookingData.event}</p>
              <p><strong>Date:</strong> {bookingData.date}</p>
              <p><strong>Time:</strong> {bookingData.time}</p>
            </div>
            
            <div className="detail-group">
              <h3>Seat Details</h3>
              <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
              <p><strong>Number of Tickets:</strong> {selectedSeats.length}</p>
            </div>
            
            <div className="detail-group">
              <h3>Payment Summary</h3>
              <p><strong>Price per ticket:</strong> ${selectedEvent.price}</p>
              <p><strong>Total Amount:</strong> ${calculateTotal()}</p>
            </div>
          </div>
          
          <div className="final-actions">
            <button onClick={() => setBookingStep(2)} className="btn-secondary">
              Back to Seats
            </button>
            <button onClick={handleFinalBooking} className="btn-confirm">
              Confirm & Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;
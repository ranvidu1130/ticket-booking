import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to TicketPro Dashboard</h1>
        <p>Hello {user?.first_name}, manage your tickets and bookings here!</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">🎫</div>
          <h3>My Tickets</h3>
          <p>View and manage your booked tickets</p>
          <div className="card-stats">
            <span className="stat-number">0</span>
            <span className="stat-label">Active Bookings</span>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-icon">📅</div>
          <h3>Upcoming Events</h3>
          <p>Browse and book tickets for upcoming events</p>
          <div className="card-stats">
            <span className="stat-number">12</span>
            <span className="stat-label">Events Available</span>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-icon">💰</div>
          <h3>Total Spent</h3>
          <p>Track your ticket expenses</p>
          <div className="card-stats">
            <span className="stat-number">$0</span>
            <span className="stat-label">This Month</span>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-icon">⭐</div>
          <h3>Favorite Venues</h3>
          <p>Your most visited venues</p>
          <div className="card-stats">
            <span className="stat-number">0</span>
            <span className="stat-label">Saved Venues</span>
          </div>
        </div>
      </div>
      
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">🎭</div>
            <div className="activity-content">
              <h4>Welcome to TicketPro!</h4>
              <p>Complete your profile to start booking tickets</p>
              <span className="activity-time">Just now</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn primary">Book New Ticket</button>
          <button className="action-btn secondary">View Seating</button>
          <button className="action-btn tertiary">Update Profile</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
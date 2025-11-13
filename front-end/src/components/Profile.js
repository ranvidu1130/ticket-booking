import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    fetchUserProfile();
  }, [isAuthenticated, navigate]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      if (data.success) {
        setUser(data.data.user);
      } else {
        setError(data.message || 'Failed to load profile');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="loading">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="error">Error: {error}</div>
          <button onClick={() => window.location.href = '/'} className="btn-primary">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="error">No user data found</div>
          <button onClick={() => window.location.href = '/'} className="btn-primary">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>User Profile</h1>
        </div>
        
        <div className="profile-info">
          <div className="profile-field">
            <label>User ID:</label>
            <span>{user.id}</span>
          </div>
          
          <div className="profile-field">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          
          <div className="profile-field">
            <label>First Name:</label>
            <span>{user.first_name}</span>
          </div>
          
          <div className="profile-field">
            <label>Last Name:</label>
            <span>{user.last_name}</span>
          </div>
          
          <div className="profile-field">
            <label>Full Name:</label>
            <span>{user.first_name} {user.last_name}</span>
          </div>
          
          <div className="profile-field">
            <label>Member Since:</label>
            <span>{new Date(user.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="profile-actions">
          <button className="btn-edit">Edit</button>
          <button className="btn-delete">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
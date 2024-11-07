import React, { useState } from 'react';
import axios from 'axios';
import '../index.css'
import { Link } from 'react-router-dom';

function FetchUser() {
  const [profileUrl, setProfileUrl] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2024/api/github/scrape-user', { profileUrl });
      setUserData(response.data);
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('GitHub user profile not found');
      } else {
        setError('Failed to fetch user data');
      }
      setUserData(null);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
      <div className='card px-5 py-4' style={{backgroundColor: "#d4e5c4", width: '100%', maxWidth: '600px'}}>
        <h3 className="text-center mb-5 mt-2 fw-bold">GitHub User Scraper</h3>
        <form onSubmit={handleSubmit} className="row justify-content-center">
          <div className="col-md-12">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter GitHub profile URL"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
              />
              <button className="btn" type="submit"
                style={{
                  borderTopRightRadius: '7px', 
                  borderBottomRightRadius: '7px', 
                  backgroundColor: "#02aee7",
                  color: "white"
                }}>Scrape User</button>

              <Link to={"/all-users"} className='btn ms-3'
                style={{
                  borderRadius: '7px', 
                  backgroundColor: "#8191cc",
                  color: "white"
                }}>All Github Users</Link>
            </div>
          </div>
        </form>
        {error && <div className="alert alert-danger">{error}</div>}

        {userData && (
          <div className="mt-4 text-center">
            <h3>{userData.name}</h3>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Location:</strong> {userData.location}</p>
            <img src={userData.avatar_url} alt={userData.username} className="img-fluid rounded-circle" width="150" />
          </div>
        )}
      </div>
    </div>
  );
}

export default FetchUser;

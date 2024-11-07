import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users 
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:2024/api/github/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } 
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <div className='d-flex justify-content-between align-items-center mb-3'>
      <h3 className="fw-bold text-dark">Github User List</h3>
      <Link 
        to={"/"} 
        className='btn' 
        style={{ backgroundColor: '#4fa7c4', color: 'white' }}
        >
        Find Github User
        </Link>

      </div>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered table-hover table-responsive">
            <thead className="thead-dark">
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.name || 'N/A'}</td>
                    <td>{user.email || 'N/A'}</td>
                    <td>{user.location || 'N/A'}</td>
                    <td>
                      <img
                        src={user.avatar_url}
                        alt={user.username}
                        width="100"
                        className="img-thumbnail"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserList;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const User = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  function loadUsers() {
    axios.get("http://localhost:8080/users").then((response) => {
      setUsers(response.data);
    });
  }

  function deleteUser(id) {
    axios.delete(`http://localhost:8080/users/${id}`).then((response) => {
      loadUsers();
    });
  }
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => navigate(`/contact`)}
      >
        Add New User
      </button>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate(`/update-user/${user.id}`)}
                >
                  Update
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() => navigate(`/view-user/${user.id}`)}
                >
                  View
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

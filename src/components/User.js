import axios from "axios";
import React, { useEffect, useState } from "react";

export const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  function loadUsers() {
    axios.get("http://localhost:8080/users").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  }

  function deleteUser(id) {
    console.log(id)
    axios.delete(`http://localhost:8080/users/${id}`).then((response) => {
      loadUsers();
    });
  }
  return (
    <>
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
                <button type="button" className="btn btn-primary">
                  Update
                </button>
                <button type="button" className="btn btn-danger"
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

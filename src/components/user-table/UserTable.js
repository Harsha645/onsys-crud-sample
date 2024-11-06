import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCreateForm } from "./UserCreateForm";
import { UserUpdateForm } from "./UserUpdateForm";
import { UserViewForm } from "./userViewForm";

export const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [viewCreateForm, setViewCreateForm] = useState(false);
  const [viewUpdateForm, setViewUpdateForm] = useState(false);
  const [viewForm, setViewForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  function loadUsers() {
    axios.get("http://localhost:8080/users").then((response) => {
      setUsers(response.data);
      setViewCreateForm(false);
      setViewUpdateForm(false);
      setViewForm(false);
    });
  }

  function deleteUser(id) {
    axios.delete(`http://localhost:8080/users/${id}`).then((response) => {
      loadUsers();
    });
  }

  function handleCreateFormClick() {
    setViewCreateForm(!viewCreateForm);
    setViewUpdateForm(false);
    setViewForm(false);
  }

  function handleRowClick(id) {
    setSelectedUserId(id);
    setViewForm(false);
    setViewUpdateForm(false);
    setViewUpdateForm(true);
  }
  function handleRowViewClick(id) {
    setSelectedUserId(id);
    setViewUpdateForm(false);
    setViewCreateForm(false);
    setViewForm(false);
    setViewForm(true);
  }

  const handleUserCreated = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
    setViewCreateForm(false);
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleCreateFormClick()}
      >
        Add New User
      </button>

      {viewCreateForm ? <UserCreateForm onUserCreated={handleUserCreated} /> : ""}

      {viewUpdateForm ? (
        <UserUpdateForm userId={selectedUserId} onUserUpdated={loadUsers} />
      ) : (
        ""
      )}
      {viewForm ? <UserViewForm userId={selectedUserId} /> : ""}

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
            <tr key={user.id} className="cursor-pointer">
              <th scope="row" onClick={() => handleRowClick(user.id)}>
                {user.id}
              </th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleRowClick(user.id)}
                >
                  Update
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() => handleRowViewClick(user.id)}
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

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    axios
      .get("http://localhost:8080/users/" + id)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            ID: <small>{user.id}</small>
          </li>
          <li className="list-group-item">Name: <small>{user.name}</small></li>
          <li className="list-group-item">Email: <small>{user.email}</small></li>
          <li className="list-group-item">Password: <small>{user.password}</small></li>
        </ul>
      </div>
    </>
  );
};

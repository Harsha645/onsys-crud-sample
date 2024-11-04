import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateUser = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
      });
    
      const { name, email, password } = formData;
      

      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };

      useEffect(() => {
        getUser();
      },[])
      
      function getUser(){
        axios.get("http://localhost:8080/users/" + id)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      }

      const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put("http://localhost:8080/users/" + id, formData)
        .then((response) => {
          console.log(response);
          navigate('/more')
        })
        .catch((error) => {
          console.log(error);
        });
      };
  return (
    <>
      <form
        className="container"
        style={{ backgroundColor: "lightgray", padding: "20px" }}
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
          Update
        </button>
      </form>
    </>
  );
};

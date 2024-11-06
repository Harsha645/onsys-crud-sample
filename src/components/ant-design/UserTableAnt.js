import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import axios from "axios";
import { UserCreateFormAnt } from "./UserCreateFormAnt";
import { Divider } from "antd";
import { UserViewFormAnt } from "./UserViewFormAnt";
import { UserUpdateFormAnt } from "./UserUpdateFormAnt";

export const UserTableAnt = () => {
  const { Column } = Table;
  const [userData, setUserData] = useState([]);
  const [viewCreateForm, setViewCreateForm] = useState(false);
  const [viewUpdateForm, setViewUpdateForm] = useState(false);
  const [viewForm, setViewForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  function loadUsers() {
    axios.get("http://localhost:8080/users").then((response) => {
      const formattedData = response.data.map((user) => ({
        ...user,
        key: user.id,
      }));
      setUserData(formattedData);
      setViewCreateForm(false);
      setViewUpdateForm(false);
      setViewForm(false);
    });
  }

  function deleteUser(id) {
    const isConfirmed = window.confirm(
      "Are you sure that you want to delete this user?"
    );
    if (isConfirmed) {
      axios.delete(`http://localhost:8080/users/${id}`).then((response) => {
        const updatedUserData = userData.filter((user) => user.id !== id);
        setUserData(updatedUserData);
      });

    }
  }

  function handleCreateFormClick() {
    setViewUpdateForm(false);
    setViewForm(false);
    setViewCreateForm(!viewCreateForm);
  }

  const handleUserCreated = (newUser) => {
    newUser.key = newUser.id;
    setUserData([...userData, newUser]);
    setViewCreateForm(false);
  };
  function handleRowViewClick(id) {
    setSelectedUserId(id);
    setViewUpdateForm(false);
    setViewCreateForm(false);
    setViewForm(false);
    setViewForm(true);
  }

  function handleUpdateClick(id) {
    setSelectedUserId(id);
    setViewForm(false);
    setViewUpdateForm(false);
    setViewUpdateForm(true);
  }

  return (
    <>
      <Button type="primary" onClick={() => handleCreateFormClick()}>
        Add New User
      </Button>
      <Divider />

      {viewCreateForm ? (
        <UserCreateFormAnt onUserCreated={handleUserCreated} />
      ) : (
        ""
      )}
      {viewUpdateForm ? (
        <UserUpdateFormAnt userId={selectedUserId} onUserUpdated={loadUsers} />
      ) : (
        ""
      )}
      {viewForm ? <UserViewFormAnt userId={selectedUserId} /> : ""}

      <Divider />
      <Table dataSource={userData}>
        <Column title="ID" dataIndex="id" key="id"/>
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Password" dataIndex="password" key="password" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button
                type="primary"
                onClick={() => handleUpdateClick(record.id)}
              >
                Update
              </Button>
              <Button
                color="default"
                variant="solid"
                onClick={() => handleRowViewClick(record.id)}
              >
                View
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => deleteUser(record.id)}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";

export const UserViewFormAnt = ({ userId }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    getUser();
  }, [userId]);

  function getUser() {
    axios
      .get("http://localhost:8080/users/" + userId)
      .then((response) => {
        form.setFieldsValue({
          name: response.data.name,
          email: response.data.email,
          password: response.data.password,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input readOnly/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password readOnly/>
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
          <Input readOnly/>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
        </Form.Item>
      </Form>
    </>
  );
};

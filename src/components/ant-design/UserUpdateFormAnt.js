import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect } from "react";

export const UserUpdateFormAnt = ({ userId, onUserUpdated }) => {
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

  const onFinish = async (values) => {
    await axios
      .put("http://localhost:8080/users/" + userId, values)
      .then((response) => {
        onUserUpdated();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
          <Input />
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
          <Input.Password/>
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        ></Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </>
  );
};

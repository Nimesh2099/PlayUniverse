import React from "react";
import { Form, Input, Button, Typography } from "antd";
import {
  UserOutlined,
} from "@ant-design/icons";
import "./ResetPassword.scss";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const { Text, Link } = Typography;

const ResetPassword = () => {
  const navigate = useNavigate();

  const sendPasswordResetEmailFunc = (values) => {
    const auth = getAuth();
    const { email } = values;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent to your email address");
        setTimeout(() => {
          navigate("../login");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-header">Reset password</h1>
        <Form
          name="password-form"
          initialValues={{ remember: true }}
          onFinish={(values) => sendPasswordResetEmailFunc(values)}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className="input-field"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button" size='large'>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;

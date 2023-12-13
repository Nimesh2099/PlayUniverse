import React from "react";
import { Form, Input, Button, Typography, notification } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { handleLogin, handleGoogleLogin } from "../../../firebase/api";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const { Text, Link } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const key = "updatable";
  const openNotification = () => {
    api.error({
      key,
      message: <p style={{ color: "red" }}>Invalid credentials</p>,
    });
    setTimeout(() => {
      api.destroy();
    }, 2000);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-header">Login</h1>
        {contextHolder}
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={(values) => handleLogin(values, navigate, openNotification)}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className="input-field"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              className="input-field"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              size="large"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div className="divider">Or</div>
        <div className="social-login">
          <Button
            size="large"
            htmlType="button"
            className="google-button"
            onClick={handleGoogleLogin}
            icon={<GoogleOutlined />}
          >
            Google Login
          </Button>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <Link href="../registration">
            Don't have account ? Register from here
          </Link>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <Link href="../reset-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

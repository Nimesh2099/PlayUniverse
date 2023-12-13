import React from 'react';
import { Form, Input, Button, DatePicker, Typography } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { doc, setDoc, collection } from 'firebase/firestore';
import { auth, firestore } from '../../../firebase/utils'; // Make sure to import your Firebase auth object
import './Register.scss'; // Import your custom styles

const { Link } = Typography;

const Registration = () => {
  const onFinish = async (values) => {
    try {
      const { email, password, username, firstName, lastName, birthdate } =
        values;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const formattedBirthdate = birthdate.format('MM/DD/YYYY');

      const usersCollection = collection(firestore, 'users');
      await setDoc(doc(usersCollection, user.uid), {
        username,
        email,
        firstName,
        lastName,
        birthdate: formattedBirthdate,
        isAdmin: false,
        is_blocked: false,
        user_id: user.uid,
        pointsEarned: 0,
      });

      console.log('User registered and data saved to Firestore:', user);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-form'>
        <h1 className='login-header'>Register</h1>
        <Form name='registration-form' onFinish={onFinish}>
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Username'
              className='input-field'
            />
          </Form.Item>
          <Form.Item
            name='firstName'
            rules={[
              { required: true, message: 'Please enter your first name' },
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='First Name'
              className='input-field'
            />
          </Form.Item>
          <Form.Item
            name='lastName'
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Last Name'
              className='input-field'
            />
          </Form.Item>
          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Invalid email format' },
            ]}
          >
            <Input
              prefix={<MailOutlined className='site-form-item-icon' />}
              placeholder='Email'
              className='input-field'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please enter your password',
              },
              {
                min: 6,
                message: 'Password must be at least 6 characters long!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
              className='input-field'
            />
          </Form.Item>
          <Form.Item
            name='confirmPassword'
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords do not match')
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Confirm Password'
              className='input-field'
            />
          </Form.Item>
          <Form.Item
            name='birthdate'
            rules={[
              { required: true, message: 'Please select your birthdate' },
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              placeholder='Birthdate'
              format='MM/DD/YYYY'
              allowClear={false}
              suffixIcon={<CalendarOutlined className='site-form-item-icon' />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-button'
              size='large'
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <div>
          <Link href='../login'>Already have account ? Login from here</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;

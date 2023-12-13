import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
  Button,
  Modal,
  Typography,
  Form,
  Input,
  Card,
  Space,
} from 'antd';
import { auth } from '../../firebase/utils';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import './styles.scss';
import { getUserData, updateUserData } from '../../firebase/api';
const { Title, Text } = Typography;

function EditProfileModal({ user, editModal, handleCancel, onFinish }) {
  const [form] = Form.useForm();
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    form.resetFields(); // Reset the form fields when the modal is opened
  }, [editModal]);

  const handleFormChange = () => {
    // Check if the form values are different from the initial data
    const formData = form.getFieldsValue();
    const hasChanges =
      formData.firstName !== user.firstName ||
      formData.lastName !== user.lastName;
    setUnsavedChanges(hasChanges);
  };

  return (
    <Modal
      title='Edit Profile'
      visible={editModal}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400, margin: 'auto' }}
        initialValues={{ firstName: user.firstName, lastName: user.lastName }}
        onFinish={onFinish}
        autoComplete='off'
        onValuesChange={handleFormChange}
      >
        <Form.Item
          label='First Name'
          name='firstName'
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input placeholder='Enter your first name' />
        </Form.Item>

        <Form.Item
          label='Last Name'
          name='lastName'
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input placeholder='Enter your last name' />
        </Form.Item>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button type='primary' htmlType='submit' style={{ marginRight: 10 }}>
            Submit
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </Form>
    </Modal>
  );
}

const Profilepage = () => {
  // const [file, setfile] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profileImage: '',
  });

  const logOutUser = async () => {
    try {
      await auth.signOut();
      console.log('User signed out');
      // You can redirect or perform other actions here.
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  const sendPasswordResetEmailFunc = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        alert('Password reset email sent to your email address');
      })
      .catch((error) => {
        console.error('Error sending password reset email:', error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        await getUserData(setUser, userId);
      } else {
        // Handle the case when the user is not signed in
        console.log('User is not signed in.');
      }
      // Unsubscribe the listener after getting the user data or handling the state
      unsubscribe();
    });
  };

  const showModal = () => {
    setEditModal(true);
  };

  const onFinish = async (values) => {
    const { firstName, lastName } = values;
    updateUserData(user.user_id, {
      firstName: firstName,
      lastName: lastName,
    });
    setEditModal(false);
  };

  const handleCancel = () => {
    setEditModal(false);
  };

  return (
    <Row justify='center' style={{ marginTop: '18rem', height: '66vh' }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Card title='User Profile' style={{ borderRadius: 8, padding: 20 }}>
          <Title level={3}>{`${user.firstName} ${user.lastName}`}</Title>
          <Text type='secondary'>{user.email}</Text>

          <Space direction='vertical' style={{ width: '100%', marginTop: 20 }}>
            <Button type='primary' block onClick={showModal}>
              Edit Profile
            </Button>

            <Button block onClick={sendPasswordResetEmailFunc} danger>
              Reset Password
            </Button>

            <Button block onClick={logOutUser} type='text'>
              Log Out
            </Button>
          </Space>

          <EditProfileModal
            editModal={editModal}
            handleCancel={handleCancel}
            onFinish={onFinish}
            user={user}
            key={JSON.stringify(user)}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Profilepage;

{
  /* <Col span={24} className="profile-image">
        <Image
          width={300}
          height={300}
          className="pro-img"
          src={user.profileImage}
        />
      </Col> */
}
{
  /* <Col span={24} style={{ alignSelf: "center" }}>
        <Upload
          showUploadList={false}
          maxCount={1}
          onChange={(e) => setfile(e.file)}
        >
          <Button icon={<UploadOutlined />}>Change Profile</Button>
        </Upload>
      </Col> */
}

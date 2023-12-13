import React, { useState, useEffect } from 'react';
import {
  Button,
  Popconfirm,
  Table,
  Form,
  Input,
  Col,
  DatePicker,
  Drawer,
  Row,
  Select,
} from 'antd';
import { firestore } from '../../firebase/utils';
import { collection, getDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import {
  getGamesListApi,
  getUserData,
  updateGameData,
} from '../../firebase/api';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

function EditGameSideBar({
  onClose,
  open,
  isEdit,
  onFinish,
  initialDataForEdit,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields(); // Reset the form fields when the modal is opened
  }, []);

  return (
    <Drawer
      title='Add new game'
      width={720}
      onClose={onClose}
      visible={open} // Use 'visible' instead of 'open'
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={<Button onClick={onClose}>Cancel</Button>}
    >
      <Form
        form={form}
        layout='vertical'
        hideRequiredMark
        initialValues={initialDataForEdit}
        onFinish={(values) => onFinish(values, isEdit)}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='title'
              label='Title'
              rules={[{ required: true, message: 'Please enter Title' }]}
            >
              <Input placeholder='Please enter Title' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='special_notes'
              label='Special notes'
              rules={[
                { required: false, message: 'Please enter Special notes' },
              ]}
            >
              <Input placeholder='Please enter Special notes' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='age_rating'
              label='Age Rating'
              rules={[{ required: false, message: 'Please enter Age Rating' }]}
            >
              <Select placeholder='Please select an Age Rating'>
                <Option value='18+'>18+</Option>
                <Option value='15+'>15+</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='photo'
              label='Photo Url'
              rules={[{ required: true, message: 'Please enter Photo Url' }]}
            >
              <Input
                style={{ width: '100%' }}
                addonBefore='http://'
                addonAfter='.com'
                placeholder='Please enter Photo Url'
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='banner'
              label='Banner Url'
              rules={[{ required: true, message: 'Please enter banner Url' }]}
            >
              <Input
                style={{ width: '100%' }}
                addonBefore='http://'
                addonAfter='.com'
                placeholder='Please enter banner Url'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='genre'
              label='Genre'
              rules={[{ required: true, message: 'Please select an genre' }]}
            >
              <Select placeholder='Please select an genre'>
                <Option value='action'>Action</Option>
                <Option value='racing'>Racing</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            {!isEdit && (
              <Form.Item
                name='release_date'
                label='Release date'
                rules={[
                  {
                    required: true,
                    message: 'Please choose the release datexxx',
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            )}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name='description'
              label='Description'
              rules={[
                {
                  required: true,
                  message: 'please enter  description',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder='please enter description' />
            </Form.Item>
          </Col>
        </Row>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form>
    </Drawer>
  );
}

const { Option } = Select;

const AdminGamesList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState('');
  const [initialDataForEdit, setInitialDataForEdit] = React.useState();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setInitialDataForEdit(null);
  };

  const [games, setGames] = useState([]);

  const getGames = () => {
    getGamesListApi(setGames);
  };

  React.useEffect(() => {
    getGames();
  }, []);

  React.useEffect(() => {
    document.getElementById('root').className = 'no-scroll';
    return () => {
      document.getElementById('root').className = '';
    };
  }, []);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Age rating',
      dataIndex: 'age_rating',
      key: 'age_rating',
    },
    {
      title: 'Release date',
      dataIndex: 'release_date',
      key: 'release_date',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button
            className='action-btn-block'
            onClick={() => handleGetGame(record.id)}
          >
            Edit
          </Button>

          <Popconfirm
            title={`Are you sure you want to delete this game?`}
            onConfirm={() => {
              handleDelete(record.id);
            }}
            okText='Yes'
            cancelText='No'
          >
            <Button className='action-btn-delete' style={{ marginLeft: 8 }}>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const handleDelete = async (gameId) => {
    console.log(`Block user with ID: ${gameId}`);
    await deleteDoc(doc(firestore, 'games', gameId));
    getGames();
  };

  const handleGetGame = async (gameId) => {
    setEditId(gameId);
    console.log(`Edit game with ID: ${gameId}`);
    try {
      const docRef = doc(firestore, 'games', gameId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        delete data.release_date;
        setInitialDataForEdit(data);
        setOpen(true);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting game:', error);
    }
  };

  const onFinish = async (values, isEdit) => {
    onClose();
    if (isEdit) {
      await updateGameData(editId, values);
    } else {
      await addDoc(collection(firestore, 'games'), {
        ...values,
        release_date: values.release_date.toString(),
        comments: [],
        game_id: uuidv4(),
        ratings: [],
      });
    }
    setEditId('');

    getGames();
  };

  useEffect(() => {
    getUserData((value) => {
      if (value.isAdmin) {
        console.log('----->user is admin`');
      } else {
        navigate('/');
        console.log('no admin');
      }
    });
  }, []);

  return (
    <div style={{ margin: '10rem 25rem' }}>
      <Button type='primary' onClick={showDrawer}>
        Add Game
      </Button>
      <div className='table-container' style={{ marginTop: '10px' }}>
        <Table
          columns={columns}
          dataSource={games}
          className='user-table'
          pagination={false}
          style={{
            background: 'black',
            color: 'white',
          }}
        />
      </div>
      <EditGameSideBar
        onClose={onClose}
        onFinish={onFinish}
        open={open}
        isEdit={Boolean(initialDataForEdit)}
        initialDataForEdit={initialDataForEdit}
        key={JSON.stringify(initialDataForEdit)}
      />
    </div>
  );
};

export default AdminGamesList;

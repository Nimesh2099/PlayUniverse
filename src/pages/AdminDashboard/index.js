import React, { useState, useEffect } from 'react';
import { Button, Popconfirm, Table } from 'antd';
import { firestore } from '../../firebase/utils';
import { getUserData } from '../../firebase/api';
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    const q = query(collection(firestore, 'users'));
    onSnapshot(q, (querySnapshot) => {
      let usersArray = [];
      querySnapshot.forEach((doc) => {
        usersArray.push({ ...doc.data(), id: doc.id });
      });
      setUsers(usersArray);
    });
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  React.useEffect(() => {
    document.getElementById('root').className = 'no-scroll';
    return () => {
      document.getElementById('root').className = '';
    };
  }, []);

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Popconfirm
            title={`Are you sure you want to ${
              !record.isBlock ? 'Block' : 'Unblock'
            } this user?`}
            onConfirm={() => handleBlock(record.id, Boolean(record.isBlock))}
            okText='Yes'
            cancelText='No'
          >
            <Button className='action-btn-block' style={{ marginLeft: 8 }}>
              {!record.isBlock ? 'Block' : 'Unblock'}
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const handleBlock = async (userId, isBlock) => {
    await updateDoc(doc(firestore, 'users', userId), { isBlock: !isBlock });
    getUsers();
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
    <div style={{ margin: '8rem 25rem' }}>
      <div className='table-container'>
        <Table
          columns={columns}
          dataSource={users}
          className='user-table'
          pagination={false}
          style={{
            background: 'black',
            color: 'white',
          }}
        />
      </div>
    </div>
  );
};

export default AdminDashBoard;

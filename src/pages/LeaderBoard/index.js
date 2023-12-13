import React, { useState } from 'react';
import { Table } from 'antd';
import { firestore } from '../../firebase/utils';
import { getUserData } from '../../firebase/api';
import { collection, query, onSnapshot } from 'firebase/firestore';
import './styles.scss';
const LeaderBoard = () => {
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Points',
      dataIndex: 'pointsEarned',
      key: 'pointsEarned',
      sorter: {
        compare: (a, b) => a.pointsEarned - b.pointsEarned,
      },
    },
  ];
  const [users, setUsers] = useState([]);
  React.useEffect(() => {
    getUsers();
  }, []);

  React.useEffect(() => {
    document.getElementById('root').className = 'no-scroll';
    return () => {
      document.getElementById('root').className = '';
    };
  }, []);

  const getUsers = () => {
    const q = query(collection(firestore, 'users'));
    onSnapshot(q, (querySnapshot) => {
      let usersArray = [];
      querySnapshot.forEach((doc) => {
        usersArray.push({ ...doc.data(), id: doc.id });
      });
      const sortedUsers = usersArray.sort((a, b) => {
        return b.pointsEarned - a.pointsEarned;
      });

      console.log('sortedUsers', sortedUsers);
      setUsers(sortedUsers);
    });
  };

  return (
    <div style={{ margin: '8rem 25rem' }}>
      <div className='table-container'>
        <Table
          sortDirections='asc'
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

export default LeaderBoard;

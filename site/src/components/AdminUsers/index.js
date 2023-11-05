import React from 'react'
import './styles.scss';
import {useState, useEffect} from 'react'
import {collection, getDocs, deleteDoc, doc} from "firebase/firestore"
import { firestore } from '../../firebase/utils';
import AddUser from './addUser';

function UserTable() {

  const [users,setUsers] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const getData = async()=>{
    const userCol = collection(firestore, 'users');
    const userSnapshot = await getDocs(userCol);
    console.log(userSnapshot);
    const userList = userSnapshot.docs.map(doc => {
      return {
        id:doc.id,
        ...doc.data()
        }
    });
    setUsers(userList);
  }

  const onDelete = async(id)=>{
    const snapshot = await deleteDoc(doc(firestore, "users", id));
    getData()
  }
  const onUpdate = (user)=>{
    setSelectedUser(user)
    setModalShow(true)
  }

  useEffect(() => {
    getData()
  },[])
    return(
        <div>
        <button onClick={() => setModalShow(true)}>Add New User</button>
        <table className="table">
  <caption>List of Users</caption>
  <thead>
    <tr>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
      <th scope="col">Age</th>
      <th scope="col">UserType</th>
      <th scope='col'>Delete</th>
      <th scope='col'>Update</th>
    </tr>
  </thead>
  <tbody>
  {
        users.map((user)=>(
          <tr>
            <td>{user.displayName}</td>
            <td>{user.email}</td>
            <td>{user.pass}</td>
            <td>{user.age}</td>
            <td>{user.usertype}</td>
            <td><button onClick={()=>onDelete(user.id)}>Delete</button></td>
            <td><button onClick={()=>onUpdate(user)}>Update</button></td>
          </tr>
        ))
      }
  </tbody>
  </table>
  <AddUser
        show={modalShow}
        onHide={() => setModalShow(false)}
        isEdit={selectedUser && selectedUser.id !==''}
        selectedUser={selectedUser}
      />
  </div>
    )
}

export default UserTable
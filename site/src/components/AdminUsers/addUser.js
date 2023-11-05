import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { firestore } from "../../firebase/utils";

function AddUser(props) {
    const [values, setValues] = useState({
        displayName: '',
        email: '',
        pass: '',
        age: '',
        usertype: '',
    });

    useEffect (()=>{
        if(props.isEdit && props.selectedUser && props.selectedUser.id){
        setValues({
        ...props.selectedUser
        })
      }
      },[props])

      const changeHandler = (event)=>{

        const name = event.target.name
        const value = event.target.value

        setValues((values)=>({
            ...values ,[name]:value
        }))
    }

    const saveValues = async () => {
        console.log(values);
        const docRef = await addDoc(collection(firestore, "users"), values);
    };

    const editValues = async () => {
        console.log(values);
        const userRef = doc(firestore, "users", props.selectedUser.id);
        await updateDoc(userRef, values);
    };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Add new user
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <form> */}
            <div className="form-group">
                <label for="displayName">Username:</label>
                <input type="text" className="form-control" id="displayName"  name='displayName' value={values.displayName} placeholder="Username" onChange={changeHandler} />
            </div>
            <div className="form-group">
                <label for="email">Email:</label>
                <input type="email" className="form-control" id="email" name='email' value={values.email} placeholder="xyz@example.com" onChange={changeHandler} />
            </div>
            <div className="form-group">
                <label for="pass">Password:</label>
                <input type="text" className="form-control" id="pass" name='pass' value={values.pass} placeholder="pass" onChange={changeHandler} />
            </div>
            <div className="form-group">
                <label for="age">Age:</label>
                <input type="text" className="form-control" id="age" name='age' value={values.age} placeholder="Age" onChange={changeHandler} />
            </div>
            <div className="form-group">
                <label for="usertype">User Type:</label>
                <input className="custom-select" id='usertype' name='usertype' placeholder="User/Admin/Blocked" value={values.usertype} 
                onChange={changeHandler} />
            </div>
            
            <div className='form-group-btn'>
                {
                    props.isEdit?
                    <button className='btn btn-primary' onClick={editValues}>Update User</button>:
                    <button className='btn btn-primary' onClick={saveValues}>Create New User</button>
                }
            </div>
        {/* </form> */}
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddUser
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { firestore } from "../../firebase/utils";

function AddGame(props) {
    const [values, setValues] = useState({
        title: '',
        photo: '',
        description: '',
        genre:'',
        release:'',
        age_rating:'',
        special_notes:'',
    });

    useEffect (()=>{
        if(props.isEdit && props.selectedGame && props.selectedGame.id){
        setValues({
        ...props.selectedGame
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

    const saveValues = async()=>{
        console.log(values);
        const docRef = await addDoc(collection(firestore, "games"), values);
    }
    const editValues = async()=>{
        console.log(values);
        //const docRef = await updateDoc(collection(firestore, "games",props.selectedGame.id), values);

        const gameRef = doc(firestore, "games", props.selectedGame.id);

        // Atomically add a new region to the "regions" array field.
        await updateDoc(gameRef, values);
    }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Add new game
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
            <div className="form-group">
                <label for="gameTitle">Game Title:</label>
                <input type="text" className="form-control" id="title"  name='title' value={values.title} placeholder="Game Title" onChange={changeHandler} />
            </div>
            <div className="form-group">
                <label for="gamePhoto">Game Photo:</label>
                <input type="text" className="form-control" id="photo" name='photo' value={values.photo} placeholder="filename.extension" onChange={changeHandler} />
            </div>
            <div className="form-group">
                <label for="gameDesc">Game Description:</label>
                <input type="text" className="form-control" id="description" name='description' value={values.description} placeholder="Game Description" onChange={changeHandler} />
            </div>
            <div className="form-group">
                <label for="gameGenre">Game Genre:</label>
                <input type="text" className="form-control" id="genre" name='genre' value={values.genre} placeholder="Game Genre" onChange={changeHandler} />
            </div>
            <div className="form-group">
                <label for="release">Release Status:</label>
                <input type="text" className="form-control" id="release" name='release' value={values.release} placeholder="Release Status (coming soon/release date)" onChange={changeHandler} />
            </div>
            <div className="form-group">
                <label for="rating">Age Rating:</label>
                <input type="text" className="form-control" id="age_rating" name='age_rating' value={values.age_rating} placeholder="Age Rating" onChange={changeHandler} />
            </div>
            <div className="form-group">
                <label for="notes">Special Notes:</label>
                <input type="text" className="form-control" id="special_notes" name='special_notes' value={values.special_notes} placeholder="Special Notes" onChange={changeHandler} />
            </div>
            <div className='form-group-btn'>
                {
                    props.isEdit?
                    <button className='btn btn-primary' onClick={editValues}>Update Game</button>:
                    <button className='btn btn-primary' onClick={saveValues}>Create New Game</button>
                }
            </div>
        </form>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddGame
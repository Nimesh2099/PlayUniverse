import React from 'react'
import './styles.scss';
import {useState, useEffect} from 'react'
import {collection, getDocs, deleteDoc, doc} from "firebase/firestore"
import { firestore } from '../../firebase/utils';
import AddGame from './addGame';

function GameTable() {
  //const staticPath = '../../assets/'
  const [games,setGames] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const getData = async()=>{
    const gamesCol = collection(firestore, 'games');
    const gameSnapshot = await getDocs(gamesCol);
    console.log(gameSnapshot);
    const gameList = gameSnapshot.docs.map(doc => {
      return {
        id:doc.id,
        ...doc.data()
        }
    });
    setGames(gameList);
  }
  const onDelete = async(id)=>{
    const snapshot = await deleteDoc(doc(firestore, "games", id));
    getData()
  }
  const onUpdate = (game)=>{
    setSelectedGame(game)
    setModalShow(true)
  }
  useEffect(() => {
    getData()
  },[])
    return(
        <div>
          <button onClick={() => setModalShow(true)}>Add New Game</button>
        <table className="table">
  <caption>List of Games</caption>
  <thead>
    <tr>
      <th scope="col">Game title</th>
      <th scope="col">Title Image</th>
      <th scope="col">Description</th>
      <th scope="col">Genre</th>
      <th scope="col">Release Status</th>
      <th scope="col">Age Rating</th>
      <th scope="col">Special Notes</th>
      <th scope='col'>Delete</th>
      <th scope='col'>Update</th>
      <th scope='col'>View</th>
    </tr>
  </thead>
  <tbody>
      {
        games.map((game)=>(
          <tr>
            <td>{game.title}</td>
            <td><img src={`../../assets/${game.photo}`} alt={game.photo}></img></td>
            <td>{game.description}</td>
            <td>{game.genre}</td>
            <td>{game.release}</td>
            <td>{game.age_rating}</td>
            <td>{game.special_notes}</td>
            <td><button onClick={()=>onDelete(game.id)}>Delete</button></td>
            <td><button onClick={()=>onUpdate(game)}>Update</button></td>
            <td><button >View</button></td>
          </tr>
        ))
      }
  </tbody>
  </table>
  <AddGame
        show={modalShow}
        onHide={() => setModalShow(false)}
        isEdit={selectedGame && selectedGame.id!==''}
        selectedGame={selectedGame}
      />
  </div>
    )
}

export default GameTable
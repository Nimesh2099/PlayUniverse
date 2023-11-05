import React,{ Component } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import './default.scss';
import {auth,handleUserProfile} from './firebase/utils';

// Layouts
import Mainlayout from "./layouts/MainLayout";
import HomePagelayout from "./layouts/HomePageLayout";

// Pages
import Homepage from "./pages/Homepage/Index";
import Registration from "./pages/Registration/index";
import LoginPage from "./pages/Loginpage/index";
import RecoveryPage from "./pages/RecoveryPage/index";
import UserTable from "./components/AdminUsers";
import GameTable from "./components/AdminGames";

const initialState = {
  currentUser: null
}

class App extends Component {

  constructor(props){
    super(props);
    this.state= {
      ...initialState
    };
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        // Assuming `handleUserProfile` returns the user data as an object
        this.setState({
          currentUser: userRef,
        });
      } else {
        this.setState({
          currentUser: null, // No user is signed in
        });
      }
    });
  }
  
  componentWillUnmount(){
    this.authListener();
  }

  render(){
    const{currentUser} = this.state;

    return (
      <div className="App">
        <div className="main">
          <Routes>
            <Route path="/" element={
              <HomePagelayout currentUser={currentUser}>
                <Homepage />
              </HomePagelayout>
            } />
  
            <Route path="/registration" element={currentUser ? (
              <Navigate to="/" />) :(
              <Mainlayout currentUser={currentUser}>
                <Registration />
              </Mainlayout>)} />
  
            <Route path="/login" element={currentUser ? (
              <Navigate to="/" />) : (
              <Mainlayout currentUser={currentUser}>
                <LoginPage />
              </Mainlayout>)} />

            <Route path="/recovery" element={
              <Mainlayout currentUser={currentUser}>
                <RecoveryPage />
              </Mainlayout>
            } />

            <Route path="/admin-users" element={
              <Mainlayout currentUser={currentUser}>
                <UserTable />
              </Mainlayout>
            } />

            <Route path="/admin-games" element={
              <Mainlayout currentUser={currentUser}>
                <GameTable />
              </Mainlayout>
            } />
          </Routes>

          
        </div>
      </div>
    );
  }
}

export default App;

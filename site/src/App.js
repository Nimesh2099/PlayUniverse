import React,{ Component } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import './default.scss';
import {auth,handleUserProfile} from './firebase/utils';

// Layouts
import Mainlayout from "./layouts/MainLayout";
import HomePagelayout from "./layouts/HomePageLayout";

// Pages
import Homepage from "./pages/Homepage/Index";
import Registration from "./pages/Registration/index"
import LoginPage from "./pages/Loginpage";

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


  // componentDidMount() {
  //   this.authListener = auth.onAuthStateChanged(async (userAuth) => {
  //     if (userAuth) {
  //       const userRef = await handleUserProfile(userAuth);
  //       userRef.onSnapshot((snapshot) => {
  //         this.setState({
  //           currentUser: {
  //             id: snapshot.id,
  //             ...snapshot.data(),
  //           },
  //         });
  //       });
  //     } else {
  //       this.setState({
  //         ...initialState
  //       });
  //     }
  //   });
  // }
  

  // componentWillUnmount(){
  //   this.authListener();

  // }

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
  
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;

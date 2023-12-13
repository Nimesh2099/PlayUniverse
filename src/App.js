import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import HomePagelayout from "./layouts/HomePageLayout";
import PrivateRoute from "./Auth";
import { auth } from "./firebase/utils";
// Pages
import Homepage from "./pages/Homepage/Index";
import Gamepage from "./pages/Gamespage/index";
import Registration from "./pages/Authentication/Register/index";
import Login from "./pages/Authentication/Login/index";
import AdminDashBoard from "./pages/AdminDashboard";
import AdminGamesList from "./pages/AdminGamesList/index";
import ResetPassword from "./pages/Authentication/ResetPassword/index";
import Profilepage from "./pages/Profilepage";
import Playgame from "./pages/Playagame";
import GameDetails from "./pages/GameDetails";
import "./default.scss";
import LeaderBoard from "./pages/LeaderBoard";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="main" style={{ marginTop: "-8.5rem" }}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <HomePagelayout>
                  <Homepage />
                </HomePagelayout>
              }
            />

            <Route path="/playgame/:id" element={<Playgame />} />
            <Route
              path="/leaderboard"
              element={
                <PrivateRoute>
                  <HomePagelayout>
                    <LeaderBoard />
                  </HomePagelayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/games"
              element={
                <PrivateRoute>
                  <HomePagelayout>
                    <Gamepage />
                  </HomePagelayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin-dashboard-users"
              element={
                <PrivateRoute>
                  <HomePagelayout>
                    <AdminDashBoard />
                  </HomePagelayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin-dashboard-games"
              element={
                <PrivateRoute>
                  <HomePagelayout>
                    <AdminGamesList />
                  </HomePagelayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/gamedetails"
              element={
                <PrivateRoute>
                  <HomePagelayout>
                    <GameDetails />
                  </HomePagelayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <HomePagelayout>
                    <Profilepage />
                  </HomePagelayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/login"
              element={
                currentUser ? (
                  <Navigate to="/" />
                ) : (
                  <HomePagelayout>
                    <Login />
                  </HomePagelayout>
                )
              }
            />

            <Route
              path="/registration"
              element={
                currentUser ? (
                  <Navigate to="/" />
                ) : (
                  <HomePagelayout>
                    <Registration />
                  </HomePagelayout>
                )
              }
            />

            <Route
              path="/reset-password"
              element={
                currentUser ? (
                  <Navigate to="/" />
                ) : (
                  <HomePagelayout>
                    <ResetPassword />
                  </HomePagelayout>
                )
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;

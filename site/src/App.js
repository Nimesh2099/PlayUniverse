import React from "react";
import { Route, Routes } from 'react-router-dom';
import './default.scss';

// Layouts
import Mainlayout from "./layouts/MainLayout";
import HomePagelayout from "./layouts/HomePageLayout";

// Pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration/index"

function App() {
  return (
    <div className="App">
      <div className="main">
        <Routes>
          <Route path="/" element={
            <HomePagelayout>
              <Homepage />
            </HomePagelayout>
          } />

          <Route path="/registration" element={
            <Mainlayout>
              <Registration />
            </Mainlayout>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;

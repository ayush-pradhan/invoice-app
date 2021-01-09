import React, { Component } from 'react';
import {UserForm} from './components/UserForm';
import './App.css';
import Mountains from './videos/mountains.mp4';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Main from './components/MainComponent';
function App() {
  return (
    <div className="App">
      <video autoPlay loop muted
      style={{
        position: "absolute",
        width: "100%",
        left: "50%",
        top: "50%",
        height: "100%",
        objectFit: "cover",
        transform: "translate(-50%, -50%)",
        zIndex: "-1"
      }}
      >
        <source src={Mountains} type="video/mp4"/>
      </video>
      <Main/>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";
import List from "./pages/list.jsx";
import Battle from "./pages/battle.jsx";
import './styles/styles.css';
//import { ResponseProvider } from './contexts/responseContext.jsx'
import {BattleContextProvider} from './components/battleContext.jsx';


function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/about" element = {<About/>} />
        <Route path="/list" element = {<List/>} />
        <Route path="/battle" element = {<Battle/>} />
      </Routes>
    </Router>
  );
}

// Use ReactDOM.createRoot to render the entire Main component
ReactDOM.createRoot(document.getElementById('root')).render(
  <BattleContextProvider>
    <Main />
  </BattleContextProvider>
);

/*
//Stric Mode -> todo: research about it

// Use ReactDOM.createRoot to render the entire Main component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BattleContextProvider>
      <Main />
    </BattleContextProvider>

  </React.StrictMode>
);

*/
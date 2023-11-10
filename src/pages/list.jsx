//import * as React from "react";
//import { Link } from "wouter";
import React, { useState, useEffect, useContext } from 'react';
import "../styles/list.css"
//import { login } from '../../components/api';
//import { useNavigate } from 'react-router-dom';
//import { useResponse } from '../../contexts/responseContext'
//import { setCookie, getCookie, deleteCookie } from '../../cookieHandler';
import { BattleContext, BattleContextProvider } from '../components/battleContext';
import { useNavigate } from 'react-router-dom';

class Item {
  constructor(name) {
    this.name = name;

    this.win = [];
    this.lose = [];
    this.position = 0;
  }
}


export default function List() {

  
  
  // State to manage input values
  const [inputValues, setInputValues] = useState(Array(10).fill(''));

  const { unsortedList, setUnsortedList } = useContext(BattleContext);

  const navigate = useNavigate();



  // Function to handle "Rank" button click
  const handleRankClick = () => {

    // Create Item objects for each input value
    const itemObjects = inputValues.map((value) => new Item(value));

    console.log(`itemObjects: ${JSON.stringify(itemObjects)}`);

    setUnsortedList(itemObjects);

    navigate('/battle');

  }



  return (
    <div>
      <h1>Ranking Items</h1>
      {inputValues.map((value, index) => (
        <div key={index}>
          <label>{`Item ${index + 1}`}</label>
          <input
            type="text"
            value={inputValues[index]}
            onChange={(e) => {
              const newInputValues = [...inputValues];
              newInputValues[index] = e.target.value;
              setInputValues(newInputValues);
            }}
          />
        </div>
      ))}
      <button onClick={handleRankClick}>Rank</button>
    </div>
  );
}


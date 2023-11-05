//import * as React from "react";
//import { Link } from "wouter";
import React, { useState } from 'react';
import "../styles/list.css"
//import { login } from '../../components/api';
//import { useNavigate } from 'react-router-dom';
//import { useResponse } from '../../contexts/responseContext'
//import { setCookie, getCookie, deleteCookie } from '../../cookieHandler';


//declare variables

//declare functions



export default function List() {

  
  
  // State to manage input values
  const [inputValues, setInputValues] = useState(Array(10).fill(''));
  
  // State to control the display of content
  const [showContent, setShowContent] = useState(false);
  
  // State to store itemA and itemB
  const [itemA, setItemA] = useState('Item A');
  const [itemB, setItemB] = useState('Item B');

  // Function to handle "Rank" button click
  const handleRankClick = () => {
    setShowContent(true);
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
      
      {showContent && (
        <div>
          <h2>Which one do you prefer?</h2>
          <button onClick={() => setItemA(inputValues[0])}>{itemA}</button>
          <button onClick={() => setItemB(inputValues[1])}>{itemB}</button>
        </div>
      )}
    </div>
  );
}

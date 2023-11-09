//import * as React from "react";
//import { Link } from "wouter";
import React, { useState, useEffect } from 'react';
import "../styles/list.css"
//import { login } from '../../components/api';
//import { useNavigate } from 'react-router-dom';
//import { useResponse } from '../../contexts/responseContext'
//import { setCookie, getCookie, deleteCookie } from '../../cookieHandler';


class Item {
  constructor(name) {
    this.name = name;

    this.win = [];
    this.lose = [];
    this.position = 0;
  }
}


//declare variables
var counter = 0;
var firstRound = true;
var array = [];
var k = 0;
var i = 1;
var isBattle = 0;
var maxWinSum = 0;
//var sortedList = [new Item("test")];

function battle(array, a, b) {
  if(parseInt(array[a].name) < parseInt(array[b].name)) {
    array[a].win.push(array[b].name);
    array[b].lose.push(array[a].name);
    console.log(`${array[a].name} ganhou de ${array[b].name}`);
    updateOthers(array, array[a].name, array[b].name);
  } else {
    array[b].win.push(array[a].name);
    array[a].lose.push(array[b].name);
    updateOthers(array, array[b].name, array[a].name);
    console.log(`${array[a].name} perdeu para ${array[b].name}`);
  }
  counter++;
}

function updateOthers(array, w, l) {

  for(let k = 0; k < array.length; k++) {
      if((array[k].win.includes(w) || array[k].name == w) && !array[k].win.includes(l)) {
        console.log(`atualizei ${array[k].name}: ganha de ${l}`);
        array[k].win.push(l);
        updateOthers(array, array[k].name, l); //if it works, it is not the best performance
      } else if((array[k].lose.includes(l) || array[k].name == l) && !array[k].lose.includes(w)) {
        array[k].lose.push(w);
        console.log(`atualizei ${array[k].name}: perde para ${w}`);
        updateOthers(array, w, array[k].name); //if it works, it is not the best performance
      } 
  }
}


export default function List() {

  
  
  // State to manage input values
  const [inputValues, setInputValues] = useState(Array(10).fill(''));
  
  // State to control the display of content
  const [showContent, setShowContent] = useState(false);
  
  // State to store itemA and itemB
  const [itemA, setItemA] = useState();
  const [itemB, setItemB] = useState();

  // State to store your Item objects
  const [items, setItems] = useState([]);

  const [showResults, setShowResults] = useState(false);

  const [sortedList, setSortedList] = useState([new Item("lista não carregada")]);

  // Function to handle when itemA or itemB changes
  useEffect(() => {
    if(itemA && itemB) {
      setShowContent(true);
    }
    console.log("itemA changed:", itemA);
    console.log("itemB changed:", itemB);
  }, [itemA, itemB]);

  useEffect(() => {
    if(showResults == true) {
      setSortedList ([...array].sort((item1, item2) => item2.win.length - item1.win.length));
      console.log("sortedList");
      console.log(sortedList);
    }
    
  }, [showResults]);

  // Function to handle "Rank" button click
  const handleRankClick = () => {
    setShowContent(true);

    // Create Item objects for each input value
    const itemObjects = inputValues.map((value) => new Item(value));
    setItems(itemObjects);
    console.log(items);

    i = 1;
    isBattle = 0;
    k = 0;

    console.log(`itemObjects: ${JSON.stringify(itemObjects)}`);

    array = itemObjects;

    setItemA(itemObjects[k]);
    setItemB(itemObjects[k+i]);

    counter = 0;

    for(let n = 0; n < array.length - 1; n++) {
      maxWinSum += (n+1);
    }
    console.log("maxWinSum: ", maxWinSum);

    
    /*

    //if it odd, an element will be left out
    for(let k = 0; k < array.length - 1; k += 2) {
      battle(array, k, k+1);
    }


    
    while(i < array.length) {
      for(let k = 0; k < array.length - i; k++) {
        if(!(array[k].win.includes(array[k + i].name) || array[k].lose.includes(array[k + i].name))) {
          battle(array, k, k+i);
          isBattle = 1;
        }
      }
      if(isBattle == 1 && i != 1) {
        i = 1;
      }
      else {
        i++;
      }
      isBattle = 0;
    }

    console.log(array);
    console.log(`foram ${counter} batalhas`);

    i = 1;
    k = 0;
    isBattle = 0;
    array = itemObjects;
    console.log("CONFERE O ARRAY AQUI: ", array);
    */
  }


  const handleClickA = () => {
    counter++;
    console.log(array);

    console.log("k i", k, i);
    console.log("checkpoint 001");
    array[k].win.push(array[k+i].name);
    array[k+i].lose.push(array[k].name);
    console.log(`${array[k].name} ganhou de ${array[k+i].name}`);
    updateOthers(array, array[k].name, array[k+i].name);

    if(firstRound) {
      console.log("checkpoint 002");
      if(k + 2 < array.length - i) {
        console.log("checkpoint 003");
        k += 2;
        setItemA(array[k]);
        setItemB(array[k+i]);
      } else {
        console.log("checkpoint 004");
        i = 1;
        firstRound = false;
        k = 0;
      }

    } 
    if (!firstRound) {
      console.log("checkpoint 005");
      outerLoop: while(i < array.length) {
        while(k < array.length - i) {
          console.log("checkpoint 006");
          if(!(array[k].win.includes(array[k + i].name) || array[k].lose.includes(array[k + i].name))) {
            console.log("checkpoint 007");
            isBattle = 1;
            setItemA(array[k]);
            setItemB(array[k+i]);
            //k++;
            break outerLoop;
          }
          console.log("checkpoint 008");
          k++;
        }
        console.log("checkpoint 009");
        if(isBattle == 1 && i != 1) {
          console.log("checkpoint 010");
          i = 1;
        }
        else {
          console.log("checkpoint 011");
          i++;
        }
        isBattle = 0;
        k = 0;
      }
      console.log("checkpoint 012");
      let winSum = 0;
      for(let n = 0; n < array.length; n++) {
        winSum += array[n].win.length;
      }
      console.log("winSum maxWinSum: ", winSum, maxWinSum);
      if(winSum == maxWinSum) {
        setShowContent(false);
        setShowResults(true);
        console.log(`foram ${counter} batalhas`);
      }
    } 
  }
  

  const handleClickB = () => {
    counter++;
    console.log(array);

    console.log("k i", k, i);
    console.log("checkpoint 001");
    array[k+i].win.push(array[k].name);
    array[k].lose.push(array[k+i].name);
    console.log(`${array[k+i].name} ganhou de ${array[k].name}`);
    updateOthers(array, array[k+i].name, array[k].name);
      
    
    if(firstRound) {
      console.log("checkpoint 002");
      if(k + 2 < array.length - i) {
        console.log("checkpoint 003");
        k += 2;
        setItemA(array[k]);
        setItemB(array[k+i]);
      } else {
        console.log("checkpoint 004");
        i = 1;
        firstRound = false;
        k = 0;
      }
      
    } 
    if (!firstRound) {
      console.log("checkpoint 005");
      outerLoop: while(i < array.length) {
        while(k < array.length - i) {
          console.log("checkpoint 006");
          if(!(array[k].win.includes(array[k + i].name) || array[k].lose.includes(array[k + i].name))) {
            console.log("checkpoint 007");
            isBattle = 1;
            setItemA(array[k]);
            setItemB(array[k+i]);
            //k++;
            break outerLoop;
          }
          console.log("checkpoint 008");
          k++;
        }
        console.log("checkpoint 009");
        if(isBattle == 1 && i != 1) {
          console.log("checkpoint 010");
          i = 1;
        }
        else {
          console.log("checkpoint 011");
          i++;
        }
        isBattle = 0;
        k = 0;
      }
      console.log("checkpoint 012");
      let winSum = 0;
      for(let n = 0; n < array.length; n++) {
        winSum += array[n].win.length;
      }
      console.log("winSum maxWinSum: ", winSum, maxWinSum);
      if(winSum == maxWinSum) {
        setShowContent(false);
        setShowResults(true);
        console.log(`foram ${counter} batalhas`);
      }
    }
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
      
      {showContent && itemA && itemB && (
        <div>
          <h2>Which one do you prefer?</h2>
          <button onClick={handleClickA}>{itemA.name}</button>
          <button onClick={handleClickB}>{itemB.name}</button>
        </div>
      )}

      {showResults && (
        <div>
        <h2>Names List</h2>
        {sortedList.map((item, index) => (
          <p key={index}>{item.name}</p>
        ))}
        </div>
      )}
    </div>
  );
}

//import * as React from "react";
//import { Link } from "wouter";
import React, { useState, useEffect, useContext } from 'react';
import "../styles/battle.css"
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


//declare variables
var counter = 0;
var firstRound = true;
var array = [];
var k = 0;
var i = 1;
var isBattle = 0;
var maxWinSum = 0;
  //it is not exact, since the number of battles depends on the choices
  //it is beind used win + lose to do this approximation


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


export default function Battle() {

  
  
  // State to control the display of content
  const [showContent, setShowContent] = useState(false);
  
  // State to store itemA and itemB
  const [itemA, setItemA] = useState();
  const [itemB, setItemB] = useState();

  // State to store your Item objects
  const [items, setItems] = useState([]);

  const [showResults, setShowResults] = useState(false);

  const [sortedList, setSortedList] = useState([new Item("lista não carregada")]);

  const { unsortedList, setUnsortedList } = useContext(BattleContext);

  const navigate = useNavigate();

  console.log("UNSORTED LIST: ", unsortedList);

  array = unsortedList;

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

  useEffect(() => {
    if(unsortedList.length > 0 && maxWinSum == 0) {
      setItemA(array[k]);
      setItemB(array[k+i]);

      for(let n = 0; n < array.length - 1; n++) {
        maxWinSum += (n+1);
      }
      console.log("maxWinSum: ", maxWinSum);

      counter = 0;
    }
    
  }, [unsortedList]);


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

  function updateProgressBar() {
    const goal = maxWinSum - 1;
    let sum = 0;
    for(let k = 0; k < array.length; k++) {
      sum += array[k].win.length;
    } 
    console.log("A SOMA ATUAL DE WIN É: ", sum);
    let progress3 = 100 - ((goal - sum) / goal) * 100;
    return {
      width: `${progress3}%`
    };
  }

  

  return (
    <div>
      {showContent && itemA && itemB && (
        <>
          <div>
            <h2>Which one do you prefer?</h2>
          </div>
          <div className="button-container">
            <button id="button_A" onClick={handleClickA}>{itemA.name}</button>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={updateProgressBar()}></div>
          </div>
          <div className="button-container">
            <button id="button_B" onClick={handleClickB}>{itemB.name}</button>
          </div>
        </>
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

class item {
  constructor(name) {
    this.name = name;

    this.win = [];
    this.lose = [];
    this.position = 0;
  }
}

function battle(array, a, b) {
  if(array[a].name < array[b].name) {
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

let array5 = [new item(1), new item(2), new item(3), new item(4), new item(5)];
let array4 = [new item(4), new item(3), new item(2), new item(1)];

let array6 = [new item(1), new item(2), new item(3), new item(4), new item(5), new item(6)];

let array7 = array6;
array7.push(new item(7));

let array8 = array7;
array8.push(new item(8));

let array9 = array8;
array9.push(new item(9));

let array10 = array9;
array10.push(new item(10));

let array12 = [
  new item(9),
  new item(10),
  new item(11),
  new item(1),
  new item(2),
  new item(6),
  new item(5),
  new item(4),
  new item(3),
  new item(8),
  new item(12),
  new item(7),
  
]


let array = array8;

var counter = 0;

//if it odd, an element will be left out
for(let k = 0; k < array.length - 1; k += 2) {
  battle(array, k, k+1);
}


let i = 1;
let isBattle = 0;
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
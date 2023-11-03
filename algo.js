function sort6(list) {
  let values = [];
  let sortedList = [];

  for(let k = 0; k < list.length; k++) {
    values[k] = 0
  }

  for(let k = 0; k < list.length - 1; k += 2) {
    if(list[k] > list[k + 1]) {
      values[k]++;
    } else {
      values[k + 1]++;
    }
  }

  // Create an index array and sort it based on values
  let indexArray;
  indexArray = Array.from(values.keys());
  indexArray.sort((a, b) => values[a] - values[b]);

  // Sort the values and moves arrays based on the sorted indexArray
  values = indexArray.map((index) => values[index]);
  list = indexArray.map((index) => list[index]);

  for(let k = 0; k < list.length - 1; k += list.length/2) {
    if(list[k] > list[k + 1]) {
      values[k]++;
    } else {
      values[k + 1]++;
    }
    if(list[k] > list[k + 2]) {
      values[k]++;
    } else {
      values[k + 2]++;
    }
    if(list[k + 1] > list[k + 2]) {
      values[k + 1]++;
    } else {
      values[k + 2]++;
    }
  }


  indexArray = Array.from(values.keys());
  indexArray.sort((a, b) => values[a] - values[b]);

  values = indexArray.map((index) => values[index]);
  list = indexArray.map((index) => list[index]);

  sortedList[0] = list[0];
  sortedList[5] = list[5];

  for(let k = 1; k < list.length - 2; k += 2) {
    if(list[k] > list[k + 1]) {
      values[k]++;
    } else {
      values[k + 1]++;
    }
  }

  indexArray = Array.from(values.keys());
  indexArray.sort((a, b) => values[a] - values[b]);

  values = indexArray.map((index) => values[index]);
  list = indexArray.map((index) => list[index]);

  sortedList[1] = list[1];
  sortedList[4] = list[4];

  if(list[2] > list[3]) {
    values[2]++;
  } else {
    values[3]++;
  }

  indexArray = Array.from(values.keys());
  indexArray.sort((a, b) => values[a] - values[b]);

  values = indexArray.map((index) => values[index]);
  list = indexArray.map((index) => list[index]);

  sortedList[2] = list[2];
  sortedList[3] = list[3];

  if(JSON.stringify(sortedList) == JSON.stringify([1, 2, 3, 4, 5, 6])) {
    console.log("TUDO CERTO!");
    console.log(sortedList);
  } else {
    console.log("!!!!!!!!!!!  TUDO ERRADO  !!!!!!!!!!!)");
    console.log(sortedList);
  }
  return sortedList
}

sort6([6,5,4,3,2,1]);
sort6([5,6,4,3,2,1]);
sort6([5,6,3,4,1,2]);
sort6([4,3,6,5,2,1]);
sort6([6,5,2,1,4,3]);
sort6([6,4,5,3,2,1]);
sort6([6,3,5,2,4,1]);
sort6([1,2,3,4,5,6]);

sort6([6,1,5,2,3,4]);
sort6([0,1,2,3,4,5]);

function sort2by2(list, values) {
  let results = [];
  for(let k = 0; k < list.length - 1; k += 2) {
    if(list[k] > list[k + 1]) {
      values[k]++;
    } else {
      values[k + 1]++;
    }
  }

  // Create an index array and sort it based on values
  let indexArray = Array.from(values.keys());
  indexArray.sort((a, b) => values[a] - values[b]);

  // Sort the values and moves arrays based on the sorted indexArray
  values = indexArray.map((index) => values[index]);
  list = indexArray.map((index) => list[index]);

  return [list, values];
}

function sort3by3(list, values) {
  for(let k = 0; k < list.length - 1; k += list.length/2) {
    if(list[k] > list[k + 1]) {
      values[k]++;
    } else {
      values[k + 1]++;
    }
    if(list[k] > list[k + 2]) {
      values[k]++;
    } else {
      values[k + 2]++;
    }
    if(list[k + 1] > list[k + 2]) {
      values[k + 1]++;
    } else {
      values[k + 2]++;
    }
  }

  // Create an index array and sort it based on values
  let indexArray = Array.from(values.keys());
  indexArray.sort((a, b) => values[a] - values[b]);

  // Sort the values and moves arrays based on the sorted indexArray
  values = indexArray.map((index) => values[index]);
  list = indexArray.map((index) => list[index]);

  return [list, values];
}

function tieBreak(list, values) {
  for(let k = 0; k < list.length - 1; k += 2) {
    if(list[k] > list[k + 1]) {
      values[k]++;
    } else {
      values[k + 1]++;
    }
  }

  indexArray = Array.from(values.keys());
  indexArray.sort((a, b) => values[a] - values[b]);

  values = indexArray.map((index) => values[index]);
  list = indexArray.map((index) => list[index]);
}

function sortN(list) {
  let values = [];
  let sortedList = [];

  for(let k = 0; k < list.length; k++) {
    values[k] = 0
  }

  results = sort2by2(list, values);
  list = results[0];
  values = results[1];

  results = sort3by3(list, values);
  list = results[0];
  values = results[1];
  

  let counter = 0;

  sortedList[counter] = list[counter];
  sortedList[list.length-1-counter] = list[list.length-1-counter];
  counter++;

  list.pop();
  list.shift();


  tieBreak(list, values);

  sortedList[counter] = list[counter];
  sortedList[list.length-1-counter] = list[list.length-1-counter];
  counter++;

  list.pop();
  list.shift();

  tieBreak(list, values);

  sortedList[counter] = list[counter];
  sortedList[list.length-1-counter] = list[list.length-1-counter];
  counter++;

  if(JSON.stringify(sortedList) == JSON.stringify([1, 2, 3, 4, 5, 6])) {
    console.log("TUDO CERTO!");
    console.log(sortedList);
  } else {
    console.log("!!!!!!!!!!!  TUDO ERRADO  !!!!!!!!!!!)");
    console.log(sortedList);
  }
  return sortedList
}

sortN([6,5,4,3,2,1]);
sortN([5,6,4,3,2,1]);
sortN([5,6,3,4,1,2]);
sortN([4,3,6,5,2,1]);
sortN([6,5,2,1,4,3]);
sortN([6,4,5,3,2,1]);
sortN([6,3,5,2,4,1]);
sortN([1,2,3,4,5,6]);

sortN([6,1,5,2,3,4]);
sortN([0,1,2,3,4,5]);


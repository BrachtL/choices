import React, { createContext, useContext, useState } from 'react';

// Create a context
const BattleContext = createContext();

// Create a context provider
function BattleContextProvider({ children }) {
  const [unsortedList, setUnsortedList] = useState([]); // Initialize with your data

  return (
    <BattleContext.Provider value={{ unsortedList, setUnsortedList }}>
      {children}
    </BattleContext.Provider>
  );
}

export { BattleContextProvider, BattleContext };
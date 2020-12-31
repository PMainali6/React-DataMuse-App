import React, { useReducer } from 'react';
import { initialState, reducers } from './store';
import Dictionary from './components/Dictionary/Dictionary';
import 'fontsource-roboto';
export const StoreContext = React.createContext();


function App() {
  const [ store, dispatch ] = useReducer(reducers, initialState);
  return (
    <div>
      <StoreContext.Provider value={{store, dispatch}} >
        <Dictionary />
      </StoreContext.Provider>
    </div>
  )
}

export default App;

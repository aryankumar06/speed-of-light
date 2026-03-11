import { createContext, useContext, useReducer } from 'react';

const PaperContext = createContext();
const initialState = { currentPaper: null, papers: [], loading: false };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PAPERS': return { ...state, papers: action.payload };
    case 'SET_CURRENT': return { ...state, currentPaper: action.payload };
    case 'SET_LOADING': return { ...state, loading: action.payload };
    default: return state;
  }
}

export function PaperProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <PaperContext.Provider value={{ ...state, dispatch }}>{children}</PaperContext.Provider>;
}
export const usePaper = () => useContext(PaperContext);

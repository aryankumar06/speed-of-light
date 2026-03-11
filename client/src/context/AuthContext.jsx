import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();
const initialState = { user: null, accessToken: localStorage.getItem('token') || null };

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.accessToken);
      return { ...state, ...action.payload };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { user: null, accessToken: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

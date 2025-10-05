import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();
export const BASE_URL = "http://localhost:8000/api/accounts";

const initialState = { 
  user: null, 
  error: null,
};

const dataReducer = (state, action) => {
  switch(action.type) {
    case "SET_USER": return {...state, user: action.payload, error: null};
    default: return state;
  }
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login/`,
        { email, password },
        { withCredentials: true }
      );
      dispatch({ type: "SET_USER", payload: res.data.user });
      return res.data.user;
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.response?.data || err.message });
      return null;
    }
  };

  const register = async (email, first_name, last_name, password, password_confirm) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/register/`,
        { email, first_name, last_name, password, password_confirm },
        { withCredentials: true }
      );
      dispatch({ type: "SET_USER", payload: res.data.user });
      return res.data.user;
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.response?.data || err.message });
      return null;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout/`, {}, { withCredentials: true });
      dispatch({ type: "SET_USER", payload: null });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.response?.data || err.message });
    }
  };


  return (
    <DataContext.Provider value={{ user: state.user, error: state.error, login, register, logout }}>
      {children}
    </DataContext.Provider>
  );
};

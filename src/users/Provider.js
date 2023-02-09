import { createContext, useContext, useState, useReducer, useEffect, useCallback } from 'react';
import axios from "axios";

const UserContext = createContext(null);
const UserDispatchContext = createContext(null);

export const hostPort = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`

export const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_LIST: 'SET_LIST',
  SET_ERROR: 'SET_ERROR',
  ADD: 'ADD',
  EDIT: 'EDIT',
  CLOSE_FORM: 'CLOSE_FORM'
}

export const FORM_MODES = {
  NULL: null,
  ADD: 'add',
  EDIT: 'edit'
}
export function Provider({ children }) {

  const [store, dispatch] = useReducer(userReducer, initialState);

  const url = `${hostPort}/users/`
  const getUsers = useCallback(() => {
    console.log('FETCHING --->>> Users')
    dispatch({ type: ActionTypes.SET_LOADING })
    axios
      .get(url)
      .then(({data}) => { 
        dispatch({ type: ActionTypes.SET_LIST, payload: data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.SET_ERROR, payload: error });
    });
  }, [url]);

  return (
    <UserContext.Provider value={{store, getUsers}}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}

export const useUserDispatch = () => {
  return useContext(UserDispatchContext)
};


function userReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING: {
      return { ...state, loading: true };
    }

    case ActionTypes.SET_LIST: {
      return { ...state, users: action.payload, loading: false };
    }

    case ActionTypes.SET_ERROR: {
      return { ...state, error: action.payload, loading: false };
    }

    case ActionTypes.ADD: {
      return { ...state, mode: FORM_MODES.ADD };
    }

    case ActionTypes.EDIT: {
      return { ...state, mode: FORM_MODES.EDIT, user: action.user };
    }

    case ActionTypes.CLOSE_FORM: {
      return { ...state, mode: null, user: null };
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const initialState = {
  mode: FORM_MODES.NULL,
  user: null,
  loading: true,
  users: [],
  error: null
}


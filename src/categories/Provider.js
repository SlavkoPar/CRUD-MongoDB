import { createContext, useContext, useState, useReducer, useEffect, useCallback } from 'react';
import axios from "axios";

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

const CategoryContext = createContext(null);
const CategoryDispatchContext = createContext(null);

export const hostPort = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`

export function Provider({ children }) {

  const url = `${hostPort}/categories/`
  console.log(url)

  const [store, dispatch] = useReducer(categoryReducer, initialState);

  // const getCategories = useCallback(async () => {
  //   console.log('FETCHING --->>> Categories')
  //   dispatch({ type: ActionTypes.SET_LOADING })
  //   const res = await axios
  //     .get(url)
  //     .catch((error) => {
  //       console.log(error);
  //       dispatch({
  //         type: ActionTypes.SET_ERROR,
  //         payload: error
  //       });
    
  //   });
  //   dispatch({ type: ActionTypes.SET_LIST, payload: res.data });
  // }, [url]);

  const getCategories = useCallback(() => {
    console.log('FETCHING --->>> Categories')
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
    <CategoryContext.Provider value={{store, getCategories}}>
      <CategoryDispatchContext.Provider value={dispatch}>
        {children}
      </CategoryDispatchContext.Provider>
    </CategoryContext.Provider>
  );
}

export function useCategoryContext() {
  return useContext(CategoryContext);
}

export const useCategoryDispatch = () => {
  return useContext(CategoryDispatchContext)
};

function categoryReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING: {
      return { ...state, loading: true };
    }

    case ActionTypes.SET_LIST: {
      return { ...state, categories: action.payload, loading: false };
    }

    case ActionTypes.SET_ERROR: {
      return { ...state, error: action.payload, loading: false };
    }

    case ActionTypes.ADD: {
      return { ...state, mode: FORM_MODES.ADD };
    }

    case ActionTypes.EDIT: {
      return { ...state, mode: FORM_MODES.EDIT, _id: action._id };
    }

    case ActionTypes.CLOSE_FORM: {
      return { ...state, mode: null, _id: null };
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const initialState = {
  mode: FORM_MODES.NULL,
  _id: null,
  loading: true,
  categories: [],
  error: null
}


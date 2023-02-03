import { createContext, useContext, useState, useReducer, useEffect, useCallback } from 'react';
import axios from "axios";

const CategoryContext = createContext(null);
const CategoryDispatchContext = createContext(null);

export function CategoryProvider({ children }) {

  const url = "http://localhost:4000/categories/"

  const [store, dispatch] = useReducer(categoryReducer, initialState);

  const getCategories = useCallback(async () => {
    console.log('FETCHING --->>> Categories')
    dispatch({ type: CategoryActionTypes.SET_LOADING })
    const res = await axios
      .get(url)
      .catch((error) => {
        console.log(error);
        dispatch({
          type: CategoryActionTypes.SET_ERROR,
          payload: error
        });
    
    });;
    dispatch({
      type: CategoryActionTypes.SET_LIST,
      payload: res.data,
    });
  }, []);


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

const FORM_MODES = {
  NULL: null,
  ADD: 'add',
  EDIT: 'edit'
}

export const CategoryActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_LIST: 'SET_LIST',
  SET_ERROR: 'SET_ERROR',
  ADD: 'ADD',
  EDIT: 'EDIT',
  CLOSE_FORM: 'CLOSE_FORM'
}

function categoryReducer(state, action) {
  switch (action.type) {
    case CategoryActionTypes.SET_LOADING: {
      return { ...state, loading: true };
    }

    case CategoryActionTypes.SET_LIST: {
      return { ...state, categories: action.payload, loading: false };
    }

    case CategoryActionTypes.SET_ERROR: {
      return { ...state, error: action.payload, loading: false };
    }

    case CategoryActionTypes.ADD: {
      return { ...state, mode: FORM_MODES.ADD };
    }

    case CategoryActionTypes.EDIT: {
      return { ...state, mode: FORM_MODES.EDIT, _id: action._id };
    }

    case CategoryActionTypes.CLOSE_FORM: {
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


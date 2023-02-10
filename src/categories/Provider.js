import { createContext, useContext, useState, useReducer, useEffect, useCallback } from 'react';
import axios from "axios";
import { isDOMComponent } from 'react-dom/test-utils';

export const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_SUBCATEGORIES: 'SET_SUBCATEGORIES',
  SET_CATEGORIES: 'SET_LIST',
  CLEAN_SUB_TREE: 'CLEAN_SUB_TREE',
  SET_ERROR: 'SET_ERROR',
  ADD: 'ADD',
  ADD_SUBCATEGORY: 'ADD_SUBCATEGORY',
  EDIT: 'EDIT',
  CLOSE_FORM: 'CLOSE_FORM'
}

export const FORM_MODES = {
  NULL: null,
  ADD: 'ADD',
  ADD_SUBCATEGORY: 'ADD_SUBCATEGORY',
  EDIT: 'EDIT'
}

const CategoryContext = createContext(null);
const CategoryDispatchContext = createContext(null);

export const hostPort = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`

export function Provider({ children }) {


  const [store, dispatch] = useReducer(categoryReducer, initialState);

  const url = `${hostPort}/categories/`
  const getCategories = useCallback(() => {
    console.log('FETCHING --->>> Categories')
    dispatch({ type: ActionTypes.SET_LOADING })
    axios
      .get(url)
      .then(({ data }) => {
        console.log(data)
        dispatch({ type: ActionTypes.SET_CATEGORIES, payload: data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.SET_ERROR, payload: error });
      });
  }, [url]);

  const getSubCategories = useCallback(({ parentCategory, level }) => {
    const urlSubCategories = `${hostPort}/categories/${parentCategory}`
    console.log('FETCHING --->>> getSubCategories', level, parentCategory)
    dispatch({ type: ActionTypes.SET_LOADING })
    axios
      .get(urlSubCategories)
      .then(({ data }) => {
        console.log(data)
        dispatch({ type: ActionTypes.SET_SUBCATEGORIES, payload: data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.SET_ERROR, payload: error });
      });
  }, []);

  return (
    <CategoryContext.Provider value={{ store, getCategories, getSubCategories }}>
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

function markForClean(subCategories, parent_id) {
  let arr = subCategories
    .filter(category => category.parentCategory === parent_id)

  arr.forEach(category => {
    arr = arr.concat(markForClean(subCategories, category._id))
  })
  return arr
}

function categoryReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING: {
      return { ...state, loading: true };
    }

    case ActionTypes.SET_CATEGORIES: {
      return { ...state, categories: action.payload, loading: false };
    }

    case ActionTypes.SET_SUBCATEGORIES: {
      return {
        ...state,
        subCategories: state.subCategories.concat(action.payload),
        loading: false
      };
    }

    case ActionTypes.CLEAN_SUB_TREE: {
      const { _id } = action.category;
      const arr = markForClean(state.subCategories, _id)
      console.log('clean:', arr)
      const _ids = arr.map(c => c._id)
      return {
        ...state,
        subCategories: state.subCategories.filter(c => !_ids.includes(c._id))
      }
    }


    case ActionTypes.SET_ERROR: {
      return { ...state, error: action.payload, loading: false };
    }

    case ActionTypes.ADD: {
      return { ...state, mode: FORM_MODES.ADD };
    }

    case ActionTypes.ADD_SUBCATEGORY: {
      return { ...state, mode: FORM_MODES.ADD_SUBCATEGORY, category: action.category };
    }

    case ActionTypes.EDIT: {
      return { ...state, mode: FORM_MODES.EDIT, category: action.category };
    }

    case ActionTypes.CLOSE_FORM: {
      return { ...state, mode: null, category: null };
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const initialState = {
  mode: FORM_MODES.NULL,
  category: null,
  loading: true,
  categories: [],
  subCategories: [],
  error: null
}


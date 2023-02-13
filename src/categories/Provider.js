import { createContext, useContext, useState, useReducer, useEffect, useCallback } from 'react';
import axios from "axios";

export const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_CATEGORIES: 'SET_LIST',
  CLEAN_SUB_TREE: 'CLEAN_SUB_TREE',
  SET_ERROR: 'SET_ERROR',
  ADD: 'ADD',
  REFRESH_ADDED_CATEGORY: 'REFRESH_ADDED_CATEGORY',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  CLOSE_ADDING_FORM: 'CLOSE_ADDING_FORM',
  CLOSE_EDITING_FORM: 'CLOSE_EDITING_FORM'
}

export const FORM_MODES = {
  NULL: null,
  ADD: 'ADD',
  EDIT: 'EDIT',
  DELETE: 'DELETE'
}

const CategoryContext = createContext(null);
const CategoryDispatchContext = createContext(null);

export const hostPort = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`

export function Provider({ children }) {

  const [store, dispatch] = useReducer(categoryReducer, initialState);

  const getCategories = useCallback(({ parentCategory, level }) => {
    const urlCategories = `${hostPort}/categories/${parentCategory}`
    console.log('FETCHING --->>> getCategories', level, parentCategory)
    dispatch({ type: ActionTypes.SET_LOADING })
    axios
      .get(urlCategories)
      .then(({ data }) => {
        console.log(data)
        dispatch({ type: ActionTypes.SET_CATEGORIES, payload: data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.SET_ERROR, payload: error });
      });
  }, []);

  const editCategory = useCallback(_id => {
    const url = `${hostPort}/categories/get-category/${_id}`
    console.log(`FETCHING --->>> ${url}`)
    dispatch({ type: ActionTypes.SET_LOADING })
    axios
      .get(url)
      .then(({ data }) => {
        console.log(data)
        dispatch({ type: ActionTypes.EDIT, category: data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.SET_ERROR, payload: error });
      });
  }, []);

  const deleteCategory = _id => {
    // dispatch({ type: ActionTypes.SET_LOADING })
    axios
        .delete(`${hostPort}/categories/delete-category/${_id}`)
        .then(res => {
            if (res.status === 200) {
                console.log("Category successfully deleted");
                dispatch({ type: ActionTypes.DELETE, _id });
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: ActionTypes.SET_ERROR, payload: error });
        });
};

  /*
  const refreshAddedCategory = useCallback(_id => {
    const url = `${hostPort}/categories/get-category/${_id}`
    console.log(`FETCHING --->>> ${url}`)
    dispatch({ type: ActionTypes.SET_LOADING })
    axios
      .get(url)
      .then(({ data }) => {
        console.log(data)
        dispatch({ type: ActionTypes.REFRESH_ADDED_CATEGORY, data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.SET_ERROR, payload: error });
      });
  }, []);
  */

  return (
    <CategoryContext.Provider value={{ store, getCategories, editCategory, deleteCategory }}>
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

function markForClean(categories, parent_id) {
  let arr = categories
    .filter(category => category.parentCategory === parent_id)

  arr.forEach(category => {
    arr = arr.concat(markForClean(categories, category._id))
  })
  return arr
}

export const initialCategory = {
  _id: 'for_list_key_mongo_given', // just for list key, real _id will given by the MongoDB 
  name: '',
  level: 0,
  created: null,
  createdBy: null,
  modified: null,
  modifiedBy: null,
  parentCategory: null
}

function categoryReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING: {
      return { ...state, loading: true };
    }

    case ActionTypes.SET_CATEGORIES: {
      return {
        ...state,
        categories: state.categories.concat(action.payload),
        loading: false
      };
    }

    case ActionTypes.CLEAN_SUB_TREE: {
      const { _id } = action.category;
      const arr = markForClean(state.categories, _id)
      console.log('clean:', arr)
      const _ids = arr.map(c => c._id)
      return {
        ...state,
        categories: state.categories.filter(c => !_ids.includes(c._id))
      }
    }

    case ActionTypes.SET_ERROR: {
      return { ...state, error: action.payload, loading: false };
    }

    case ActionTypes.ADD: {
      const { category, createdBy } = action;
      return {
        ...state,
        mode: FORM_MODES.ADD,
        categories: [
          {
            ...initialCategory,
            level: category.level + 1,
            parentCategory: category._id,
            createdBy,
            inAdding: true
          },
          ...state.categories
        ]
      };
    }


    case ActionTypes.REFRESH_ADDED_CATEGORY: {
      const { data } = action;
      return {
        ...state,
        categories: state.categories.map(c => c.inAdding ? data : c)
      }
    }

    case ActionTypes.EDIT: {
      const { category } = action;
      return { 
        ...state, 
        mode: FORM_MODES.EDIT,
        category, 
        categories: state.categories.map(c => c._id === category._id 
          ? {...category, inEditing: true} 
          : c
        ),
        loading: false
      };
    }

    case ActionTypes.DELETE: {
      const _id = action._id;
      return { 
        ...state, 
        mode: FORM_MODES.NULL, 
        category: null,
        categories: state.categories.filter(c => c._id !== _id)
      };
    }

    case ActionTypes.CLOSE_ADDING_FORM: {
      return { 
        ...state, 
        mode: FORM_MODES.NULL, 
        category: null,
        categories: state.categories.filter(c => !c.inAdding )
      };
    }

    case ActionTypes.CLOSE_EDITING_FORM: {
      return { 
        ...state, 
        mode: FORM_MODES.NULL, 
        category: null,
        categories: state.categories.map(c => c.inEditing ? ({...c, inEditing: false}) : c)
      };
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
  error: null
}


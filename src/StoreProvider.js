import { createContext, useContext, useReducer } from 'react';

export const StoreContext = createContext(null);

const StoreDispatchContext = createContext(null);

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={store}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}

export const useStoreDispatch = () => {
  return useContext(StoreDispatchContext)
};

const MODES = {
  NULL: null,
  ADD: 'add',
  EDIT: 'edit'
}

export const ActionTypes = {
	GET_STUDENT: 'GET_STUDENT',
	ADD_STUDENT: 'ADD_STUDENT',
	EDIT_STUDENT: 'EDIT_STUDENT',
  CLOSE_STUDENT: 'CLOSE_STUDENT'
}

function storeReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_STUDENT: {
      return {...state, students : { ...state.students, mode: MODES.ADD }};
    }
    case ActionTypes.EDIT_STUDENT: {
      return {...state, students: { ...state.students, mode: MODES.EDIT, _id: action._id }};
    }
    case ActionTypes.CLOSE_STUDENT: {
      return {...state, students: { ...state.students, mode: null, _id: null }};
    }    
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}


export const initialState = {
  students: {
    mode: MODES.NULL,
    id: null
  }
}


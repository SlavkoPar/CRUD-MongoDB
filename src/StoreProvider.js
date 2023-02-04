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

export const ActionTypes = {
	AUTHENTICATE: 'AUTHENTICATE',
}

function storeReducer(state, action) {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE: {
      return { ...state, isAuthenticated: true, user: action.user };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialState = {
  isAuthenticated: null,
  user: {
    userId: null,
    color: null,
    name: null,
    roleId: -1,
    canEdit: false
  }
}


import { createContext, useContext, useReducer } from 'react';

const GlobalStoreContext = createContext(null);

const GlobalStoreDispatchContext = createContext(null);

export function GlobalStoreProvider({ children }) {
  const [globalStore, dispatch] = useReducer(storeReducer, initialState);
  return (
    <GlobalStoreContext.Provider value={globalStore}>
      <GlobalStoreDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalStoreDispatchContext.Provider>
    </GlobalStoreContext.Provider>
  );
}

export function useGlobalStore() {
  return useContext(GlobalStoreContext);
}

export const useGlobalStoreDispatch = () => {
  return useContext(GlobalStoreDispatchContext)
};

export const GlobalActionTypes = {
	AUTHENTICATE: 'AUTHENTICATE',
}

function storeReducer(state, action) {
  switch (action.type) {
    case GlobalActionTypes.AUTHENTICATE: {
      return { ...state, isAuthenticated: true, user: action.user };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const ROLES = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  EDITOR: 'EDITOR',
  VIEWER: 'VIEWER',
  FIRST_REGISTERED_USER_IS_OWNER: 'FIRST_REGISTERED_USER_IS_OWNER'
}


const initialState = {
  isAuthenticated: false,
  user: {
    userId: '63e0c6f6ad5c8d505b8d8399', // fiktivni _id
    color: null,
    userName: null,
    role: ROLES.FIRST_REGISTERED_USER_IS_OWNER,
    canEdit: false
  }
}


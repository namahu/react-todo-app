import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { auth, db } from "../config";
import { Auth, User, onAuthStateChanged } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { Navigate } from "react-router";

type FirebaseState = {
    user: User | null;
    loading: boolean;
};

type FirebaseAction =
    | { type: 'SET_USER'; payload: User | null }
    | { type: 'SET_LOADING'; payload: boolean };

const initialState: FirebaseState = {
    user: null,
    loading: true,
};

const firebaseReducer = (state: FirebaseState, action: FirebaseAction): FirebaseState => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};

type FirebaseContextType = {
    state: FirebaseState;
    dispatch: React.Dispatch<FirebaseAction>;
    auth: Auth;
    db: Firestore;
};

export const FirebaseContext = createContext<FirebaseContextType>({
    state: initialState,
    dispatch: () => null,
    auth: auth,
    db: db,
});

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(firebaseReducer, initialState);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            dispatch({ type: 'SET_USER', payload: user });
            dispatch({ type: 'SET_LOADING', payload: false });
        });

        return () => unsubscribe();
    }, []);

    console.log(state);

    return (
        <FirebaseContext.Provider value={{ state, dispatch, auth, db }}>
            {children}
        </FirebaseContext.Provider>
    );
};

import React, { createContext, Dispatch, useReducer } from "react";

export interface AuthContextProps {
	children: React.ReactNode;
}

type ActionType = "LOGIN" | "LOGOUT";

export interface AuthState {
	user: { _id: string; email: string } | null;
}
type AuthAction = {
	type: ActionType;
	// TO Refactor user auth type
	payload: { _id: string, email: string } | null;
};
interface AuthContext {
	state: AuthState;
	dispatch: Dispatch<AuthAction>;
}

const initialState = {
	state: {
		user: null,
	},
	dispatch: () => {},
};

export const AuthContext = createContext<AuthContext>(initialState);

const authReducer = (state: AuthState, action: AuthAction) => {
	switch (action.type) {
		case "LOGIN":
			return { ...state, user: action.payload };
		case "LOGOUT":
			return { ...state, user: null };
		default:
			return state;
	}
};

export default function AuthContextProvider({ children }: AuthContextProps) {
	const [state, dispatch] = useReducer(authReducer, { user: null });

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
}

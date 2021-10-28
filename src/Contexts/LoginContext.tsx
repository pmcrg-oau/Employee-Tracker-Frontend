import { createContext, Dispatch, FC, SetStateAction, useState } from 'react';

export type User = Object;

type LoginContextValue = {
	loggedInUser: User | {};
	setLoggedInUser: Dispatch<SetStateAction<User | {}>>;
};

type LoginContextProviderProps = {
	children: any;
};

export const LoginContext = createContext<LoginContextValue | null>(null);

const LoginContextProvider: FC<LoginContextProviderProps> = ({ children }) => {
	const user: User | {} = JSON.parse(
		localStorage.getItem('loggedInUser') || '{}'
	);
	const [loggedInUser, setLoggedInUser] = useState<User | {}>(user);

	return (
		<LoginContext.Provider value={{ loggedInUser, setLoggedInUser }}>
			{children}
		</LoginContext.Provider>
	);
};

export default LoginContextProvider;

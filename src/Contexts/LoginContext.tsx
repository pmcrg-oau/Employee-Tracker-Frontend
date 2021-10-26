import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useState,
} from 'react';

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

	useEffect(() => {
		window.addEventListener('storage', (e) => {
			if (e.key === 'employee__token' && e.newValue === null) {
				console.log(e.key);
				setLoggedInUser({});
			}
		});
	}, []);

	return (
		<LoginContext.Provider value={{ loggedInUser, setLoggedInUser }}>
			{children}
		</LoginContext.Provider>
	);
};

export default LoginContextProvider;

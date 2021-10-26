import { FC, useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { LoginContext } from '../../Contexts/LoginContext';

type ProtectedLoginRouteProps = RouteProps & {
	component: FC;
};

const ProtectedLoginRoute: FC<ProtectedLoginRouteProps> = ({
	component: Component,
	...restProps
}) => {
	const { loggedInUser } = useContext(LoginContext)!;

	return (
		<Route
			{...restProps}
			render={(props) => {
				return !Object.entries(loggedInUser).length ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: {
								from: props.location,
							},
						}}
					/>
				);
			}}
		/>
	);
};

export default ProtectedLoginRoute;

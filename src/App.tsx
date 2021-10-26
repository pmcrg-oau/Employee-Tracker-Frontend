import { BrowserRouter as Router, Switch } from 'react-router-dom';

import LoginContextProvider from './Contexts/LoginContext';
import Login from './pages/LoginSignup/login';
import Signup from './pages/LoginSignup/signup';
import Dashboard from './pages/Dashboard';
import ProtectedComponentRoute from './Components/ProtectedComponentRoute';
import ProtectedLoginRoute from './Components/ProtectedLoginRoute';

import './App.scss';

const App = () => {
	return (
		<div className='App'>
			<LoginContextProvider>
				<Router>
					<Switch>
						<ProtectedComponentRoute exact path='/' component={Dashboard} />
						<ProtectedLoginRoute path='/signup' component={Signup} />
						<ProtectedLoginRoute path='/login' component={Login} />
					</Switch>
				</Router>
			</LoginContextProvider>
		</div>
	);
};

export default App;

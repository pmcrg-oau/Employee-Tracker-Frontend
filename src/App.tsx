import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginContextProvider from './Contexts/LoginContext';
import Login from './pages/LoginSignup/login';
import Signup from './pages/LoginSignup/signup';
import Dashboard from './pages/Dashboard';
import AddNewEmployee from './pages/AddNewEmployee';
import EmployeeDetails from './pages/EmployeeDetails';
import EmployeeRecords from './pages/EmployeeRecords';
import NotFound from './pages/NotFound';
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
						<ProtectedComponentRoute
							exact
							path='/add-new'
							component={AddNewEmployee}
						/>
						<ProtectedComponentRoute
							exact
							path='/user/:id'
							component={EmployeeDetails}
						/>
						<ProtectedComponentRoute
							exact
							path='/user/:employeeId/records'
							component={EmployeeRecords}
						/>
						<ProtectedLoginRoute exact path='/signup' component={Signup} />
						<ProtectedLoginRoute exact path='/login' component={Login} />
						<Route path='*' component={NotFound} />
					</Switch>
				</Router>
			</LoginContextProvider>
		</div>
	);
};

export default App;

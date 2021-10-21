import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/LoginSignup/login';
import Signup from './pages/LoginSignup/signup';
import Dashboard from './pages/Dashboard';

import './App.scss';

const App = () => {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route exact path='/' component={Dashboard} />
					<Route path='/signup' component={Signup} />
					<Route path='/login' component={Login} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;

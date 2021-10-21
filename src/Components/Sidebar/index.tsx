import React from 'react';

import './Sidebar.styles.scss';

const Sidebar = (): JSX.Element => {
	return (
		<section id='sidebar'>
			<div className='sidebar__logo'></div>
			<nav className='sidebar__navbar'>
				<ul>
					<li>
						<button>
							<i className='fas fa-user'></i>
							<p>Users</p>
						</button>
					</li>
					<li>
						<button>
							<i className='fas fa-sign-out-alt'></i>
							<p>Log out</p>
						</button>
					</li>
				</ul>
			</nav>
		</section>
	);
};

export default Sidebar;

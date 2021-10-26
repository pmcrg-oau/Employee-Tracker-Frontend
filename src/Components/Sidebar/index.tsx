import { FC, useContext } from 'react';

import { LoginContext } from '../../Contexts/LoginContext';

import './Sidebar.styles.scss';

type SidebarProps = {
	isSidebarExpanded: boolean;
};

const Sidebar: FC<SidebarProps> = ({ isSidebarExpanded }) => {
	const { setLoggedInUser } = useContext(LoginContext)!;

	return (
		<section id='sidebar' className={isSidebarExpanded ? 'expand' : ''}>
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
						<button
							onClick={() => {
								localStorage.setItem('loggedInUser', JSON.stringify({}));
								setLoggedInUser({});
							}}
						>
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

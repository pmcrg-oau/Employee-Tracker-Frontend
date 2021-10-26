import { FC } from 'react';

import './Sidebar.styles.scss';

type SidebarProps = {
	isSidebarExpanded: boolean;
}

const Sidebar: FC<SidebarProps> = ({ isSidebarExpanded }) => {
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

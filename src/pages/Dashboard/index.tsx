import { FC, useState } from 'react';

import MainContent from '../../Components/MainContent';
import Sidebar from '../../Components/Sidebar';

import './Dashboard.styles.scss';

const Dashboard: FC = () => {
	const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);

	return (
		<section id='dashboard'>
			{/* Sidebar component */}
			<Sidebar isSidebarExpanded={isSidebarExpanded} />

			{/* Main Content */}
			<MainContent
				isSidebarExpanded={isSidebarExpanded}
				setIsSidebarExpanded={setIsSidebarExpanded}
			/>
		</section>
	);
};

export default Dashboard;

import { FC, useState } from 'react';

import Sidebar from '../../Components/Sidebar';
import EmployeeDetailsContent from '../../Components/EmployeeDetailsContent';

const EmployeeDetails: FC = () => {
	const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);

	return (
		<section id='employee__details'>
			{/* Sidebar component */}
			<Sidebar isSidebarExpanded={isSidebarExpanded} />

			{/* Main Content */}
			<EmployeeDetailsContent
				isSidebarExpanded={isSidebarExpanded}
				setIsSidebarExpanded={setIsSidebarExpanded}
			/>
		</section>
	);
};

export default EmployeeDetails;

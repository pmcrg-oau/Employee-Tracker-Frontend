import { FC, useState } from 'react';

import Sidebar from '../../Components/Sidebar';
import EmployeeRecordsContent from '../../Components/EmployeeRecordsContent';

const EmployeeRecords: FC = () => {
	const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);

	return (
		<section id='employee__details'>
			{/* Sidebar component */}
			<Sidebar isSidebarExpanded={isSidebarExpanded} />

			{/* Main Content */}
			<EmployeeRecordsContent
				isSidebarExpanded={isSidebarExpanded}
				setIsSidebarExpanded={setIsSidebarExpanded}
			/>
		</section>
	);
};

export default EmployeeRecords;

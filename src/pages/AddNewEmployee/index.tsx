import { FC, useState } from 'react';

import AddEmployeeContent from '../../Components/AddEmployeeContent';
import Sidebar from '../../Components/Sidebar';

const AddNewEmployee: FC = () => {
	const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);

    return (
        <section id='add__employee'>
			{/* Sidebar component */}
			<Sidebar isSidebarExpanded={isSidebarExpanded} />

			{/* Main Content */}
			<AddEmployeeContent
				isSidebarExpanded={isSidebarExpanded}
				setIsSidebarExpanded={setIsSidebarExpanded}
			/>
		</section>
    );
};

export default AddNewEmployee;
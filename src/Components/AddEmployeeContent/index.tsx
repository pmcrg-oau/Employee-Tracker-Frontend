import { Dispatch, FC, SetStateAction, useState } from 'react';

import Header from '../Header';
import UploadModal from '../UploadModal';
import FeedbackText from '../FeedbackText';
import AddForm from '../AddForm';

import 'react-loading-skeleton/dist/skeleton.css';
import './AddEmployeeContent.styles.scss';

type AddEmployeeProps = {
	isSidebarExpanded: boolean;
	setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
};

const AddEmployee: FC<AddEmployeeProps> = ({
	isSidebarExpanded,
	setIsSidebarExpanded,
}) => {
	const [message, setMessage] = useState<string>('');
	const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

	return (
		<>
			<section id='add__employee__content'>
				<Header
					isSidebarExpanded={isSidebarExpanded}
					setIsSidebarExpanded={setIsSidebarExpanded}
					setShowUploadModal={setShowUploadModal}
				/>

				<main className='main'>
					<h2 className='title'>Add New Employee</h2>

					<AddForm setMessage={setMessage} />
				</main>
			</section>

			{showUploadModal && (
				<UploadModal setShowUploadModal={setShowUploadModal} />
			)}
			
			{message && <FeedbackText message={message} />}
		</>
	);
};

export default AddEmployee;

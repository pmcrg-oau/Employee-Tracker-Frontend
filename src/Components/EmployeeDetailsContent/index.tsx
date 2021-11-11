import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';

import Header from '../Header';
import UploadModal from '../UploadModal';
import FeedbackText from '../FeedbackText';
import EditForm from '../EditForm';
import User, { EmployeeDetailsValues } from '../../typesAndInterfaces/User';
import importantDets from '../../data/ImportantDets';

import 'react-loading-skeleton/dist/skeleton.css';
import './EmployeeDetailsContent.styles.scss';

type EmployeeDetailsContentProps = {
	isSidebarExpanded: boolean;
	setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
};

const EmployeeDetailsContent: FC<EmployeeDetailsContentProps> = ({
	isSidebarExpanded,
	setIsSidebarExpanded,
}) => {
	const [message, setMessage] = useState<string>('');
	const [details, setDetails] = useState<User | EmployeeDetailsValues>(
		importantDets
	);
	const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
	const { id } = useParams<{ id: string }>();

	const [{ data, error }, getEmployeeDetails] = useAxios(
		{
			url: `/user/${id}`,
			method: 'get',
		},
		{ manual: true }
	);

	useEffect(() => {
		getEmployeeDetails();

		if (error) console.log(error);
	}, []);

	useEffect(() => {
		if(data) setDetails((details) => ({...details, ...data}));
	}, [data]);

	return (
		<>
			{message && <FeedbackText message={message} />}

			<section id='main__content'>
				<Header
					isSidebarExpanded={isSidebarExpanded}
					setIsSidebarExpanded={setIsSidebarExpanded}
					setShowUploadModal={setShowUploadModal}
				/>

				<main className='main'>
					<h2 className='title'>Employee Details</h2>

					<EditForm details={details} setMessage={setMessage}/>
				</main>
			</section>

			{showUploadModal && (
				<UploadModal setShowUploadModal={setShowUploadModal} />
			)}
		</>
	);
};

export default EmployeeDetailsContent;

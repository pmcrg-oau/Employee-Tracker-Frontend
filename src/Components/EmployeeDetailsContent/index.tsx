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
	const [showEditForm, setShowEditForm] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const [details, setDetails] = useState<User | EmployeeDetailsValues>(
		importantDets
	);
	const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
	const { id } = useParams<{ id: string }>();

	const [{ data }, getEmployeeDetails] = useAxios(
		{
			url: `/user/${id}`,
			method: 'get',
		},
		{ manual: true }
	);

	useEffect(() => {
		getEmployeeDetails();
	}, []);

	useEffect(() => {
		if (data) {
			setDetails((details) => ({ ...details, ...data }));
			setShowEditForm(true);
		}
	}, [data]);

	return (
		<>
			<section id='employee__details__content'>
				<Header
					isSidebarExpanded={isSidebarExpanded}
					setIsSidebarExpanded={setIsSidebarExpanded}
					setShowUploadModal={setShowUploadModal}
				/>

				<main className='main'>
					<h2 className='title'>Employee Details</h2>

					{!showEditForm ? (
						<div className='loader__container'>
							<img src='/assets/loader.gif' alt='loader' />
						</div>
					) : (
						<EditForm details={details} setMessage={setMessage} />
					)}
				</main>
			</section>

			{showUploadModal && (
				<UploadModal setShowUploadModal={setShowUploadModal} />
			)}
			
			{message && <FeedbackText message={message} />}
		</>
	);
};

export default EmployeeDetailsContent;

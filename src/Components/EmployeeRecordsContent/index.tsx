import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';

import Header from '../Header';
import UploadModal from '../UploadModal';
import FeedbackText from '../FeedbackText';

import 'react-loading-skeleton/dist/skeleton.css';
import './EmployeeRecordsContent.styles.scss';

type EmployeeRecordsContentProps = {
	isSidebarExpanded: boolean;
	setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
};

const EmployeeRecordsContent: FC<EmployeeRecordsContentProps> = ({
	isSidebarExpanded,
	setIsSidebarExpanded,
}) => {
	const [message, setMessage] = useState<string>('');
	const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
	// const [records, setRecords] = useState();
	// const { employeeId } = useParams<{ id: string }>();

	// const [{ data }, getEmployeeRecords] = useAxios(
	// 	{
	// 		url: `/user/${id}`,
	// 		method: 'get',
	// 	},
	// 	{ manual: true }
	// );

	// useEffect(() => {
	// 	getEmployeeRecords();
	// }, []);

	// useEffect(() => {
	// 	if (data) {
	// 		setDetails((details) => ({ ...details, ...data }));
	// 		setShowEditForm(true);
	// 	}
	// }, [data]);

	return (
		<>
			<section id='employee__records__content'>
				<Header
					isSidebarExpanded={isSidebarExpanded}
					setIsSidebarExpanded={setIsSidebarExpanded}
					setShowUploadModal={setShowUploadModal}
				/>

				<main className='main'>
					<h2 className='title'>Employee Records</h2>

					<div className='loader__container'>
						<p>No Records Found</p>
					</div>

					<div className='records'>
						<div className='record__preview'>
							<div className='image'>
								<img src={'/assets/csv-file.png'} alt='' />
							</div>
							<div className='file__name'>CV</div>
							<div className='delete' onClick={() => null}>
								<i className='fas fa-trash'></i>
							</div>
						</div>
					</div>
				</main>
			</section>

			{showUploadModal && (
				<UploadModal setShowUploadModal={setShowUploadModal} />
			)}

			{message && <FeedbackText message={message} />}
		</>
	);
};

export default EmployeeRecordsContent;

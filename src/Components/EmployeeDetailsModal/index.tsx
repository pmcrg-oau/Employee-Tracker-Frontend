import { Dispatch, FC, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import User, { EmployeeDetailsValues } from '../../typesAndInterfaces/User';
import EmployeeDetail from '../EmployeeDetail';
import './EmployeeDetailsModal.styles.scss';

type EmployeeDetailsModalProps = {
	employee: User | EmployeeDetailsValues;
	setShowEmployeeDetailsModal: Dispatch<SetStateAction<boolean>>;
};

const EmployeeDetailsModal: FC<EmployeeDetailsModalProps> = ({
	employee,
	setShowEmployeeDetailsModal,
}) => {
	return (
		<section className='employee__details__modal'>
			<div className='employee__details__modal__content'>
				<header className='employee__details__modal__content__header'>
					<button className='active'>Employee Details</button>
				</header>

				<main className='employee__details__modal__content__body'>
					<EmployeeDetail employee={employee}/>
				</main>

				<footer className='employee__details__modal__content__footer'>
					<Link to={`/user/${employee._id}`}>
						<button className='edit'>Edit</button>
					</Link>
					<button
						className='cancel'
						onClick={() => setShowEmployeeDetailsModal(false)}
					>
						Back
					</button>
				</footer>
			</div>
		</section>
	);
};

export default EmployeeDetailsModal;

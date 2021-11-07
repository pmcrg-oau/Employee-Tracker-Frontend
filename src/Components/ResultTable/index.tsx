import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import Table from './Table';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableHead from './TableHead';
import TableRow from './TableRow';
import TableData from './TableData';
import importantDets from '../../data/ImportantDets';
import User, { EmployeeDetailsValues } from '../../typesAndInterfaces/User';
import EmployeeDetailsModal from '../EmployeeDetailsModal';

import './ResultTable.styles.scss';
import { Link } from 'react-router-dom';

type ResultTableProps = {
	users: User[] | [];
	loading: boolean;
};

const ResultTable: FC<ResultTableProps> = ({ users, loading }) => {
	const [employee, setEmployee] = useState<User | EmployeeDetailsValues>(
		importantDets
	);
	const [showEmployeeDetailsModal, setShowEmployeeDetailsModal] =
		useState<boolean>(false);

	return (
		<>
			{showEmployeeDetailsModal && (
				<EmployeeDetailsModal
					employee={employee}
					setShowEmployeeDetailsModal={setShowEmployeeDetailsModal}
				/>
			)}

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead title={'S/N'} />
						<TableHead title={'File No.'} />
						<TableHead title={'Firstname'} />
						<TableHead title={'Othername'} />
						<TableHead title={'Surname'} />
						<TableHead title={'Actions'} />
					</TableRow>
				</TableHeader>
				<TableBody>
					{!loading ? (
						<>
							{users.map((user, keyId) => (
								<TableRow key={user._id} forTableBody>
									<TableData text={`${keyId + 1}`} />
									<TableData text={user.fileno} />
									<TableData text={user.firstname} />
									<TableData text={user.othername} />
									<TableData text={user.surname} />
									<TableData text=''>
										<button
											onClick={() => {
												setEmployee(user);
												setShowEmployeeDetailsModal(true);
											}}
										>
											<i className='fas fa-eye'></i>
										</button>

										<Link to={`/user/${user._id}`}>
											<button className='edit'>
												<i className='fas fa-user-edit'></i>
											</button>
										</Link>

										<button
											onClick={() => null}
										>
											<i className='fas fa-trash'></i>
										</button>
									</TableData>
								</TableRow>
							))}
							{users.length === 0 && (
								<TableRow forTableBody>
									<TableData text={'No Result to show'} colSpan={6} />
								</TableRow>
							)}
						</>
					) : (
						[...Array(4)].map((_, idx) => (
							<TableRow key={idx} forTableBody>
								{[...Array(6)].map((_, idx) => (
									<TableData key={idx} text={''}>
										<Skeleton height={40} />
									</TableData>
								))}
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</>
	);
};

export default ResultTable;

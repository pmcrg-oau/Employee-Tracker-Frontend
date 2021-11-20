import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import useAxios from 'axios-hooks';

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
	setUsers: Dispatch<SetStateAction<User[] | []>>;
	loading: boolean;
	setMessage: Dispatch<SetStateAction<string>>;
};

const ResultTable: FC<ResultTableProps> = ({
	users,
	setUsers,
	loading,
	setMessage,
}) => {
	const [idToDelete, setIdToDelete] = useState<string>('');
	const [employee, setEmployee] = useState<User | EmployeeDetailsValues>(
		importantDets
	);
	const [showEmployeeDetailsModal, setShowEmployeeDetailsModal] =
		useState<boolean>(false);

	const [{ loading: loadingDelete }, deleteEmp] = useAxios(
		{
			url: `/user/${idToDelete}`,
			method: 'delete',
		},
		{ manual: true }
	);

	const deleteEmployee = async (id: string) => {
		try {
			await deleteEmp();
			setMessage('Employee deleted sucessfully!');
			setTimeout(() => {
				setMessage('');
			},5000);
			const filteredEmployees = users.filter((user) => user._id !== id);
			setUsers(filteredEmployees);
		} catch (error: any) {
			setMessage(error?.response?.data?.message);
			setTimeout(() => {
				setMessage('');
			},5000);
		}
	};

	useEffect(() => {
		if (idToDelete) deleteEmployee(idToDelete);
	}, [idToDelete]);

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

										<button onClick={() => setIdToDelete(user._id)}>
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

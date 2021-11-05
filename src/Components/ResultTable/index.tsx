import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

import Table from './Table';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableHead from './TableHead';
import TableRow from './TableRow';
import TableData from './TableData';
import User from '../../typesAndInterfaces/User';

import './ResultTable.styles.scss';

type ResultTableProps = {
	users: User[] | [];
	loading: boolean;
};

const ResultTable: FC<ResultTableProps> = ({ users, loading }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead title={'S/N'} />
					<TableHead title={'File No.'} />
					<TableHead title={'Firstname'} />
					<TableHead title={'Othername'} />
					<TableHead title={'Surname'} />
					<TableHead title={'View Details'} />
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
									<Link to={`/user/${user._id}`}>View</Link>
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
							{[...Array(26)].map((_, idx) => (
								<TableData key={idx} text={''}>
									<Skeleton height={40} />
								</TableData>
							))}
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
};

export default ResultTable;

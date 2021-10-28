import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { format } from 'date-fns';

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
					<TableHead title={'Firstname'} />
					<TableHead title={'Othername'} />
					<TableHead title={'Surname'} />
					<TableHead title={'Gender'} />
					<TableHead title={'Marital Status'} />
					<TableHead title={'Phone'} />
					<TableHead title={'Email'} />
					<TableHead title={'D.O.B'} />
					<TableHead title={'File No.'} />
					<TableHead title={'Institution'} />
					<TableHead title={'Department'} />
					<TableHead title={'Designation'} />
					<TableHead title={'Bank'} />
					<TableHead title={'Account No.'} />
					<TableHead title={'Sort Code'} />
					<TableHead title={'Address'} />
					<TableHead title={'First Appointment'} />
					<TableHead title={'Present Appointment'} />
					<TableHead title={'Retirement'} />
					<TableHead title={'Agency'} />
					<TableHead title={'Certificate Year'} />
					<TableHead title={'State'} />
					<TableHead title={'LGA'} />
					<TableHead title={'Geo. Zone'} />
					<TableHead title={'T.I.N'} />
				</TableRow>
			</TableHeader>
			<TableBody>
				{!loading ? (
					<>
						{users.map((user, keyId) => (
							<TableRow key={user._id} forTableBody>
								<TableData text={`${keyId + 1}`} />
								<TableData text={user.firstname} />
								<TableData text={user.othername} />
								<TableData text={user.surname} />
								<TableData text={user.gender} />
								<TableData text={user.maritalstatus} />
								<TableData text={user.phone} />
								<TableData text={user.email} />
								<TableData text={format(new Date(user.dob), 'dd/MM/yyyy')} />
								<TableData text={user.fileno} />
								<TableData text={user.institution} />
								<TableData text={user.department} />
								<TableData text={user.designation} />
								<TableData text={user.bank} />
								<TableData text={user.account} />
								<TableData text={user.sortcode} />
								<TableData text={user.address} />
								<TableData
									text={format(new Date(user.firstappointment), 'dd/MM/yyyy')}
								/>
								<TableData
									text={format(new Date(user.presentappointment), 'dd/MM/yyyy')}
								/>
								<TableData
									text={format(new Date(user.retirement), 'dd/MM/yyyy')}
								/>
								<TableData text={user.agency} />
								<TableData text={user.certificateyear} />
								<TableData text={user.state} />
								<TableData text={user.lga} />
								<TableData text={user.geozone} />
								<TableData text={user.tin} />
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

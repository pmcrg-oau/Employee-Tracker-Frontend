import { FC } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import User, { EmployeeDetailsValues } from '../../typesAndInterfaces/User';
import Detail from '../Detail';

import './EmployeeDetail.styles.scss';

const EmployeeDetail: FC<{ employee: User | EmployeeDetailsValues }> = ({
	employee,
}) => {
	return (
		<section id='employee__detail__container'>
			<>
				<div className="view__records">
					<Link to={`/user/${employee._id}/records`}>
						<i className="fas fa-clipboard"></i>
						View Records
					</Link>
				</div>
				<p className='legend'>Basic Information</p>
				<div className='container'>
					<div className='form__left'>
						<Detail label='File No.' value={employee.fileno} />
						<Detail label='Surname' value={employee.surname} />
						<Detail label='Othername' value={employee.othername} />
						<Detail label='Firstname' value={employee.firstname} />
						<Detail label='Phone' value={employee.phone} />
						<Detail label='Email' value={employee.email} />
						<Detail label='State' value={employee.state} />
						<Detail label='L.G.A' value={employee.lga} />
					</div>
					<div className='form__right'>
						<Detail
							label='Gender'
							value={employee.gender === 'M' ? 'Male' : 'Female'}
						/>
						<Detail
							label='D.O.B'
							value={format(new Date(employee.dob), 'dd/MM/yyyy')}
						/>
						<Detail label='Designation' value={employee.designation} />
						<Detail label='Address' value={employee.address} />
						<Detail label='Institution' value={employee.institution} />
						<Detail label='T.I.N' value={employee.tin} />
						<Detail label='Geozone' value={employee.geozone} />
					</div>
				</div>

				<p className='legend'>Bank Account Information</p>
				<div className='container'>
					<div className='form__left'>
						<Detail label='Bank' value={employee.bank} />
						<Detail
							label='Bank Account No.'
							value={employee.account.toString()}
						/>
						<Detail label='Sort Code' value={employee.sortcode} />
					</div>
				</div>

				<p className='legend'>Appointment Dates and Certificates</p>
				<div className='container'>
					<div className='form__left'>
						<Detail
							label='First Appointment'
							value={format(new Date(employee.firstappointment), 'dd/MM/yyyy')}
						/>
						<Detail
							label='Present Appointment'
							value={format(
								new Date(employee.presentappointment),
								'dd/MM/yyyy'
							)}
						/>
					</div>
					<div className='form__right'>
						<Detail
							label='Retirement'
							value={format(new Date(employee.retirement), 'dd/MM/yyyy')}
						/>
						<Detail label='Certificate Year' value={employee.certificateyear} />
					</div>
				</div>

				<p className='legend'>Other Information</p>
				<div className='container'>
					<div className='form__left'>
						<Detail label='Agency' value={employee.agency} />
						<Detail label='cadre' value={employee.cadre} />
						<Detail
							label='Confirmation'
							value={format(new Date(employee.confirmation), 'dd/MM/yyyy')}
						/>
						<Detail label='ippis' value={employee.ippis} />
						<Detail label='step' value={employee.step} />
					</div>
					<div className='form__right'>
						<Detail label='Conraiss' value={employee.conraiss} />
						<Detail label='nhf' value={employee.nhf} />
						<Detail label='nhis' value={employee.nhis} />
						<Detail label='pencomadmin' value={employee.pencomadmin} />
						<Detail
							label='pencomnumber'
							value={employee.pencomnumber.toString()}
						/>
					</div>
				</div>
			</>
		</section>
	);
};

export default EmployeeDetail;

import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

import User, { EmployeeDetailsValues } from '../../typesAndInterfaces/User';
import { regValues } from '../../typesAndInterfaces/otherTypes';
import FormField from '../FormField/FormField';
import DropdownOptions from '../DropdownOptions';
import {
	genderOptions,
	maritalOptions,
	geoZoneOptions,
	departmentOptions,
	stateOptions,
	lgaOptions,
} from '../../data/optionsData';
import './EditForm.styles.scss';

type EditFormProps = {
	details: User | EmployeeDetailsValues;
};

const EditForm: FC<EditFormProps> = ({ details }) => {
	const [buttonActive, setButtonActive] = useState<boolean>(true);
	const {
		firstname,
		othername,
		surname,
		email,
		fileno,
		account,
		address,
		agency,
		bank,
		cadre,
		certificateyear,
		confirmation,
		conraiss,
		department,
		designation,
		dob,
		firstappointment,
		gender,
		geozone,
		institution,
		ippis,
		lga,
		maritalstatus,
		nhf,
		nhis,
		pencomadmin,
		pencomnumber,
		phone,
		presentappointment,
		retirement,
		sortcode,
		state,
		step,
		tin,
	} = details;

	const { register, watch, setValue, handleSubmit } =
		useForm<EmployeeDetailsValues>({});

	const registerValues = (valueArr: regValues[]) => {
		for (let value of valueArr) {
			register(value, {
				required: true,
			});
		}
	};

	const checkInputValues = (watchFields: string[]) => {
		for(let field of watchFields){
			if(field?.length === 0) return false;
		}

		return true;
	};

	// watch for when the username and password values change
	const watchFields: string[] = watch([
		'surname',
		'othername',
		'firstname',
		'phone',
		'email',
		'institution',
		'designation',
		'address',
		'bank',
		'account',
		'sortcode',
		'firstappointment',
		'presentappointment',
		'retirement',
		'certificateyear',
		'cadre',
		'confirmation',
	]);

	useEffect(() => {
		registerValues([
			'surname',
			'othername',
			'firstname',
			'phone',
			'email',
			'institution',
			'designation',
			'address',
			'bank',
			'account',
			'sortcode',
			'firstappointment',
			'presentappointment',
			'retirement',
			'certificateyear',
			'cadre',
			'confirmation',
		]);
	}, []);

	useEffect(() => {
		// disable or enable submit button based on input values length
		if(checkInputValues(watchFields)){
			setButtonActive(true);
		} else {
			setButtonActive(false);
		}
	}, [watchFields]);

	return (
		<section id='edit__form'>
			<form action=''>
				<fieldset>
					<legend>Basic Information</legend>
					<div className='form__left'>
						<FormField
							type='text'
							label='File No.'
							name='fileno'
							id='fileno'
							placeholder='e.g PEDI/LES/PF/046'
							defaultValue={fileno}
							disabled={true}
						/>
						<FormField
							type='text'
							label='Surname'
							id='surname'
							placeholder='e.g Akinlade'
							defaultValue={surname}
							onChange={({ target }) => setValue('surname', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Othername'
							id='othername'
							placeholder='e.g Emmanuel'
							defaultValue={othername}
							onChange={({ target }) => setValue('othername', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Firstname'
							id='firstname'
							placeholder='e.g Abiodun'
							defaultValue={firstname}
							onChange={({ target }) => setValue('firstname', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Phone'
							id='phone'
							placeholder='e.g 09076845342'
							defaultValue={phone}
							onChange={({ target }) => setValue('phone', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Email'
							id='email'
							placeholder='e.g abiloye26@gmail.com'
							defaultValue={email}
							onChange={({ target }) => setValue('email', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Institution'
							id='institution'
							placeholder='e.g ELEFOSON GRAM. SCHL'
							defaultValue={institution}
							onChange={({ target }) => setValue('institution', target.value)}
							required
						/>
						<FormField
							type='text'
							label='T.I.N'
							name='tin'
							id='tin'
							placeholder='e.g 1021848542'
							defaultValue={tin}
							disabled={true}
						/>
					</div>
					<div className='form__right'>
						<FormField
							type='date'
							label='D.O.B'
							name='dob'
							id='dob'
							placeholder='e.g 21/09/1987'
							defaultValue={dob && format(new Date(dob), 'yyyy-MM-dd')}
							disabled={true}
						/>
						<FormField
							type='text'
							label='Designation'
							id='designation'
							placeholder='e.g Chief Motor Driver Mechanic'
							defaultValue={designation}
							onChange={({ target }) => setValue('designation', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Address'
							id='address'
							placeholder='e.g PEDI, ILESA'
							defaultValue={address}
							onChange={({ target }) => setValue('address', target.value)}
							required
						/>
						<DropdownOptions
							label='Marital Status'
							options={maritalOptions}
							value={
								maritalstatus === 'Married' ? maritalOptions[0] : undefined
							}
						/>
						<DropdownOptions
							label='Gender'
							options={genderOptions}
							value={gender === 'M' ? genderOptions[0] : undefined}
						/>
						<DropdownOptions label='Department' options={departmentOptions} />
						<DropdownOptions label='State' options={stateOptions} />
						<DropdownOptions label='Geo.Zone' options={geoZoneOptions} />
						<DropdownOptions label='LGA' options={lgaOptions} />
					</div>
				</fieldset>

				<fieldset>
					<div className='form__left'>
						<legend>Bank Account Information</legend>
						<FormField
							type='text'
							label='Bank'
							id='bank'
							placeholder='e.g UBA'
							defaultValue={bank}
							onChange={({ target }) => setValue('bank', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Bank Account No.'
							id='account'
							placeholder='e.g 2028049919'
							defaultValue={account}
							onChange={({ target }) => setValue('account', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Sort Code'
							id='sortcode'
							placeholder='e.g 033180560'
							defaultValue={sortcode}
							onChange={({ target }) => setValue('sortcode', target.value)}
							required
						/>
					</div>
				</fieldset>

				<fieldset>
					<div className='form__left'>
						<legend>Appointment Dates and Certificates</legend>
						<FormField
							type='date'
							label='First Appointment'
							id='firstappointment'
							placeholder='e.g 21/09/1987'
							defaultValue={
								firstappointment &&
								format(new Date(firstappointment), 'yyyy-MM-dd')
							}
							onChange={({ target }) => setValue('firstappointment', target.value)}
							required
						/>
						<FormField
							type='date'
							label='Present Appointment'
							id='presentappointment'
							placeholder='e.g 21/09/1987'
							defaultValue={
								presentappointment &&
								format(new Date(presentappointment), 'yyyy-MM-dd')
							}
							onChange={({ target }) => setValue('presentappointment', target.value)}
							required
						/>
					</div>

					<div className='form__right'>
						<FormField
							type='date'
							label='Retirement'
							id='retirement'
							placeholder='e.g 21/09/1987'
							defaultValue={
								retirement && format(new Date(retirement), 'yyyy-MM-dd')
							}
							onChange={({ target }) => setValue('retirement', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Certificate Year'
							id='certificateyear'
							placeholder='e.g 2009, 2015'
							defaultValue={certificateyear}
							onChange={({ target }) =>
								setValue('certificateyear', target.value)
							}
							required
						/>
					</div>
				</fieldset>

				<fieldset>
					<div className='form__left'>
						<legend>Other Information</legend>
						<FormField
							type='text'
							label='Agency'
							name='agency'
							id='agency'
							placeholder='e.g PEDI/NASENI'
							defaultValue={agency}
							disabled={true}
						/>
						<FormField
							type='text'
							label='cadre'
							id='cadre'
							placeholder='e.g Executive'
							defaultValue={cadre}
							onChange={({ target }) => setValue('cadre', target.value)}
							required
						/>
						<FormField
							type='date'
							label='Confirmation'
							id='confirmation'
							placeholder='e.g 21/09/1987'
							defaultValue={
								confirmation && format(new Date(confirmation), 'yyyy-MM-dd')
							}
							onChange={({ target }) => setValue('confirmation', target.value)}
							required
						/>
						<FormField
							type='text'
							label='ippis'
							name='ippis'
							id='ippis'
							placeholder='e.g 232498'
							defaultValue={ippis}
							disabled={true}
						/>
						<FormField
							type='text'
							label='step'
							name='step'
							id='step'
							placeholder='e.g 6'
							defaultValue={step}
							disabled={true}
						/>
					</div>

					<div className='form__right'>
						<FormField
							type='text'
							label='Conraiss'
							name='conraiss'
							id='conraiss'
							placeholder='e.g 6'
							defaultValue={conraiss}
							disabled={true}
						/>
						<FormField
							type='text'
							label='nhf'
							name='nhf'
							id='nhf'
							placeholder='e.g 135086564-1'
							defaultValue={nhf}
							disabled={true}
						/>
						<FormField
							type='text'
							label='nhis'
							name='nhis'
							id='nhis'
							placeholder='e.g 03131047'
							defaultValue={nhis}
							disabled={true}
						/>
						<FormField
							type='text'
							label='pencomadmin'
							name='pencomadmin'
							id='pencomadmin'
							placeholder='e.g IBTC Pension'
							defaultValue={pencomadmin}
							disabled={true}
						/>
						<FormField
							type='text'
							label='pencomnumber'
							name='pencomnumber'
							id='pencomnumber'
							placeholder='e.g PEN100673800917'
							defaultValue={pencomnumber}
							disabled={true}
						/>
					</div>
				</fieldset>

				<div className='button__container'>
					<button className='search' disabled={!buttonActive}>
						{/* {loading ? <Loader /> : 'Upload'} */}
						Update Employee
					</button>
				</div>
			</form>
		</section>
	);
};

export default EditForm;


// format(new Date(target.value), 'dd/MM/yyyy')
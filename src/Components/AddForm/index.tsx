import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { useHistory } from 'react-router-dom';

import { EmployeeDetailsValues } from '../../typesAndInterfaces/User';
import Loader from '../Loader';
import { regValues } from '../../typesAndInterfaces/otherTypes';
import FormField from '../FormField/FormField';
import DropdownOptions from '../DropdownOptions';
import {
	departmentOptions,
	genderOptions,
	geoZoneOptions,
	lgaOptions,
	maritalOptions,
	stateLgas,
	stateOptions,
} from '../../data/optionsData';
import { useForm } from 'react-hook-form';
import './AddForm.styles.scss';

type AddFormProps = {
	setMessage: Dispatch<SetStateAction<string>>;
}

const AddForm: FC<AddFormProps> = ({ setMessage }) => {
	const history = useHistory();
	const [buttonActive, setButtonActive] = useState<boolean>(false);
	const [genderOption, setGenderOption] = useState<string>('M');
	const [maritalStatus, setMaritalStatus] = useState<string>('Married');
	const [geoZoneOption, setGeoZoneOption] = useState<string>('South West');
	const [lgaArray, setLgaArray] = useState<string[]>(stateLgas[0].lgas);
	const [lgaOption, setLgaOption] = useState<string>(stateLgas[0].lgas[0]);
	const [departmentOption, setDepartmentOption] = useState<string>('Admin&HR');
	const [stateOption, setStateOption] = useState<string>('Adamawa');
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
		for (let field of watchFields) {
			if (!field?.length) return false;
		}

		return true;
	};

	// watch for when the username and password values change
	const watchFields: string[] = watch([
		'fileno',
		'surname',
		'othername',
		'firstname',
		'dob',
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
		'tin',
		'step',
		'pencomadmin',
		'pencomnumber',
		'nhf',
		'nhis',
		'conraiss',
		'agency',
		'ippis',
	]);

	const [{ loading }, addEmployee] = useAxios(
		{
			url: '/user',
			method: 'post',
		},
		{ manual: true }
	);

	const onSubmit = async (data: { [x: string]: any }) => {
		const specifiedData = {
			...data,
			gender: genderOption,
			lga: lgaOption,
			department: departmentOption,
			maritalstatus: maritalStatus,
			geozone: geoZoneOption,
			state: stateOption,
		};

		try {
			await addEmployee({
				data: specifiedData,
			});
			setMessage('Employee created sucessfully!');
			setTimeout(() => {
				setMessage('');
				history.push('/');
			}, 3000);
		} catch (error: any) {
			setMessage(error?.response?.data?.message);
			setTimeout(() => {
				setMessage('');
			}, 3000);
		}
	};

	useEffect(() => {
		registerValues([
			'fileno',
			'surname',
			'othername',
			'firstname',
			'dob',
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
			'tin',
			'step',
			'pencomadmin',
			'pencomnumber',
			'nhf',
			'nhis',
			'conraiss',
			'agency',
			'ippis',
		]);
	}, []);

	useEffect(() => {
		// disable or enable submit button based on input values length
		if (checkInputValues(watchFields)) {
			setButtonActive(true);
		} else {
			setButtonActive(false);
		}
	}, [watchFields]);

	useEffect(() => {
		const newLgas = stateLgas.filter(
			(stateOp) => stateOp.state === stateOption
		)[0].lgas;
		setLgaArray(newLgas);
	}, [stateOption]);

	return (
		<section id='add__form'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<fieldset>
					<legend>Basic Information</legend>
					<div className='form__left'>
						<FormField
							type='text'
							label='File No.'
							name='fileno'
							id='fileno'
							placeholder='e.g PEDI/LES/PF/046'
							onChange={({ target }) => setValue('fileno', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Surname'
							name='surname'
							id='surname'
							placeholder='e.g Akinlade'
							onChange={({ target }) => setValue('surname', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Othername'
							name='othername'
							id='othername'
							placeholder='e.g Emmanuel'
							onChange={({ target }) => setValue('othername', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Firstname'
							name='firstname'
							id='firstname'
							placeholder='e.g Abiodun'
							onChange={({ target }) => setValue('firstname', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Phone'
							name='phone'
							id='phone'
							placeholder='e.g 09076845342'
							onChange={({ target }) => setValue('phone', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Email'
							name='email'
							id='email'
							placeholder='e.g abiloye26@gmail.com'
							onChange={({ target }) => setValue('email', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Institution'
							name='institution'
							id='institution'
							placeholder='e.g ELEFOSON GRAM. SCHL'
							onChange={({ target }) => setValue('institution', target.value)}
							required
						/>
						<FormField
							type='text'
							label='T.I.N'
							name='tin'
							id='tin'
							placeholder='e.g 1021848542'
							onChange={({ target }) => setValue('tin', target.value)}
							required
						/>
					</div>
					<div className='form__right'>
						<FormField
							type='date'
							label='D.O.B'
							name='dob'
							id='dob'
							placeholder='e.g 21/09/1987'
							onChange={({ target }) => setValue('dob', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Designation'
							name='designation'
							id='designation'
							placeholder='e.g Chief Motor Driver Mechanic'
							onChange={({ target }) => setValue('designation', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Address'
							name='address'
							id='address'
							placeholder='e.g PEDI, ILESA'
							onChange={({ target }) => setValue('address', target.value)}
							required
						/>
						<DropdownOptions label='Marital Status' options={maritalOptions} onChange={setMaritalStatus}/>
						<DropdownOptions label='Gender' options={genderOptions} onChange={setGenderOption}/>
						<DropdownOptions label='Department' options={departmentOptions} onChange={setDepartmentOption}/>
						<DropdownOptions label='State' options={stateOptions} onChange={setStateOption}/>
						<DropdownOptions label='Geo.Zone' options={geoZoneOptions} onChange={setGeoZoneOption}/>
						<DropdownOptions label='LGA' options={lgaOptions(lgaArray)} onChange={setLgaOption}/>
					</div>
				</fieldset>

				<fieldset>
					<div className='form__left'>
						<legend>Bank Account Information</legend>
						<FormField
							type='text'
							label='Bank'
							name='bank'
							id='bank'
							placeholder='e.g UBA'
							onChange={({ target }) => setValue('bank', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Bank Account No.'
							name='account'
							id='account'
							placeholder='e.g 2028049919'
							onChange={({ target }) => setValue('account', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Sort Code'
							name='sortcode'
							id='sortcode'
							placeholder='e.g 033180560'
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
							name='firstappointment'
							id='firstappointment'
							placeholder='e.g 21/09/1987'
							onChange={({ target }) =>
								setValue('firstappointment', target.value)
							}
							required
						/>
						<FormField
							type='date'
							label='Present Appointment'
							name='presentappointment'
							id='presentappointment'
							placeholder='e.g 21/09/1987'
							onChange={({ target }) =>
								setValue('presentappointment', target.value)
							}
							required
						/>
					</div>

					<div className='form__right'>
						<FormField
							type='date'
							label='Retirement'
							name='Retirement'
							id='Retirement'
							placeholder='e.g 21/09/1987'
							onChange={({ target }) => setValue('retirement', target.value)}
							required
						/>
						<FormField
							type='text'
							label='Certificate Year'
							name='certificateyear'
							id='certificateyear'
							placeholder='e.g 2009, 2015'
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
							onChange={({ target }) => setValue('agency', target.value)}
							required
						/>
						<FormField
							type='text'
							label='cadre'
							name='cadre'
							id='cadre'
							placeholder='e.g Executive'
							onChange={({ target }) => setValue('cadre', target.value)}
							required
						/>
						<FormField
							type='date'
							label='Confirmation'
							name='confirmation'
							id='confirmation'
							placeholder='e.g 21/09/1987'
							onChange={({ target }) => setValue('confirmation', target.value)}
							required
						/>
						<FormField
							type='text'
							label='ippis'
							name='ippis'
							id='ippis'
							placeholder='e.g 232498'
							onChange={({ target }) => setValue('ippis', target.value)}
							required
						/>
						<FormField
							type='text'
							label='step'
							name='step'
							id='step'
							placeholder='e.g 6'
							onChange={({ target }) => setValue('step', target.value)}
							required
						/>
					</div>

					<div className='form__right'>
						<FormField
							type='text'
							label='Conraiss'
							name='conraiss'
							id='conraiss'
							placeholder='e.g 6'
							onChange={({ target }) => setValue('conraiss', target.value)}
							required
						/>
						<FormField
							type='text'
							label='nhf'
							name='nhf'
							id='nhf'
							placeholder='e.g 135086564-1'
							onChange={({ target }) => setValue('nhf', target.value)}
							required
						/>
						<FormField
							type='text'
							label='nhis'
							name='nhis'
							id='nhis'
							placeholder='e.g 03131047'
							onChange={({ target }) => setValue('nhis', target.value)}
							required
						/>
						<FormField
							type='text'
							label='pencomadmin'
							name='pencomadmin'
							id='pencomadmin'
							placeholder='e.g IBTC Pension'
							onChange={({ target }) => setValue('pencomadmin', target.value)}
							required
						/>
						<FormField
							type='text'
							label='pencomnumber'
							name='pencomnumber'
							id='pencomnumber'
							placeholder='e.g PEN100673800917'
							onChange={({ target }) => setValue('pencomnumber', target.value)}
							required
						/>
					</div>
				</fieldset>

				<div className='button__container'>
					<button className='search' disabled={!buttonActive}>
						{loading ? <Loader /> : 'Add Employee'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AddForm;

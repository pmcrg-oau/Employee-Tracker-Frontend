import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import FormField from '../FormField/FormField';
import Loader from '../Loader';
import DropdownOptions from '../DropdownOptions';
import {
	departmentOptions,
	genderOptions,
	maritalOptions,
} from '../../data/optionsData';
import { searchValues } from '../../typesAndInterfaces/otherTypes';
import './SearchForm.styles.scss';

type searchFormprops = {
	getEmployees: (data: { [x: string]: any }) => void;
	loading: boolean;
	setSearchData: Dispatch<SetStateAction<{ [x: string]: any }>>
};

type SearchFormValues = {
	fileno: string;
	firstname: string;
	othername: string;
	surname: string;
	email: string;
	dob: string;
	tin: string;
};

const SearchForm: FC<searchFormprops> = ({ getEmployees, loading, setSearchData }) => {
	const [buttonActive, setButtonActive] = useState<boolean>(false);
	const [maritalStatus, setMaritalStatus] = useState('Married');
	const [gender, setGender] = useState('M');
	const [department, setDepartment] = useState('Admin&HR');
	const { register, watch, setValue, handleSubmit } = useForm<SearchFormValues>(
		{
			defaultValues: {
				fileno: '',
				firstname: '',
				othername: '',
				surname: '',
				email: '',
				dob: '',
				tin: '',
			},
		}
	);

	const onSubmit: SubmitHandler<SearchFormValues> = (data: {
		[x: string]: any;
	}) => {
		const newData = {
			...data,
			maritalstatus: maritalStatus,
			department,
			gender,
		};
		setSearchData(newData);
		getEmployees(newData);
	};

	const registerValues = (valueArr: searchValues[]) => {
		for (let value of valueArr) {
			register(value);
		}
	};

	const checkInputValues = (watchFields: string[]) => {
		for (let field of watchFields) {
			if (field?.length > 0) return true;
		}

		return false;
	};

	// watch for when the username and password values change
	const watchFields: string[] = watch([
		'fileno',
		'surname',
		'othername',
		'firstname',
		'email',
		'dob',
		'tin',
	]);

	useEffect(() => {
		registerValues([
			'fileno',
			'surname',
			'othername',
			'firstname',
			'email',
			'dob',
			'tin',
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

	return (
		<section id='search__form'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<fieldset>
					<legend>Search Parameters</legend>
					<div className='form__left'>
						<FormField
							type='text'
							label='File No.'
							name='fileno'
							id='fileno'
							placeholder='e.g PEDI/LES/PF/046'
							onChange={({ target }) => setValue('fileno', target.value)}
						/>
						<FormField
							type='text'
							label='Surname'
							id='surname'
							placeholder='e.g Akinlade'
							onChange={({ target }) => setValue('surname', target.value)}
						/>
						<FormField
							type='text'
							label='Othername'
							name='othername'
							id='othername'
							placeholder='e.g Emmanuel'
							onChange={({ target }) => setValue('othername', target.value)}
						/>
						<FormField
							type='text'
							label='Firstname'
							name='firstname'
							id='firstname'
							placeholder='e.g Abiodun'
							onChange={({ target }) => setValue('firstname', target.value)}
						/>
						<FormField
							type='text'
							label='Email'
							name='email'
							id='email'
							placeholder='e.g abiloye26@gmail.com'
							onChange={({ target }) => setValue('email', target.value)}
						/>
					</div>
					<div className='form__right'>
						<DropdownOptions
							label='Marital Status'
							options={maritalOptions}
							onChange={setMaritalStatus}
						/>
						<DropdownOptions label='Gender' options={genderOptions} onChange={setGender}/>
						<DropdownOptions label='Department' options={departmentOptions} onChange={setDepartment}/>
						<FormField
							type='date'
							label='D.O.B'
							name='dob'
							id='dob'
							placeholder='e.g 21/09/1987'
							onChange={({ target }) => setValue('dob', target.value)}
						/>
						<FormField
							type='text'
							label='T.I.N'
							name='tin'
							id='tin'
							placeholder='e.g 1021848542'
							onChange={({ target }) => setValue('tin', target.value)}
						/>
					</div>
				</fieldset>

				<div className='button__container'>
					<button className='search' disabled={!buttonActive}>
						{loading ? <Loader /> : 'Search'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default SearchForm;

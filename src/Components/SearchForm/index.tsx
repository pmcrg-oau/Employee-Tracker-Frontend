import { FC } from 'react';

import FormField from '../FormField/FormField';
import DropdownOptions from '../DropdownOptions';
import './SearchForm.styles.scss';

const maritalOptions: Array<{ value: string; label: string }> = [
	{ value: 'married', label: 'Married' },
	{ value: 'single', label: 'Single' },
];

const genderOptions: Array<{ value: string; label: string }> = [
	{ value: 'male', label: 'Male' },
	{ value: 'female', label: 'Female' },
];

const departmentOptions: Array<{ value: string; label: string }> = [
	{ value: 'admin and hr', label: 'Admin & HR' },
	{ value: 'sociology', label: 'Sociology' },
];

const SearchForm: FC = () => {
	return (
		<section id='search__form'>
			<form action=''>
				<fieldset>
					<legend>Search Parameters</legend>
					<div className='form__left'>
						<FormField
							type='text'
							label='File No.'
							name='fileno'
							id='fileno'
							placeholder='e.g PEDI/LES/PF/046'
						/>
						<FormField
							type='text'
							label='Surname'
							name='surname'
							id='surname'
							placeholder='e.g Akinlade'
						/>
						<FormField
							type='text'
							label='Othername'
							name='othername'
							id='othername'
							placeholder='e.g Emmanuel'
						/>
						<FormField
							type='text'
							label='Firstname'
							name='firstname'
							id='firstname'
							placeholder='e.g Abiodun'
						/>
						<FormField
							type='text'
							label='Email'
							name='email'
							id='email'
							placeholder='e.g abiloye26@gmail.com'
						/>
					</div>
					<div className='form__right'>
						<DropdownOptions label='Marital Status' options={maritalOptions} />
						<DropdownOptions label='Gender' options={genderOptions} />
						<DropdownOptions label='Department' options={departmentOptions} />
						<FormField
							type='date'
							label='D.O.B'
							name='dob'
							id='dob'
							placeholder='e.g 21/09/1987'
						/>
						<FormField
							type='text'
							label='T.I.N'
							name='tin'
							id='tin'
							placeholder='e.g 1021848542'
						/>
					</div>
				</fieldset>

				<div className='button__container'>
					<button className='search'>
						{/* {loading ? <Loader /> : 'Upload'} */}
						Search
					</button>
				</div>
			</form>
		</section>
	);
};

export default SearchForm;

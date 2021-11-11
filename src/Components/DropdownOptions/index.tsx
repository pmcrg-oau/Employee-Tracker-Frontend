import { Dispatch, FC, SetStateAction } from 'react';
import Dropdown, { Option } from 'react-dropdown';

import 'react-dropdown/style.css';
import './DropdownOptions.styles.scss';

type DropdownOptionsProps = {
	label: string;
	options: Array<{ value: string; label: string }>;
	value?: { value: string; label: string };
	onChange?: Dispatch<SetStateAction<string>>;
};

const DropdownOptions: FC<DropdownOptionsProps> = ({
	label,
	options,
	value,
	onChange,
}) => {
	return (
		<div className='dropdown'>
			<span className='dropdown__label'>{label}</span>
			<Dropdown
				options={options}
				value={value ?? options[0]}
				className={'custom__dropdown'}
				controlClassName='custom__dropdown__control'
				onChange={(option: Option) => (onChange ? onChange(option.value) : null)}
				arrowClosed={<i className='fas fa-chevron-down'></i>}
				arrowOpen={<i className='fas fa-chevron-up'></i>}
			/>
		</div>
	);
};

export default DropdownOptions;

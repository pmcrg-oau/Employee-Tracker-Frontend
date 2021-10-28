import { forwardRef } from 'react';
import { MdClear } from 'react-icons/md';
import { RiSearch2Line } from 'react-icons/ri';
import './CustomSearch.scss';

type CustomSearchProps = {
	placeholder: string;
	value: string;
	onChange: () => void;
	onFocus?: () => void;
	handleClearSearch: () => void;
	onSearch: () => void;
	id: string;
};

const CustomSearch = forwardRef<HTMLInputElement, CustomSearchProps>(
	(
		{ placeholder, value, onChange, onFocus, handleClearSearch, onSearch, id },
		ref
	) => {
		return (
			<div className='custom__search__main'>
				<input
					ref={ref}
					type='search'
					id={id}
					key={id}
					value={value}
					name={id}
					onChange={onChange}
					onFocus={onFocus}
					placeholder={placeholder}
					onKeyDown={onSearch}
					autoComplete={'off'}
				/>
				{value === '' ? (
					<div className='search__icon'>
						<RiSearch2Line />
					</div>
				) : (
					<div className='clear__icon' onClick={handleClearSearch}>
						<MdClear />
					</div>
				)}
			</div>
		);
	}
);

export default CustomSearch;

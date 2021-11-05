import { forwardRef } from 'react';

import './FormField.styles.scss';

type FormFieldProps = {
	type: string;
	label: string;
	id: string;
	[x: string]: string | ((e: any) => void) | boolean;
};

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
	({ type, label, id, ...otherProps }, ref) => {
		return (
			<div className='form__field'>
				<label htmlFor={id}>{label}</label>
				<input ref={ref} type={type} name={id} id={id} {...otherProps} />
			</div>
		);
	}
);

export default FormField;

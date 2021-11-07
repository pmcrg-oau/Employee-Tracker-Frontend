import { FC } from 'react';

import './Detail.styles.scss';

type DetailProps = {
	label: string;
	value: string;
	[x: string]: string | ((e: any) => void) | boolean;
};

const Detail: FC<DetailProps> = ({ label, value }) => {
	return (
		<div className='employee__detail'>
			<p className='employee__detail__label'>{label}</p>
			<p className='employee__detail__value'> {value} </p>
		</div>
	);
};

export default Detail;

import React from 'react';

type TableBodyProps = {
	children: any;
};

const TableBody = ({ children }: TableBodyProps): JSX.Element => {
	return <tbody className='table__body'>{children}</tbody>;
};

export default TableBody;

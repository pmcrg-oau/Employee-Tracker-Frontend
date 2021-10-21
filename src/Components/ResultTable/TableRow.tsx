import React from 'react';

type TableRowProps = {
	children: any;
};

const TableRow = ({ children }: TableRowProps): JSX.Element => {
	return <tr className='table__row'>{children}</tr>;
};

export default TableRow;

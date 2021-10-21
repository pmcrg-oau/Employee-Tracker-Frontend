import React from 'react';

type TableDataProps = {
	text: string;
};

const TableData = ({ text }: TableDataProps): JSX.Element => {
	return <td className='table__data'>{text}</td>;
};

export default TableData;

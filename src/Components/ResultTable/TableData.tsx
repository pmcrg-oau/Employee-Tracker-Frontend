import React, { FC } from 'react';

type TableDataProps = {
	text: string;
};

const TableData: FC<TableDataProps> = ({ text }) => {
	return <td className='table__data'>{text}</td>;
};

export default TableData;

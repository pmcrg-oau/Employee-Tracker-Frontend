import React from 'react';

type TableHeadProps = {
	title: string;
};

const TableHead = ({ title }: TableHeadProps): JSX.Element => {
	return <th className='table__head'>{title}</th>;
};

export default TableHead;

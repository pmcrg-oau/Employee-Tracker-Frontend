import { FC } from 'react';

type TableHeadProps = {
	title: string;
};

const TableHead: FC<TableHeadProps> = ({ title }) => {
	return <th className='table__head'>{title}</th>;
};

export default TableHead;

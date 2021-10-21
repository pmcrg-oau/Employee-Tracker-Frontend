import React from 'react';

type TableHeaderProps = {
	children: JSX.Element;
};

const TableHeader = ({ children }: TableHeaderProps): JSX.Element => {
	return <thead className='table__header'>{children}</thead>;
};

export default TableHeader;

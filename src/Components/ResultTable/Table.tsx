import React from 'react';

type TableProps = {
	children: any;
};

const Table = ({ children }: TableProps): JSX.Element => {
	return <table id='table'>{children}</table>;
};

export default Table;

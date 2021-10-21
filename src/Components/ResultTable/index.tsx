import Table from './Table';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableHead from './TableHead';
import TableRow from './TableRow';
import TableData from './TableData';

import './ResultTable.styles.scss';

const ResultTable = () => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead title={'S/N'} />
					<TableHead title={'Name'} />
					<TableHead title={'Email'} />
					<TableHead title={'Department'} />
					<TableHead title={'ID'} />
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableData text={'1'} />
					<TableData text={'Uchechukwu Nwafor'} />
					<TableData text={'nwaforuchechukwu2007@gmail.com'} />
					<TableData text={'Computer Engineering'} />
					<TableData text={'CSC/2016/070'} />
				</TableRow>

				<TableRow>
					<TableData text={'2'} />
					<TableData text={'Uchechukwu Nwafor'} />
					<TableData text={'nwaforuchechukwu2007@gmail.com'} />
					<TableData text={'Computer Engineering'} />
					<TableData text={'CSC/2016/070'} />
				</TableRow>

				<TableRow>
					<TableData text={'3'} />
					<TableData text={'Uchechukwu Nwafor'} />
					<TableData text={'nwaforuchechukwu2007@gmail.com'} />
					<TableData text={'Computer Engineering'} />
					<TableData text={'CSC/2016/070'} />
				</TableRow>

				<TableRow>
					<TableData text={'4'} />
					<TableData text={'Uchechukwu Nwafor'} />
					<TableData text={'nwaforuchechukwu2007@gmail.com'} />
					<TableData text={'Computer Engineering'} />
					<TableData text={'CSC/2016/070'} />
				</TableRow>

				<TableRow>
					<TableData text={'5'} />
					<TableData text={'Uchechukwu Nwafor'} />
					<TableData text={'nwaforuchechukwu2007@gmail.com'} />
					<TableData text={'Computer Engineering'} />
					<TableData text={'CSC/2016/070'} />
				</TableRow>

				<TableRow>
					<TableData text={'6'} />
					<TableData text={'Uchechukwu Nwafor'} />
					<TableData text={'nwaforuchechukwu2007@gmail.com'} />
					<TableData text={'Computer Engineering'} />
					<TableData text={'CSC/2016/070'} />
				</TableRow>

				<TableRow>
					<TableData text={'7'} />
					<TableData text={'Uchechukwu Nwafor'} />
					<TableData text={'nwaforuchechukwu2007@gmail.com'} />
					<TableData text={'Computer Engineering'} />
					<TableData text={'CSC/2016/070'} />
				</TableRow>

				<TableRow>
					<TableData text={'8'} />
					<TableData text={'Uchechukwu Nwafor'} />
					<TableData text={'nwaforuchechukwu2007@gmail.com'} />
					<TableData text={'Computer Engineering'} />
					<TableData text={'CSC/2016/070'} />
				</TableRow>
			</TableBody>
		</Table>
	);
};

export default ResultTable;

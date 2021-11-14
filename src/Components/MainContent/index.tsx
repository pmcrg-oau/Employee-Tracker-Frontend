import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import ReactPaginate from 'react-paginate';

import Header from '../Header';
import ResultTable from '../ResultTable';
import UploadModal from '../UploadModal';
import FeedbackText from '../FeedbackText';
import SearchForm from '../SearchForm';
import User from '../../typesAndInterfaces/User';
import useFirstRender from '../../hooks/useFirstRender';

import 'react-loading-skeleton/dist/skeleton.css';
import './MainContent.styles.scss';

type MainContentProps = {
	isSidebarExpanded: boolean;
	setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
};

type GetEmployeesProps = {
	dir?: string;
	page: number;
	limit?: number;
	search?: string;
	sortby: string;
};

const MainContent: FC<MainContentProps> = ({
	isSidebarExpanded,
	setIsSidebarExpanded,
}) => {
	const [users, setUsers] = useState<User[] | []>([]);
	const [message, setMessage] = useState<string>('');
	const [tableTop, setTableTop] = useState<boolean>(false);
	const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [limit] = useState<number>(25);
	const [searchData, setSearchData] = useState<{ [x: string]: any }>({});
	const [_, setHasNextPage] = useState<boolean>(false);
	const [_2, setHasPreviousPage] = useState<boolean>(false);

	const [{ loading }, getEmployeesList] = useAxios(
		{
			url: '/users',
			method: 'post',
		},
		{ manual: true }
	);

	const getEmployees = async (data: { [x: string]: any }) => {
		const bodyParams: GetEmployeesProps = {
			dir: 'asc',
			page: pageNumber,
			limit,
			sortby: 'firstname',
		};

		try {
			const response = await getEmployeesList({
				params: bodyParams,
				data,
			});
			setUsers(response?.data?.docs);
			setTotalPages(response?.data?.totalPages);
			setHasNextPage(response?.data?.hasNextPage);
			setHasPreviousPage(response?.data?.hasPrevPage);
		} catch (error: any) {
			setMessage(error?.response?.data?.message);
			setTimeout(() => {
				setMessage('');
			}, 3000);
		}
	};

	// Invoke when user click to request another page.
	const handlePageClick = (selectedItem: { selected: number }) => {
		setPageNumber(selectedItem.selected + 1);
	};

	useFirstRender(() => {
		getEmployees(searchData);
	}, [pageNumber]);

	useEffect(() => {
		window.addEventListener('scroll', function (e) {
			const resultTableTop = document
				.querySelector('.results__table')!
				.getBoundingClientRect().top;
			if (resultTableTop <= 0) {
				setTableTop(true);
			}
			if (resultTableTop > 0) {
				setTableTop(false);
			}
		});

		return () => {
			window.removeEventListener('scroll', function (e) {
				const resultTableTop = document
					.querySelector('.results__table')!
					.getBoundingClientRect().top;
				if (resultTableTop <= 0) {
					setTableTop(true);
				}
				if (resultTableTop > 0) {
					setTableTop(false);
				}
			});
		};
	}, []);

	return (
		<>
			<section id='main__content'>
				<Header
					isSidebarExpanded={isSidebarExpanded}
					setIsSidebarExpanded={setIsSidebarExpanded}
					setShowUploadModal={setShowUploadModal}
				/>

				<main className='main'>
					<h2 className='title'>Search Employee</h2>

					<SearchForm
						getEmployees={getEmployees}
						loading={loading}
						setSearchData={setSearchData}
					/>

					<div className='result__details'>
						{!!users.length ? (
							<p>
								Showing result{' '}
								<span className='purple'>
									{(pageNumber - 1) * users.length + 1} -{' '}
									{pageNumber * users.length}
								</span>{' '}
								out of <span className='purple'>{totalPages}</span>{' '}
								{totalPages === 1 ? 'page' : 'pages'}
							</p>
						) : (
							<p>Showing no results</p>
						)}
					</div>

					<div className={`results__table ${tableTop ? 'top' : ''}`}>
						<ResultTable
							users={users}
							setUsers={setUsers}
							loading={loading}
							setMessage={setMessage}
						/>
					</div>

					<div className='paginate__container'>
						<div className='paginator'>
							<ReactPaginate
								containerClassName='paginate'
								pageClassName='paginate__page'
								pageLinkClassName='paginate__page__link'
								activeClassName='paginate__page__active'
								activeLinkClassName='paginate__page__active__link'
								breakLabel='...'
								breakClassName='paginate__break'
								breakLinkClassName='paginate__break__link'
								nextClassName='paginate__next'
								nextLinkClassName='paginate__next__link'
								nextLabel={<i className='fas fa-caret-right'></i>}
								onPageChange={handlePageClick}
								pageRangeDisplayed={0}
								pageCount={totalPages}
								previousClassName='paginate__previous'
								previousLinkClassName='paginate__previous__link'
								previousLabel={<i className='fas fa-caret-left'></i>}
								marginPagesDisplayed={1}
								disabledClassName='paginate__disabled'
							/>
						</div>
					</div>
				</main>
			</section>

			{showUploadModal && (
				<UploadModal setShowUploadModal={setShowUploadModal} />
			)}

			{message && <FeedbackText message={message} />}
		</>
	);
};

export default MainContent;

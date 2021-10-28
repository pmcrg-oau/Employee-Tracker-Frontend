import {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import Dropdown from 'react-dropdown';
import useAxios from 'axios-hooks';
import ReactPaginate from 'react-paginate';
import Skeleton from 'react-loading-skeleton';

import ResultTable from '../ResultTable';
import UploadModal from '../UploadModal';
import FeedbackText from '../FeedbackText';
import CustomSearch from '../CustomSearch';
import User from '../../typesAndInterfaces/User';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-dropdown/style.css';
import './MainContent.styles.scss';

const options: Array<{ value: string; label: string }> = [
	{ value: 'FirstName', label: 'Status - Firstname' },
	{ value: 'Lastname', label: 'Status - Lastname' },
	{ value: 'UserId', label: 'Status - UserId' },
];

type MainContentProps = {
	isSidebarExpanded: boolean;
	setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
};

type GetUsersProps = {
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
	const customSearchRef = useRef<HTMLInputElement>(null);
	const [users, setUsers] = useState<User[] | []>([]);
	const [message, setMessage] = useState<string>('');
	const [tableTop, setTableTop] = useState<boolean>(false);
	const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
	const [requiredSort, setRequiredSort] = useState<string>('FirstName');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [limit] = useState<number>(25);
	const [_, setHasNextPage] = useState<boolean>(false);
	const [_2, setHasPreviousPage] = useState<boolean>(false);

	const [{ loading }, getUsersList] = useAxios(
		{
			url: '/users',
			method: 'get',
		},
		{ manual: true }
	);

	const getUsers = async () => {
		const bodyParams: GetUsersProps = {
			dir: 'asc',
			page: pageNumber,
			limit,
			search: searchTerm,
			sortby: requiredSort.toLowerCase(),
		};
		try {
			const response = await getUsersList({ params: bodyParams });
			// console.log(response);
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

	useEffect(() => {
		getUsers();
	}, [requiredSort, limit, searchTerm, pageNumber]);

	return (
		<>
			{message && <FeedbackText message={message} />}

			<section id='main__content'>
				<header className='header'>
					<button
						className='hamburger'
						onClick={() =>
							setIsSidebarExpanded((isSidebarExpanded) => !isSidebarExpanded)
						}
					>
						<div id='nav-icon1' className={isSidebarExpanded ? 'open' : ''}>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</button>

					<button
						className={isSidebarExpanded ? 'closed__button' : ''}
						onClick={() =>
							setShowUploadModal((showUploadModal) => !showUploadModal)
						}
					>
						+ Upload CSV/XLS
					</button>
				</header>

				<main className='main'>
					<h2 className='title'>Employee Information</h2>

					<div className='sort__by'>
						<span className='sort__by__text'>Sort By</span>
						<Dropdown
							options={options}
							value={options[0]}
							className={'custom__dropdown'}
							controlClassName='custom__dropdown__control'
							onChange={(option) => setRequiredSort(option.value)}
							arrowClosed={<i className='fas fa-chevron-down'></i>}
							arrowOpen={<i className='fas fa-chevron-up'></i>}
						/>
					</div>

					<div className='result__details'>
						<CustomSearch
							ref={customSearchRef}
							placeholder='Search Employee'
							value={searchTerm}
							onChange={() => setSearchTerm(customSearchRef.current!.value)}
							handleClearSearch={() => setSearchTerm('')}
							onSearch={getUsers}
							id='custom-search'
						/>
					</div>

					<div className='result__details'>
						<p>
							showing result{' '}
							<span className='purple'>
								{(pageNumber - 1) * users.length + 1} -{' '}
								{pageNumber * users.length}
							</span>{' '}
							out of <span className='purple'>{totalPages}</span>{' '}
							{totalPages === 1 ? 'page' : 'pages'}
						</p>
					</div>

					<div className={`results__table ${tableTop ? 'top' : ''}`}>
						<ResultTable users={users} loading={loading} />
					</div>

					<div className='paginate__container'>
						<div className='paginator'>
							{loading ? (
								<Skeleton height={40} />
							) : (
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
							)}
						</div>
					</div>
				</main>
			</section>

			{showUploadModal && (
				<UploadModal setShowUploadModal={setShowUploadModal} />
			)}
		</>
	);
};

export default MainContent;

import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';

import ResultTable from '../ResultTable';
import UploadModal from '../UploadModal';

import 'react-dropdown/style.css';
import './MainContent.styles.scss';

const options: Array<{ value: string; label: string }> = [
	{ value: 'UserId', label: 'Status - UserId' },
	{ value: 'FirstName', label: 'Status - Firstname' },
	{ value: 'Lastname', label: 'Status - Lastname' },
];

const MainContent = (): JSX.Element => {
	const [tableTop, setTableTop] = useState<boolean>(false);
	const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

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
				<header className='header'>
					<button
						onClick={() => setShowUploadModal((showUploadModal) => !showUploadModal)}
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
							className={'custom__dropdown'}
							controlClassName='custom__dropdown__control'
							placeholder={'Select Option'}
							onChange={(option) => console.log(option)}
							arrowClosed={<i className='fas fa-chevron-down'></i>}
							arrowOpen={<i className='fas fa-chevron-up'></i>}
						/>
					</div>

					<div className='result__details'>
						<p>
							showing result <span className='purple'>1 - 69</span> out of{' '}
							<span className='purple'>11</span> pages
						</p>
					</div>

					<div className={`results__table ${tableTop ? 'top' : ''}`}>
						<ResultTable />
					</div>
				</main>
			</section>

			{showUploadModal && <UploadModal setShowUploadModal={setShowUploadModal}/>}
		</>
	);
};

export default MainContent;

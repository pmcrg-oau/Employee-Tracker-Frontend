import { Dispatch, FC, SetStateAction } from 'react';

type HeaderProps = {
	isSidebarExpanded: boolean;
	setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
	setShowUploadModal: Dispatch<SetStateAction<boolean>>;
};

const Header: FC<HeaderProps> = ({
	isSidebarExpanded,
	setIsSidebarExpanded,
	setShowUploadModal,
}) => {
	return (
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
	);
};

export default Header;

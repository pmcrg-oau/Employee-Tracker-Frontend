import { Dispatch, SetStateAction } from 'react';

import './UploadModal.styles.scss';

type UploadModalProps = {
	setShowUploadModal: Dispatch<SetStateAction<boolean>>;
};

const UploadModal = ({ setShowUploadModal }: UploadModalProps): JSX.Element => {
	return (
		<section className='upload__modal'>
			<div className='upload__modal__content'>
				<header className='upload__modal__content__header'>
					<button className='active'>Upload</button>
				</header>

				<div className='upload__modal__content__body'>
                    <h2>Drag files here</h2>
                    <p>-- or --</p>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="spreadsheet">
                            <button>select files from your device</button>
                        </label>
                        <input type="file" name="spreadsheet" id="spreadsheet" hidden/>
                    </form>
                </div>

				<footer className='upload__modal__content__footer'>
					<button className='upload'>Upload</button>
					<button className='cancel' onClick={() => setShowUploadModal(false)}>
						Cancel
					</button>
				</footer>
			</div>
		</section>
	);
};

export default UploadModal;

import { Dispatch, FC, SetStateAction, useState } from 'react';

import FileDragAndDropUploader from './FileDragAndDropUploader';
import './UploadModal.styles.scss';

type UploadModalProps = {
	setShowUploadModal: Dispatch<SetStateAction<boolean>>;
};

const UploadModal: FC<UploadModalProps> = ({ setShowUploadModal }) => {
    const [file, setFile] = useState<File | null>(null);

	return (
		<section className='upload__modal'>
			<div className='upload__modal__content'>
				<header className='upload__modal__content__header'>
					<button className='active'>Upload</button>
				</header>

				<FileDragAndDropUploader file={file} setFile={setFile}/>

				<footer className='upload__modal__content__footer'>
					<button className='upload' disabled={!file}>Upload</button>
					<button className='cancel' onClick={() => setShowUploadModal(false)}>
						Cancel
					</button>
				</footer>
			</div>
		</section>
	);
};

export default UploadModal;

import useAxios from 'axios-hooks';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import FeedbackText from '../FeedbackText';

import Loader from '../Loader';
import FileDragAndDropUploader from './FileDragAndDropUploader';
import './UploadModal.styles.scss';

type UploadModalProps = {
	setShowUploadModal: Dispatch<SetStateAction<boolean>>;
};

const UploadModal: FC<UploadModalProps> = ({ setShowUploadModal }) => {
	const [file, setFile] = useState<File | null>(null);
	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [message, setMessage] = useState<string>('');

	const [{ loading }, upload] = useAxios(
		{
			url: '/upload',
			method: 'post',
			// onUploadProgress: function (progressEvent) {
			// 	console.log(progressEvent);
			// },
		},
		{ manual: true }
	);

	useEffect(() => {
		console.log(uploadProgress);
	}, [uploadProgress]);

	const uploadFile = async () => {
		const formData = new FormData();
		formData.append('file', file!);

		try {
			await upload({ data: formData });
			setMessage('File uploaded sucessfully!');
			setTimeout(() => {
				setMessage('');
				setShowUploadModal(false);
			}, 3000);
		} catch (error: any) {
			console.log(error);
			setMessage(error?.response?.data);
			setTimeout(() => {
				setMessage('');
			}, 3000);
		}
	};

	return (
		<>
			{message && <FeedbackText message={message} />}

			<section className='upload__modal'>
				<div className='upload__modal__content'>
					<header className='upload__modal__content__header'>
						<button className='active'>Upload</button>
					</header>

					<FileDragAndDropUploader file={file} setFile={setFile} />

					<footer className='upload__modal__content__footer'>
						<button className='upload' disabled={!file} onClick={uploadFile}>
							{loading ? <Loader /> : 'Upload'}
						</button>
						<button
							className='cancel'
							onClick={() => setShowUploadModal(false)}
						>
							Cancel
						</button>
					</footer>
				</div>
			</section>
		</>
	);
};

export default UploadModal;

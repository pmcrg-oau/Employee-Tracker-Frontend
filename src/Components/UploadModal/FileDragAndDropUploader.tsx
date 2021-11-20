import {
	Dispatch,
	DragEventHandler,
	FC,
	SetStateAction,
	useEffect,
	useState,
} from 'react';

import FileDragAndDropUI from './FileDragAndDropUI';

type FileDragAndDropUploaderProps = {
	file: File | null;
	setFile: Dispatch<SetStateAction<File | null>>;
};

const FileDragAndDropUploader: FC<FileDragAndDropUploaderProps> = ({
	file,
	setFile,
}) => {
	const [fileInDropZone, setFileInDropZone] = useState<boolean>(false);
	const [counter, setCounter] = useState<number>(0);
	const [message, setMessage] = useState<string>('');

	const checkFile = (file: File | null) => {
		const validExts = ['.xlsx', '.xls', '.csv'];
		const found = validExts.find((ext) => file?.name.includes(ext));
		if (file && !!found) {
			setFile(file);
		} else {
			setMessage(
				`Invalid file selected, valid files are of ${validExts.toString()} types.`
			);
			setTimeout(() => {
				setMessage('');
			},5000);
			return;
		}
	};

	const handleDragEnter: DragEventHandler = (ev) => {
		// prevent file from being opened
		ev.preventDefault();
		ev.stopPropagation();
		setCounter((counter) => counter + 1);
		if (ev.dataTransfer.items?.length || ev.dataTransfer.files?.length) {
			setFileInDropZone(true);
		}
	};

	const handleDragLeave: DragEventHandler = (ev) => {
		// prevent file from being opened
		ev.preventDefault();
		ev.stopPropagation();
		setCounter((counter) => counter - 1);
		if (counter > 0) return; // make sure drag is set to false only when mouse is all the way out
		setFileInDropZone(false);
	};

	const handleDragOver: DragEventHandler = (ev) => {
		// prevent file from being opened
		ev.preventDefault();
		ev.stopPropagation();
	};

	const handleDrop: DragEventHandler = (ev) => {
		ev.preventDefault();
		ev.stopPropagation();
		setFileInDropZone(false);

		let fileList;

		if (ev.dataTransfer.items) {
			fileList = Array.from(ev.dataTransfer.items);
			if (fileList.length > 1) {
				setMessage('Only one .csv or xls file is required');
				setTimeout(() => {
					setMessage('');
				},5000);
				return;
			}
			fileList.forEach((file) => {
				//check if the file is really a file
				if (file.kind === 'file') {
					const _file = file.getAsFile();
					checkFile(_file);
				}
			});
		} else {
			fileList = Array.from(ev.dataTransfer.files);
			if (fileList.length > 1) {
				setMessage('Only one .csv or .xls file is required');
				setTimeout(() => {
					setMessage('');
				},5000);
				return;
			}
			fileList.forEach((file) => checkFile(file));
		}
		ev.dataTransfer.clearData();
	};

	useEffect(() => {
		if (counter > 0) {
			setFileInDropZone(true);
		} else {
			setFileInDropZone(false);
		}
	}, [counter]);

	return (
		<FileDragAndDropUI
			className={'upload__modal__content__body'}
			handleDragEnter={handleDragEnter}
			handleDragLeave={handleDragLeave}
			handleDragOver={handleDragOver}
			handleDrop={handleDrop}
			file={file}
            setFile={setFile}
			checkFile={checkFile}
            message={message}
			fileInDropZone={fileInDropZone}
		/>
	);
};

export default FileDragAndDropUploader;

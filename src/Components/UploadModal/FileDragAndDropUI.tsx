import { Dispatch, DragEventHandler, FC, SetStateAction } from 'react';

import FeedbackText from '../FeedbackText';

type FileDragAndDropUIProps = {
	className: string;
	handleDragEnter: DragEventHandler;
	handleDragLeave: DragEventHandler;
	handleDragOver: DragEventHandler;
	handleDrop: DragEventHandler;
	file: File | null;
	setFile: Dispatch<SetStateAction<File | null>>;
	checkFile: (file: File | null) => void;
	message: string
	fileInDropZone: boolean;
};

const FileDragAndDropUI: FC<FileDragAndDropUIProps> = ({
	className,
	handleDragEnter,
	handleDragLeave,
	handleDragOver,
	handleDrop,
	file,
	setFile,
	checkFile,
	message,
	fileInDropZone,
}) => {
	return (
		<>
			{message && <FeedbackText message={message} />}

			<div
				className={className}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
				{fileInDropZone && (
					<div className='in__dropzone'>
						<button>Drop files here to Upload them Instantly</button>
					</div>
				)}
				{file ? (
					<div className='file__preview'>
						<div className="image">
							<img src={URL.createObjectURL(file)} alt="" />
						</div>
						<div className="file__name">{file.name}</div>
						<div className="close" onClick={() => setFile(null)}>X</div>
					</div>
				) : (
					<>
						<h2>Drag files here</h2>
						<p>-- or --</p>
						<form>
							<label htmlFor='spreadsheet'>
								<div tabIndex={0}>select files from your device</div>
								<input
									type='file'
									accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
									name='spreadsheet'
									id='spreadsheet'
									onChange={({ target }) => {
										if (target.files) checkFile(target.files[0]);
									}}
									hidden
								/>
							</label>
						</form>
					</>
				)}
			</div>
		</>
	);
};

export default FileDragAndDropUI;

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import FileUpload from "react-mui-fileuploader";
import { useFileContext } from "src/contexts/FileContext";

const FileUploadFeature = ({ isOpen, onClose, onCancel }) => {
	const [filesToUpload, setFilesToUpload] = useState([])
	const fileContext = useFileContext()

	const handleFilesChange = (files) => {
		setFilesToUpload([...files])
	};

	const handleUpload = async () => {
		filesToUpload.length != 0 && await fileContext.upload(filesToUpload)
	}

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			scroll='body'
		>
			<DialogTitle>Upload files</DialogTitle>
			<FileUpload
				style={{ color: "red" }}
				multiFile={true}
				title=""
				header="Drag or Drop"
				BannerProps={{ elevation: 24 }}
				buttonLabel="Browser"
				onFilesChange={handleFilesChange}
				maxFileSize={15}
				PlaceholderImageDimension={{
					xs: { width: 128, height: 128 },
					sm: { width: 128, height: 128 },
					md: { width: 164, height: 164 },
					lg: { width: 256, height: 256 }
				}}
			// showPlaceholderImage={false}
			// maxFilesContainerHeight={100}
			// onContextReady={(context) => { }}
			/>
			<DialogActions>
				<Button onClick={onCancel}>Cancel</Button>
				<Button
					variant='contained'
					onClick={handleUpload}
					disabled={filesToUpload.length == 0}
				>
					Upload
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default FileUploadFeature;
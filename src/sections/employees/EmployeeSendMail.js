import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEmployee } from 'src/hooks/use-employee';
import FileUpload from 'react-mui-fileuploader';
import { useState, useRef } from 'react';
import { InputLabel, TextareaAutosize } from '@mui/material';
import { useEmployeeContext } from 'src/contexts/EmployeeContext';



export default function EmployeeSendMailFormDialog({ isOpen, onClose, onCancel, onSubmit, email }) {
	const employeeContext = useEmployeeContext();
	const firstNameRef = useRef(null);
	const [filesToUpload, setFilesToUpload] = useState([])
	const handleFilesChange = (files) => {
		setFilesToUpload([...files])
	};
	const handleClearForm = () => {
		formik.resetForm();
		firstNameRef.current.focus();
	}
	const formik = useFormik({
		initialValues: {
			subject: '',
			content: '',
		},
		validationSchema: Yup.object({
			subject: Yup
				.string()
				.max(255)
				.required('Subject is required'),
			content: Yup
				.string()
				.required('Content is required'),
		}),
		onSubmit: async (values, helpers) => {
			try {
				await employeeContext.sendMail({
					emails: email,
					subject: values.subject,
					content: values.content,
					files: filesToUpload
				})
			} catch (err) {
				helpers.setStatus({ success: false });
				helpers.setErrors({ submit: err.message });
				helpers.setSubmitting(false);
			}
		}
	});

	return (

		<div>
			<Dialog
				open={isOpen}
				onClose={onClose}
				scroll='body'
			>
				<DialogTitle>Send mail</DialogTitle>
				<form
					noValidate
					onSubmit={formik.handleSubmit}
				>
					<DialogContent dividers={true}>
						<TextField
							required
							margin="dense"
							label="Subject"
							name='subject'
							type="text"
							inputRef={firstNameRef}
							error={!!(formik.touched.subject && formik.errors.subject)}
							helperText={formik.touched.subject && formik.errors.subject}
							value={formik.values.subject}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							fullWidth
						/>
						<TextField
							required
							margin="dense"
							label="Content"
							name='content'
							multiline
							// minRows={2}
							error={!!(formik.touched.content && formik.errors.content)}
							helperText={formik.touched.content && formik.errors.content}
							value={formik.values.content}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							type="text"
							fullWidth
						/>
						<InputLabel sx={{ p: 1 }}>Attached files</InputLabel>
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
								xs: { width: 128, height: 64 },
								sm: { width: 128, height: 128 },
								md: { width: 164, height: 164 },
								lg: { width: 256, height: 64 }
							}}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={onCancel}>Cancel</Button>
						<Button onClick={handleClearForm}>Clear</Button>
						<Button
							type='submit'
							variant='contained'
						>
							Send
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}
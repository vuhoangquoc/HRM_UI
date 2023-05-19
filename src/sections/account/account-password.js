import { useCallback, useState } from 'react';
import {
	Button,
	Card, CardActions, CardContent, CardHeader,
	Divider,
	Stack,
	TextField,
	Typography
} from '@mui/material';
import { useUserContext } from 'src/contexts/UserContext';
import * as Yup from "yup"
import { useFormik } from 'formik';


const AccountUpdatePassword = () => {
	const userContext = useUserContext();

	const formik = useFormik({
		initialValues: {
			currentPassword: "",
			newPassword: "",
			confirmPassword: ""
		},
		validationSchema: Yup.object({
			currentPassword: Yup.
				string().max(255)
				.required("Current password is required")
				.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
					"Password requires at least 8 characters and must include lowercase letters, uppercase letters, numbers and special characters"
				),
			newPassword: Yup
				.string().max(255)
				.required("New password is required")
				.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
					"Password requires at least 8 characters and must include lowercase letters, uppercase letters, numbers and special characters"
				).notOneOf([Yup.ref('currentPassword'), null], "New password cannot same current password"),
			confirmPassword: Yup
				.string().max(255)
				.oneOf([Yup.ref('newPassword'), null], "Password must match")
				.required("Confirm password is required"),
		}),
		onSubmit: async (values, helpers) => {
			try {
				await userContext.changePassword(values.currentPassword, values.newPassword)
				formik.resetForm();
			} catch (err) {
				helpers.setStatus({ success: false });
				helpers.setErrors({ submit: err.message });
				helpers.setSubmitting(false);
			}
		},
	});


	return (
		<form
			noValidate
			onSubmit={formik.handleSubmit}
		>
			<Card>
				<CardHeader
					title="Change Password"
				// subheader="Update password"
				/>
				<Divider />
				<CardContent>
					<Stack
						spacing={3}
						sx={{ maxWidth: 400 }}
					>
						<TextField
							fullWidth
							required
							label="Current password"
							id="currentPassword"
							name="currentPassword"
							type="password"
							error={!!(formik.touched.currentPassword && formik.errors.currentPassword)}
							helperText={formik.touched.currentPassword && formik.errors.currentPassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.currentPassword}
						/>
						<TextField
							fullWidth
							required
							label="New password"
							id="newPassword"
							name="newPassword"
							type="password"
							error={!!(formik.touched.newPassword && formik.errors.newPassword)}
							helperText={formik.touched.newPassword && formik.errors.newPassword}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.newPassword}
						/>
						<TextField
							fullWidth
							required
							label="Confirm password"
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
							helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.confirmPassword}
						/>
					</Stack>
				</CardContent>
				{formik.errors.submit && (
					<Typography color="error"
						sx={{ mt: 3 }}
						variant="body2"
					>
						{formik.errors.submit}
					</Typography>
				)}
				<Divider />
				<CardActions sx={{ justifyContent: 'flex-end' }}>
					<Button
						variant="contained"
						type='submit'
					>
						Update
					</Button>
				</CardActions>
			</Card>
		</form>
	);
};
export default AccountUpdatePassword
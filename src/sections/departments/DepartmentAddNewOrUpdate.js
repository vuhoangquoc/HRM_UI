import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Button, Card, Grid, SvgIcon, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDepartmentContext } from "src/contexts/DepartmentContext";
import * as Yup from "yup";
import { RxUpdate } from 'react-icons/rx'

export default function DepartmentAddNewOrUpdate() {
	const departmentContext = useDepartmentContext();

	const formik = useFormik({
		initialValues: {
			name: departmentContext.departmentToUpdate?.name || '',
			description: departmentContext.departmentToUpdate?.description || '',
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			name: Yup
				.string().trim()
				.max(32),
			// .required('First name is required'),
			description: Yup
				.string().trim()
				.max(255)
		}),
		onSubmit: async (values, helpers) => {
			try {
				if (values.name) {
					if (!departmentContext.departmentToUpdate) {
						await departmentContext.add({ name: values.name, description: (values.description || null) })
					} else {
						await departmentContext.updateById({ id: departmentContext.departmentToUpdate.id, name: values.name, description: (values.description || null) })
						departmentContext.resetDepartmentToUpdate();
					}
					formik.resetForm()
				}
			} catch (err) {
				helpers.setStatus({ success: false });
				helpers.setErrors({ submit: err.message });
				helpers.setSubmitting(false);
			}
		}
	});
	return (
		<form
			noValidate
			onSubmit={formik.handleSubmit}
		>
			<Card sx={{ p: 1 }}>
				<Grid
					container
					spacing={1}
					alignItems="center"
				// direction="column"
				// justifyContent="center"
				>
					<Grid
						item
						xs={3}
					>
						<TextField
							required
							fullWidth
							margin="dense"
							label="Name"
							name='name'
							type="text"
							error={!!(formik.touched.name && formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
							value={formik.values.name}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
						/>
					</Grid>
					<Grid
						item
						xs={9}
					>
						<TextField
							fullWidth
							margin="dense"
							label="Description"
							name='description'
							type="text"
							error={!!(formik.touched.description && formik.errors.description)}
							helperText={formik.touched.description && formik.errors.description}
							value={formik.values.description}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
						/>
					</Grid>
					<Grid
						item
						xs={1.5}
					>
						<Button
							type='submit'
							variant='contained'
							disabled={!formik.values.name}
							startIcon={(
								<SvgIcon fontSize="small">
									{!departmentContext.departmentToUpdate ? <PlusIcon /> : <RxUpdate />}
								</SvgIcon>
							)}
						>
							{!departmentContext.departmentToUpdate ? "Add" : "Update"}
						</Button>
					</Grid>
					{departmentContext.departmentToUpdate && (
						<Grid item>
							<Button
								variant='outlined'
								onClick={() => {
									departmentContext.resetDepartmentToUpdate();
									formik.resetForm()
								}}
							>
								{"Cancel"}
							</Button>
						</Grid>
					)}
				</Grid>
			</Card>
		</form>
	)
}
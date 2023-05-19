import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Button, Card, Grid, SvgIcon, TextField } from "@mui/material";
import { useFormik } from "formik";
import { usePositionContext } from "src/contexts/PositionContext";
import * as Yup from "yup";
import { RxUpdate } from "react-icons/rx";
import positionUtil from "src/utils/positionUtil";

export default function PositionAddNewOrUpdate() {
	const positionContext = usePositionContext();

	const formik = useFormik({
		initialValues: {
			name: positionContext.positionToUpdate?.name || "",
			description: positionContext.positionToUpdate?.description || "",
			level: positionContext.positionToUpdate?.level ? positionUtil.levels.indexOf(positionContext.positionToUpdate?.level) : 0,
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			name: Yup.string().trim().max(32),
			level: Yup.number(),
			description: Yup.string().trim().max(255),
		}),
		onSubmit: async (values, helpers) => {
			try {
				if (values.name) {
					if (!positionContext.positionToUpdate) {
						await positionContext.add({
							name: values.name,
							level: positionUtil.levels[values.level],
							description: values.description || null,
						});
					} else {
						await positionContext.updateById({
							id: positionContext.positionToUpdate.id,
							name: values.name,
							level: positionUtil.levels[values.level],
							description: values.description || null,
						});
						positionContext.resetPositionToUpdate();
					}
					formik.resetForm();
				}
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
							name="name"
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
						xs={1}
					>
						<TextField
							required
							fullWidth
							margin="dense"
							label="Level"
							name="level"
							type="number"
							InputProps={{ inputProps: { min: 0, max: 3, maxLength: 1 } }}
							error={!!(formik.touched.level && formik.errors.level)}
							helperText={formik.touched.level && formik.errors.level}
							value={formik.values.level}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
						/>
					</Grid>
					<Grid
						item
						xs={8}
					>
						<TextField
							fullWidth
							margin="dense"
							label="Description"
							name="description"
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
							type="submit"
							variant="contained"
							disabled={!formik.values.name}
							startIcon={
								<SvgIcon fontSize="small">
									{!positionContext.positionToUpdate ? <PlusIcon /> : <RxUpdate />}
								</SvgIcon>
							}
						>
							{!positionContext.positionToUpdate ? "Add" : "Update"}
						</Button>
					</Grid>
					{positionContext.positionToUpdate && (
						<Grid item>
							<Button
								variant="outlined"
								onClick={() => {
									positionContext.resetPositionToUpdate();
									formik.resetForm();
								}}
							>
								{"Cancel"}
							</Button>
						</Grid>
					)}
				</Grid>
			</Card>
		</form>
	);
}

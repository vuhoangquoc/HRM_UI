import { useCallback, useEffect, useState } from "react";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	TextField,
	Unstable_Grid2 as Grid,
	Select,
	MenuItem,
	FormControl,
} from "@mui/material";
import { useFormik } from "formik";
import { useEmployee } from "src/hooks/use-employee";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import * as Yup from "yup";
import { useInsuranceContext } from "src/contexts/InsuranceContext";

export const UpdateInsurance = ({ info }) => {
	const insuranceContext = useInsuranceContext();

	const formik = useFormik({
		initialValues: {
			number: info.number,
			issuedDate: dayjs(new Date(info.issuedDate)),
			issuedPlace: info.issuedPlace,
		},
		validationSchema: Yup.object({
			number: Yup.string().max(255).required("Number is required"),
			issuedDate: Yup.string().max(255).required("Issued Date is required"),
			issuedPlace: Yup.string().max(255).required("Issued Place is required"),
		}),
		onSubmit: async (values, helpers) => {
			try {
				await insuranceContext.updateInsurance(info.id, {
					number: values.number,
					issuedDate: values.issuedDate.format("DD/MM/YYYY"),
					issuedPlace: values.issuedPlace,
				});
			} catch (err) {
				helpers.setStatus({ success: false });
				helpers.setErrors({ submit: err.message });
				helpers.setSubmitting(false);
			}
		},
	});
	return (
		<form
			// autoComplete="off"
			noValidate
			onSubmit={formik.handleSubmit}
		>
			<Card>
				<CardHeader
					subheader="The information can be edited"
					title="Insurance"
				/>
				<CardContent sx={{ pt: 0 }}>
					<Box sx={{ m: -1.5 }}>
						<Grid
							container
							spacing={3}
						>
							<Grid
								xs={12}
								md={4}
							>
								<TextField
									required
									fullWidth
									// helperText="Please specify the first name"
									label="Number"
									name="number"
									error={!!(formik.touched.number && formik.errors.number)}
									helperText={formik.touched.number && formik.errors.number}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.number}
								/>
							</Grid>
							<Grid
								xs={12}
								md={4}
							>
								<TextField
									required
									fullWidth
									label="Issued Place"
									name="issuedPlace"
									error={!!(formik.touched.issuedPlace && formik.errors.issuedPlace)}
									helperText={formik.touched.issuedPlace && formik.errors.issuedPlace}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.issuedPlace}
								/>
							</Grid>
							<Grid
								xs={12}
								md={4}
							>
								<DatePicker
									label="Issued Date"
									sx={{ width: "100%" }}
									value={formik.values.issuedDate}
									onChange={(value) => {
										formik.setFieldValue("issuedDate", value);
									}}
								/>
							</Grid>
						</Grid>
					</Box>
				</CardContent>
				<Divider />
				<CardActions sx={{ justifyContent: "flex-end" }}>
					<Button
						variant="contained"
						type="submit"
					>
						Update Insurance
					</Button>
				</CardActions>
			</Card>
		</form>
	);
};

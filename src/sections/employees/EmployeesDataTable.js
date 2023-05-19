import { DataGrid, GridLogicOperator, GridToolbar } from "@mui/x-data-grid";
import { format } from "date-fns";
import {
	Button,
	Card,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	InputAdornment,
	OutlinedInput,
	SvgIcon,
	Tooltip,
} from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { useEmployeeContext } from "src/contexts/EmployeeContext";
import EmployeeSendMailFormDialog from "./EmployeeSendMail";
import { memo, useMemo, useState } from "react";
import { useDepartmentContext } from "src/contexts/DepartmentContext";
import { usePositionContext } from "src/contexts/PositionContext";

const columns = [
	{
		headerName: "Serial",
		filterable: false,
		width: 70,
		renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
	},
	{ field: "firstName", headerName: "First name", width: 100, filterable: true },
	{ field: "lastName", headerName: "Last name", width: 200, filterable: true },
	{
		field: "departmentId",
		headerName: "Department",
		width: 200,
		filterable: true,
		renderCell: (params) => <GenDepartmentFromId id={params.row.departmentId} />,
	},
	{
		field: "positionId",
		headerName: "Position",
		width: 200,
		filterable: true,
		renderCell: (params) => <GenPositionFromId id={params.row.positionId} />,
	},
	{
		field: "gender",
		headerName: "Gender",
		width: 100,
		renderCell: (params) => <GenGender genderCode={params.row.gender} />,
	},
	{ field: "address", headerName: "Address", width: 250 },
	{
		field: "dob",
		headerName: "Day of Birth",
		width: 130,
		valueGetter: (params) => format(new Date(params.row.dob), "dd/MM/yyyy") || "",
	},
	{
		field: "createdDate",
		headerName: "Date create",
		description: "This column has a value getter and is not sortable.",
		width: 130,
		valueGetter: (params) => format(new Date(params.row.createDate), "dd/MM/yyyy"),
	},
	{
		field: "updatedDate",
		headerName: "Date update",
		description: "This column has a value getter and is not sortable.",
		width: 130,
		valueGetter: (params) =>
			params.row.updateDate && format(new Date(params.row.updateDate), "dd/MM/yyyy"),
	},
	{
		field: "action",
		headerName: "Action",
		type: "actions",
		width: 150,
		renderCell: (params) => (
			<RowActions
				empId={params.row.id}
				empEmail={params.row.email}
			/>),
	},
];

let departmentColorMapping = ["hsl(50, 100%, 75%)"];


const GenGender = ({ genderCode }) => {
	let gender = [
		{ name: "Female", color: "#fccf74" },
		{ name: "Male", color: "#74cafc" },
		{ name: "Other", color: "#da82ff" },
	];
	return (
		<span
			style={{
				background: gender[genderCode].color,
				padding: "3px 10px",
				borderRadius: "10px",
			}}
		>
			{gender[genderCode].name}
		</span>
	);
};

const GenDepartmentFromId = ({ id }) => {
	const { departmentList } = useDepartmentContext();
	const department = departmentList.find((d) => d.id === id);

	useMemo(() => {
		if (departmentList.length === departmentColorMapping.length) {
			const randomColor = `hsl(${Math.floor(Math.random() * 361)}, 50%, 75%)`;
			departmentColorMapping[departmentColorMapping.length] = departmentColorMapping.includes(
				randomColor
			)
				? randomColor
				: `hsl(${Math.floor(Math.random() * 361)}, 50%, 80%)`;
		} else {
			for (let i = 1; i < departmentList.length; i++) {
				departmentColorMapping[i] = `hsl(${Math.floor(Math.random() * 361)}, 50%, 80%)`;
			}
		}
	}, [departmentList]);

	const colorMapped = departmentColorMapping[departmentList.indexOf(department)];
	return (
		<span
			style={{
				background: colorMapped,
				padding: "3px 10px",
				borderRadius: "10px",
			}}
		>
			{department?.name || ""}
		</span>
	);
};

const GenPositionFromId = ({ id }) => {
	const { positionList } = usePositionContext();
	const position = positionList.find((d) => d.id === id);

	// useMemo(() => {
	// 	if (departmentList.length === departmentColorMapping.length) {
	// 		const randomColor = `hsl(${Math.floor(Math.random() * 361)}, 50%, 75%)`;
	// 		departmentColorMapping[departmentColorMapping.length] = departmentColorMapping.includes(
	// 			randomColor
	// 		)
	// 			? randomColor
	// 			: `hsl(${Math.floor(Math.random() * 361)}, 50%, 80%)`;
	// 	} else {
	// 		for (let i = 1; i < departmentList.length; i++) {
	// 			departmentColorMapping[i] = `hsl(${Math.floor(Math.random() * 361)}, 50%, 80%)`;
	// 		}
	// 	}
	// }, [departmentList]);

	// const colorMapped = departmentColorMapping[departmentList.indexOf(position)];
	return (
		<span
			style={{
				background: "lightgray",
				padding: "3px 10px",
				borderRadius: "10px",
			}}
		>
			{position?.name || ""}
		</span>
	);
};
const ConfirmDeleteDialog = memo(({ isOpen, handleClose, handleDelete }) => (
	<Dialog
		open={isOpen}
		onClose={handleClose}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
	>
		<DialogTitle id="alert-dialog-title">{"Are you sure delete this employee?"}</DialogTitle>
		<DialogContent>
			<DialogContentText id="alert-dialog-description">
				You should consider carefully before deleting your employee
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button onClick={handleClose}>Cancel</Button>
			<Button onClick={handleDelete}>Delete</Button>
		</DialogActions>
	</Dialog>
));
const RowActions = ({ empId, empEmail }) => {
	const router = useRouter();
	const [isOpenConfirmDeleteDialog, setIsOpenConfirmDeleteDialog] = useState(false);
	const [isOpenSendMailDialog, setIsOpenSendMailDialog] = useState(false);
	const { deleteEmployee } = useEmployeeContext();

	const handleUpdate = () => {
		router.push(`employees/${empId}`);
	};
	const handleDelete = async () => {
		await deleteEmployee(empId);
		setIsOpenConfirmDeleteDialog(false);
	};
	const handleSendMail = () => setIsOpenSendMailDialog(true);

	const handleCloseConfirmDeleteDialog = () => setIsOpenConfirmDeleteDialog(false);


	return (
		<>
			<Tooltip title="Update">
				<IconButton onClick={handleUpdate}>
					<AiOutlineEdit />
				</IconButton>
			</Tooltip>
			<IconButton onClick={() => setIsOpenConfirmDeleteDialog(true)}>
				<AiOutlineDelete />
			</IconButton>
			<Tooltip title="Send mail">
				<IconButton onClick={handleSendMail}>
					<FiMail />
				</IconButton>
			</Tooltip>
			<EmployeeSendMailFormDialog
				isOpen={isOpenSendMailDialog}
				onClose={() => setIsOpenSendMailDialog(false)}
				onCancel={() => setIsOpenSendMailDialog(false)}
				email={empEmail}
			/>
			<ConfirmDeleteDialog
				isOpen={isOpenConfirmDeleteDialog}
				handleClose={handleCloseConfirmDeleteDialog}
				handleDelete={handleDelete}
			/>
		</>
	);
};

export default function EmployeesDataTable({ data }) {
	const [searchValue, setSearchValue] = useState("");

	const EmployeeSearch = () => {
		return (
			<Card sx={{ p: 2 }}>
				<OutlinedInput
					autoFocus
					type="text"
					fullWidth
					placeholder="Search employee"
					startAdornment={
						<InputAdornment position="start">
							<SvgIcon
								color="action"
								fontSize="small"
							>
								<MagnifyingGlassIcon />
							</SvgIcon>
						</InputAdornment>
					}
					sx={{ maxWidth: 500 }}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</Card>
		);
	};

	return (
		<>
			<EmployeeSearch />
			<div style={{ height: 350, width: "100%" }}>
				<DataGrid
					// checkboxSelection
					rows={data || []}
					columns={columns}
					disableRowSelectionOnClick
					// pageSize={5}
					// rowsPerPageOptions={[5, 10, 20]}
					// onRowSelectionModelChange={ids => {
					// 	const selectedRowsData = ids.map((id) => data.find((row) => row.id === id));
					// 	console.log(selectedRowsData)
					// }}
					// slots={{ toolbar: GridToolbar }}
					filterModel={{
						items: [],
						quickFilterValues: [searchValue],
						logicOperator: GridLogicOperator.Or,
					}}
					disableColumnFilter
				/>
				{/* <Button variant='outlined'>Save change</Button> */}
			</div>
		</>
	);
}

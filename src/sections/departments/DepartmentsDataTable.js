import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDepartmentContext } from 'src/contexts/DepartmentContext';


const columns = [
	{
		headerName: 'Serial', filterable: false, width: 70,
		renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
	},
	{ field: 'name', headerName: 'Name', width: 300, filterable: true },
	{ field: 'description', headerName: 'Description', width: 500, filterable: true },
	{
		field: 'action',
		headerName: 'Action',
		type: 'actions',
		renderCell: (params) => (
			<RowActions department={{
				id: params.row.id,
				name: params.row.name,
				description: params.row.description
			}}
			/>
		),
	},
];

const RowActions = ({ department }) => {
	const [isOpenDialog, setIsOpenDialog] = useState(false)
	const departmentContext = useDepartmentContext();
	const handleUpdate = () => {
		departmentContext.setDepartmentToUpdate(department)
	}
	const handleDelete = async () => {
		await departmentContext.deleteById(department.id);
		setIsOpenDialog(true)
	}
	const handleCloseDialog = () => setIsOpenDialog(false)

	return (
		<>
			<Tooltip title="Edit">
				<IconButton onClick={handleUpdate}>
					<AiOutlineEdit />
				</IconButton>
			</Tooltip>
			{/* <IconButton onClick={() => setIsOpenDialog(true)}>
				<AiOutlineDelete />
			</IconButton> */}
			<Dialog
				open={isOpenDialog}
				onClose={handleCloseDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Are you sure delete?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						You should consider carefully before deleting
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Cancel</Button>
					<Button onClick={handleDelete}
						autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}


export default function DepartmentsDataTable({ data }) {
	return (
		<>
			<div style={{ height: 300, width: '100%' }}>
				<DataGrid
					// checkboxSelection
					rows={data || []}
					columns={columns}
					disableRowSelectionOnClick
					disableColumnFilter
				// autoHeight={true}
				/>
			</div>
		</>
	);
}

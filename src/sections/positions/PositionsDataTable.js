import { DataGrid } from "@mui/x-data-grid";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Tooltip,
} from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/router";
import { useState } from "react";
import { usePositionContext } from "src/contexts/PositionContext";
import positionUtil from "src/utils/positionUtil";

const columns = [
	{
		headerName: "Serial",
		filterable: false,
		width: 50,
		renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
	},
	{ field: "name", headerName: "Name", width: 280, filterable: true },
	{
		field: "level", headerName: "Level", width: 80, filterable: true,
		renderCell: (params) => positionUtil.levels.indexOf(params.row.level)

	},
	{ field: "description", headerName: "Description", width: 450, filterable: true },
	{
		field: "action",
		headerName: "Action",
		type: "actions",
		renderCell: (params) => (
			<RowActions
				position={{
					id: params.row.id,
					name: params.row.name,
					level: params.row.level,
					description: params.row.description,
				}}
			/>
		),
	},
];

const RowActions = ({ position }) => {
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const positionContext = usePositionContext();
	const handleUpdate = () => {
		positionContext.setPositionToUpdate(position);
	};
	const handleDelete = async () => {
		await positionContext.deleteById(position.id);
		setIsOpenDialog(true);
	};
	const handleCloseDialog = () => setIsOpenDialog(false);

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
				<DialogTitle id="alert-dialog-title">{"Are you sure delete?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						You should consider carefully before deleting
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Cancel</Button>
					<Button onClick={handleDelete} autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default function PositionsDataTable({ data }) {
	return (
		<>
			<div style={{ height: 300, width: "100%" }}>
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

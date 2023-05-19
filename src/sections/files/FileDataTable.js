import * as React from 'react';
import { DataGrid, GridLogicOperator } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, OutlinedInput, SvgIcon, Tooltip } from '@mui/material';
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai"
import { HiOutlineDownload } from "react-icons/hi"
import { useRouter } from 'next/router';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { useFileContext } from 'src/contexts/FileContext';
import endpointConst from 'src/constants/endpointConst';

const columns = [
	{
		headerName: 'Serial', filterable: false, width: 70,
		renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
	},
	{ field: 'name', headerName: 'File name', width: '500', filterable: true },
	{
		field: 'size', headerName: 'Size', width: '130', filterable: true,
		valueGetter: (params) => parseFloat(params.row.size * Math.pow(10, -6)).toFixed(2) + " MB"

	},
	{
		field: 'createdAt',
		headerName: 'Create date',
		description: 'This column has a value getter and is sortable.',
		width: 130,
		valueGetter: (params) => params.row.createdAt && format(new Date(params.row.createdAt), 'dd/MM/yyyy')
	},
	{
		field: 'actions',
		headerName: 'Actions',
		width: 130,
		type: 'actions',
		renderCell: (params) => (
			<Actions
				fileId={params.row.id}
				downloadUrl={params.row.downloadUrl}
				fileName={params.row.name}
				fileType={params.row.type}
			/>
		)
	},

];

const Actions = ({ fileId, downloadUrl, fileName, fileType }) => {
	const [isOpenDialog, setIsOpenDialog] = React.useState(false)
	const fileContext = useFileContext();
	const imageFileRegex = new RegExp("^image/(png|jpg|jpeg)$")
	const pdfFileRegex = new RegExp("^application/pdf$")

	const handleDelete = async () => {
		await fileContext.deleteFile(fileId)
		setIsOpenDialog(false)
	}
	const handleDownload = async () => {
		await fileContext.download(downloadUrl, fileName)
	}
	const handleShowImage = async () => {
		const url = "http://localhost:8080/api/v1/files/images/" + fileId
		window.open(url, '_blank', 'noopener,noreferrer');
	}
	const handleShowPdf = async () => {
		const url = "http://localhost:8080/api/v1/files/pdf/" + fileId
		window.open(url, '_blank', 'noopener,noreferrer');
	}
	const handleCloseDialog = () => setIsOpenDialog(false)

	return (
		<>
			<IconButton onClick={() => setIsOpenDialog(true)}>
				<AiOutlineDelete />
			</IconButton>
			<IconButton onClick={handleDownload} >
				<HiOutlineDownload />
			</IconButton>
			{imageFileRegex.test(fileType) && (
				<IconButton onClick={handleShowImage} >
					<AiOutlineEye />
				</IconButton>
			)}
			{pdfFileRegex.test(fileType) && (
				<IconButton onClick={handleShowPdf} >
					<AiOutlineEye />
				</IconButton>
			)}
			<Dialog
				open={isOpenDialog}
				onClose={handleCloseDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Are you sure delete this file?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						You should consider carefully before deleting your file
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


export default function FileDataTable({ data }) {
	const [searchValue, setSearchValue] = React.useState("")

	const FileSearch = () => {
		return (
			<Card sx={{ p: 2 }}>
				<OutlinedInput
					autoFocus
					type='text'
					fullWidth
					placeholder="Search employee"
					startAdornment={(
						<InputAdornment position="start">
							<SvgIcon
								color="action"
								fontSize="small"
							>
								<MagnifyingGlassIcon />
							</SvgIcon>
						</InputAdornment>
					)}
					sx={{ maxWidth: 500 }}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</Card>
		)
	}

	return (
		<>
			<FileSearch />
			<div style={{ height: 350, width: '100%' }}>
				<DataGrid
					// checkboxSelection
					rows={data || []}
					columns={columns}
					disableRowSelectionOnClick
					filterModel={{
						items: [],
						quickFilterValues: [searchValue],
						logicOperator: GridLogicOperator.Or,
					}}
					disableColumnFilter
				/>
			</div>
		</>
	);
}

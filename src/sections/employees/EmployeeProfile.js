import {
	Avatar as AvatarMUI,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useApp } from 'src/hooks/use-app';
import { useEmployee } from 'src/hooks/use-employee';

const user = {
	avatar: '/assets/avatars/avatar-anika-visser.png',
};

export const EmployeeProfile = ({ employeeId }) => {
	const { employeeList } = useEmployee();
	const [employee, setEmployee] = useState(employeeList.find(emp => emp.id === employeeId) || [])
	const { refreshApp } = useApp();
	const [avatarPreview, setAvatarPreview] = useState(null)


	useEffect(() => {
		const newData = employeeList.find(emp => emp.id === employeeId)
		setEmployee(newData)
	}, [employeeId, employeeList, refreshApp])

	function onClose() {
		setAvatarPreview(null);
	}

	function onCrop(preview) {
		setAvatarPreview(preview);
	}

	function onBeforeFileLoad(elem) {

	}

	return (
		<Card>
			<CardContent>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					<AvatarMUI
						src={avatarPreview}
						sx={{
							height: 80,
							mb: 2,
							width: 80
						}}
					/>
					<Typography
						gutterBottom
						variant="h5"
						textAlign={'center'}
					>
						{employee?.firstName} {employee?.lastName}
					</Typography>
					<Typography
						color="text.secondary"
						variant="body2"
						textAlign={'center'}
					>
						{new Date(employee?.dob).toLocaleDateString('en-GB')}
					</Typography>
					<Typography>
						{/* <Avatar
							width={"100%"}
							// height={295}
							onCrop={onCrop}
							onClose={onClose}
							onBeforeFileLoad={onBeforeFileLoad}
							src={null}
						/> */}
					</Typography>

				</Box>
			</CardContent>
			<Divider />
			<CardActions>
				<Button
					fullWidth
					variant="text"
				>
					Upload picture
				</Button>
			</CardActions>
		</Card>
	)
}



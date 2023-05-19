import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography
} from '@mui/material';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { useAuth } from 'src/hooks/use-auth';

const user = {
	avatar: '/assets/avatars/avatar-anika-visser.png',
	city: 'Los Angeles',
	country: 'USA',
	jobTitle: 'Senior Developer',
	name: 'Anika Visser',
	timezone: 'GTM-7'
};
export const AccountProfile = () => {
	const auth = useAuth();
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
					<Avatar
						src={user.avatar}
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
						{auth.currentUser.email}
					</Typography>
					{/* <Typography
						color="text.secondary"
						variant="body2"
					>
						{auth.currentUser.id}
					</Typography> */}
					<Typography
						color="text.secondary"
						variant="body2"
						textAlign={'center'}

					>
						Join on {new Date(auth.currentUser.create_date).toLocaleDateString('en-GB')}
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



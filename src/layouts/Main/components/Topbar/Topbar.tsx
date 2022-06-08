import { useTheme } from '@mui/material/styles';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
// components
import { DarkModeToggler } from '@components/atoms';
import CustomAvatar from '@components/molecules/CustomAvatar';
import Logo from '@components/atoms/Logo';
import {
	AccountCircleOutlined,
	AccountCircleTwoTone,
	ArrowBack,
} from '@mui/icons-material';
import Modal from '@components/atoms/Modal';
import { useState } from 'react';
import { Form } from './components';

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	colorInvert?: boolean;
}

const Topbar = ({
									colorInvert = false,
								}: Props): JSX.Element => {
	const [openAuthModal, setAuthModalOpen] = useState<boolean>(false);
	const [authByEmail, setAuthByEmail] = useState<boolean>(false);
	const theme = useTheme();
	const { data: session } = useSession();
	const linkColor = colorInvert ? 'common.white' : 'text.primary';

	const handleAuthModal = () => {
		setAuthModalOpen((prevState) => !prevState);
		authByEmail && setAuthByEmail(false);
	};
	const handleAuthByEmail = () => setAuthByEmail((prevState) => !prevState);

	const renderAuthButtons = () => (
		<>
			<Box marginLeft={3}>
				{!!session ? (
					<CustomAvatar />
				) : (
					<Button
						variant='outlined'
						color='primary'
						size='small'
						onClick={handleAuthModal}
						startIcon={
							<AccountCircleOutlined
								sx={{
									color: colorInvert ? 'common.white' : 'primary.dark',
									'&:hover': {
										color: colorInvert ? 'common.white' : 'primary.dark',
									},
								}}
							/>
						}
						sx={{
							color: linkColor,
							'&:hover': {
								color: colorInvert ? 'common.white' : 'primary.dark',
							},
						}}
					>
						Account
					</Button>
				)}
			</Box>
		</>
	);

	const renderModalHeader = (): JSX.Element => (
		<Stack
			direction='row'
			justifyContent='flex-start'
			alignItems='center'
			spacing={2}
		>
			{authByEmail ? (
				<ArrowBack onClick={handleAuthByEmail} />
			) : (
				<AccountCircleTwoTone />
			)}
			<Typography variant='h6'>Login into your account</Typography>
		</Stack>
	);

	const renderAuthModal = (): JSX.Element => (
		<Modal
			maxWidth='xs'
			isModalOpen={openAuthModal}
			renderHeader={renderModalHeader()}
			renderDialogText={
				authByEmail ? '' : 'Choose your preferred method to authenticate'
			}
			renderContent={
				<Form
					handleAuthModal={handleAuthModal}
					authByEmail={authByEmail}
					handleAuthByEmail={handleAuthByEmail}
				/>
			}
			onClose={handleAuthModal}
			onDismiss={handleAuthModal}
		/>
	);

	return (
		<Box
			display={'flex'}
			justifyContent={'space-between'}
			alignItems={'center'}
			width={1}
		>
			<Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
				<Logo />
			</Box>
			<Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
				<Logo />
				{/*<Box marginLeft={3}>*/}
				{/*	<Link href='/resources' passHref>*/}
				{/*		<Button*/}
				{/*			sx={{*/}
				{/*				color: linkColor,*/}
				{/*				'&:hover': {*/}
				{/*					color: colorInvert ? 'common.white' : 'primary.dark',*/}
				{/*				},*/}
				{/*			}}*/}
				{/*			variant='text'*/}
				{/*		>*/}
				{/*			About*/}
				{/*		</Button>*/}
				{/*	</Link>*/}
				{/*</Box>*/}
			</Box>

			<Box sx={{ display: 'flex' }} alignItems={'center'}>
				<Box marginLeft={3}>
					<DarkModeToggler
						moonColor={
							colorInvert
								? theme.palette.common.white
								: theme.palette.secondary.main
						}
						sunColor={
							colorInvert
								? theme.palette.common.white
								: theme.palette.secondary.main
						}
					/>
				</Box>
				{renderAuthButtons()}
			</Box>
			{renderAuthModal()}
		</Box>
	);
};

export default Topbar;

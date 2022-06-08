import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Container from 'components/Container';
import authService from '@utils/auth';
import isArrayNotNull from '@utils/checkArrayEmpty';
import { UserContext } from '@context/UserContext';
import { useCallback, useContext } from 'react';
import { Engine } from 'tsparticles-engine';
import { loadLinksPreset } from 'tsparticles-preset-links';

const Hero = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});
	const { devices } = useContext(UserContext);
	const isAuthed = authService.isAuthenticated();

	const initParticles = useCallback(async (engine: Engine): Promise<void> => {
		await loadLinksPreset(engine);
	}, []);

	const LeftSide = () => (
		<Box>
			<Box marginBottom={2}>
				<Typography variant='h3' color='text.primary' sx={{ fontWeight: 700 }}>
					You Travel, We Connect{' '}
				</Typography>
				<Typography
					color={'primary'}
					component={'span'}
					variant='h3'
					sx={{ fontWeight: 700 }}
				>
					anywhere.
				</Typography>
			</Box>
			<Box marginBottom={3}>
				<Typography
					variant='h5'
					component='p'
					color='text.secondary'
					sx={{ fontWeight: 400 }}
				>
					Fly anywhere with ease, share your luggage space and earn.
				</Typography>
			</Box>
			<Link
				passHref
				href={
					isAuthed
						? `${isArrayNotNull(devices) ? '/dashboard' : '/my-device'}`
						: '/store'
				}
			>
				<Button variant='contained' color='primary' size='large'>
					{isAuthed ? 'Go to dashboard' : 'Get connected'}
				</Button>
			</Link>
		</Box>
	);

	const RightSide = (): JSX.Element => {
		return (
			<Box
				sx={{
					height: { xs: 'auto', md: 1 },
					'& img': {
						objectFit: 'cover',
					},
					'& .lazy-load-image-loaded': {
						height: 1,
						width: 1,
					},
				}}
			>
				<Box
					component={'img'}
					// effect="blur"
					src='/img/hydroponics.webp'
					srcSet='/img/hydroponics.webp 2x'
					alt='home-image'
					height={{ xs: 'auto', md: 1 }}
					maxHeight={{ xs: 300, md: 1 }}
					width={1}
					maxWidth={1}
				/>
			</Box>
		);
	};

	return (
		<Box
			sx={{
				// backgroundImage: `linear-gradient(to bottom, ${alpha(
				// 	theme.palette.background.paper,
				// 	0,
				// )}, ${alpha(theme.palette.alternate.main, 1)} 100%)`,
				// backgroundRepeat: 'repeat-x',
				position: 'relative',
			}}
		>
			<Container paddingX={0} paddingY={0} maxWidth={{ sm: 1, md: 1236 }}>
				<Box
					display={'flex'}
					// flexDirection={{ xs: 'column', md: 'row' }}
					position={'relative'}
					minHeight='100vh'
				>
					<Box
						width={1}
						order={{ xs: 2, md: 1 }}
						display={'flex'}
						alignItems={'center'}
					>
						<Container>
							<LeftSide />
						</Container>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default Hero;

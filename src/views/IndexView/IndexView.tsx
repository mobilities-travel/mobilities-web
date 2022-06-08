import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import { useCallback, useContext, useEffect } from 'react';
import { ComponentContext } from '@context/ComponentContext';
import { loadLinksPreset } from 'tsparticles-preset-links';
import type { Engine } from 'tsparticles-engine';
import { Hero } from './components';
import Particles from 'react-tsparticles';
import particlesOptions from './particles.json';

interface Props {
	csrfToken: string;
}

const IndexView = ({ csrfToken }: Props): JSX.Element => {
	const theme = useTheme();
	const { setCsrfToken } = useContext(ComponentContext);

	useEffect(() => {
		if (csrfToken !== '' || undefined) {
			setCsrfToken(csrfToken);
		}
	}, []);

	const initParticles = useCallback(async (engine: Engine): Promise<void> => {
		await loadLinksPreset(engine);
	}, []);

	return (
		<Box sx={{ overflowX: 'hidden' }}>
			<Main>
				<Box
					sx={{
						position: 'relative',
					}}
				>
					<Box position={'relative'} zIndex={3}>
						<Particles id='tsparticles' options={particlesOptions}
											 init={initParticles} />
						<Hero />
					</Box>
				</Box>
			</Main>
		</Box>
	);
};

export default IndexView;

import { CSSProperties } from 'react';
import { Theme, responsiveFontSizes, PaletteMode } from '@mui/material';
import { createTheme, ComponentsOverrides } from '@mui/material/styles';
import shadows from './shadows';
import { light, dark } from './palette';
import type {} from '@mui/x-data-grid/themeAugmentation';

const getTheme = (mode: PaletteMode, themeToggler: () => void): Theme =>
	responsiveFontSizes(
		createTheme({
			palette: mode === 'light' ? light : dark,
			shadows: shadows(mode),
			typography: {
				// fontFamily: 'Google Sans, Roboto, Helvetica Neue, sans-serif',
				fontFamily: 'HarmonyOS Sans, Google Sans, Helvetica Neue, sans-serif',
				// fontSize: 12,
				button: {
					textTransform: 'none',
					fontWeight: 'medium' as CSSProperties['fontWeight'],
				},
			},
			zIndex: {
				appBar: 1200,
				drawer: 1300,
			},
			shape: {
				borderRadius: 6,
			},
			components: {
				MuiButton: {
					styleOverrides: {
						root: {
							fontWeight: 400,
							borderRadius: 5,
							paddingTop: 6,
							paddingBottom: 6,
						},
						containedSecondary: mode === 'light' ? { color: 'white' } : {},
					} as ComponentsOverrides['MuiButton'],
				},
				MuiDialog: {
					styleOverrides: {
						paperFullScreen: {
							borderRadius: '0 !important',
						},
					},
				},
				MuiDataGrid: {
					styleOverrides: {
						root: {
							// backgroundColor: 'red',
							border: 0,
						},
					},
				},
				MuiInputBase: {
					styleOverrides: {
						root: {
							borderRadius: 5,
						},
					} as ComponentsOverrides['MuiInputBase'],
				},
				MuiOutlinedInput: {
					styleOverrides: {
						root: {
							borderRadius: 5,
						},
						input: {
							borderRadius: 5,
						},
					} as ComponentsOverrides['MuiOutlinedInput'],
				},
				MuiCard: {
					styleOverrides: {
						root: {
							borderRadius: 8,
						},
					} as ComponentsOverrides['MuiCard'],
				},
			},
			themeToggler,
		})
	);

export default getTheme;

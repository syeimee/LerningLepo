import { createTheme } from '@mui/material/styles'
import { COLORS, BRAND_COLOR } from './colors'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: BRAND_COLOR,
    secondary: COLORS.secondary,
    success: COLORS.success,
    warning: COLORS.warning,
    error: COLORS.error,
    info: COLORS.info,
    background: COLORS.background,
    text: COLORS.text,
    divider: COLORS.divider,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Hiragino Sans"',
      '"Hiragino Kaku Gothic ProN"',
      '"Noto Sans JP"',
      'Meiryo',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: COLORS.text.primary,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: COLORS.text.primary,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: COLORS.text.primary,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: COLORS.text.primary,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: COLORS.text.primary,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: COLORS.text.primary,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: BRAND_COLOR.main,
          '&:hover': {
            backgroundColor: BRAND_COLOR.dark,
          },
        },
        outlined: {
          borderColor: BRAND_COLOR.main,
          color: BRAND_COLOR.main,
          '&:hover': {
            borderColor: BRAND_COLOR.dark,
            backgroundColor: 'rgba(0, 131, 155, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
          border: `1px solid ${COLORS.border}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: BRAND_COLOR.main,
          color: BRAND_COLOR.contrastText,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: COLORS.text.primary,
          backgroundColor: '#F8F9FA',
        },
      },
    },
  },
})

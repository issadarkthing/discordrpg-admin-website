import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { AlertProvider } from "../components/AlertProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const themeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#15465b',
    },
    secondary: {
      main: '#3AAFB9',
      dark: "#27757c"
    },
    background: {
      paper: '#091119',
      default: '#082235',
    },
    text: {
      primary: "#fff",
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.main,
          color: "ghostWhite",
          "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
          }
        })
      }
    }
  }
});

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themeOptions}>
      <AlertProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </AlertProvider>
    </ThemeProvider>
  )
}

export default MyApp

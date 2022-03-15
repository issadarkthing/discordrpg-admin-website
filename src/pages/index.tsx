import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard from "../components/Dashboard";
import { AlertProvider } from "../components/AlertProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const themeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#15465b',
    },
    secondary: {
      main: '#f50057',
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
});

export const queryClient = new QueryClient();

function App() { 
  
  return (
    <div>
      <ThemeProvider theme={themeOptions}>
        <AlertProvider>
          <QueryClientProvider client={queryClient}>
            <Dashboard />
            {/* <Login /> */}
          </QueryClientProvider>
        </AlertProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

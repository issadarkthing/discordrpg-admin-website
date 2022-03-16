import { 
  CssBaseline, 
  Grid, 
  Paper,
  TextField,
  Button,
} from "@mui/material";



export default function() {

  return (
    <Grid 
      container
      spacing={0}
      direction="column"
      justifyContent="center" 
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <CssBaseline />
      <Grid item xs={3}>
        <Paper sx={{ width: 400, height: "50vh" }}>
          <Grid 
            container
            sx={{ height: "100%" }}
            spacing={5} 
            display="flex" 
            direction="column"
            justifyContent="center" 
            alignItems="center"
          >
            <Grid item sx={{ width: "80%" }}>
              <TextField sx={{ width: "100%" }} label="username" />
            </Grid>
            <Grid item sx={{ width: "80%" }}>
              <TextField type="password" sx={{ width: "100%" }} label="password" />
            </Grid>
            <Grid item sx={{ width: "80%" }}>
              <Button sx={{ width: "100%" }}>
                login
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

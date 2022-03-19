import { CssBaseline, Grid, Typography } from "@mui/material";



export default function() {

  return (
    <div>
      <CssBaseline />
      <Grid 
        container 
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Grid item>
          <Typography variant="h4">
            404 Page not found
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

import { CssBaseline, Grid, Typography, Link } from "@mui/material";



export default function Page404() {

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
            404 Page not found ⚠️
          </Typography>
          <Typography variant="body1">
            Go back to <Link href="/" color="secondary">main</Link> page
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

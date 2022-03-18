import { CssBaseline, Grid, Typography, Link } from "@mui/material";


export default function logout() {

  return (
    <div>
      <CssBaseline />
      <Grid 
        container 
        justifyContent="center" 
        alignItems="center"
        height="100vh"
      >
        <Grid item>
          <Typography variant="h3">
            Logged out successfully 🚶🚪
          </Typography>
          <br />
          <Typography variant="subtitle1" align="center">
            Go to <Link href="/login" color="secondary">login</Link> page. To re-login
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

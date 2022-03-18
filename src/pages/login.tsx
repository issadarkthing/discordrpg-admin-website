import { 
  CssBaseline, 
  Grid, 
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useUpdateAlert } from "../components/AlertProvider";
import AllAlerts from "../components/AllAlerts";
import { ironOptions } from "../sessionConfig";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {

    if (req.session.user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        }
      }
    }

    return { props: {} }
  },
  ironOptions
)

const NameField = React.forwardRef((props, ref) => {

  return (
    <Grid item sx={{ width: "80%" }}>
      <TextField 
        sx={{ width: "100%" }} 
        label="username" 
        inputRef={ref}
      />
    </Grid>
  )
})

const PasswordField = React.forwardRef((props, ref) => {

  return (
    <Grid item sx={{ width: "80%" }}>
      <TextField 
        sx={{ width: "100%" }} 
        type="password" 
        label="password" 
        inputRef={ref}
      />
    </Grid>
  )
})

export default function() {
  const username = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const router = useRouter();
  const updateAlertState = useUpdateAlert();


  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = { 
      username: username.current?.value, 
      password: password.current?.value,
    }

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (res.ok) {
      router.push("/");
    } else {
      const message = await res.text();
      updateAlertState.setError(message);
    }
  }

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
        <form onSubmit={onLogin}>
          <Paper sx={{ width: 400, height: 400 }}>
            <Grid 
              container
              sx={{ height: "100%" }}
              spacing={5} 
              display="flex" 
              direction="column"
              justifyContent="center" 
              alignItems="center"
            >
              <Typography variant="h5">
                DiscordRPG Admin
              </Typography>
              <NameField ref={username} />
              <PasswordField ref={password} />
              <Grid item sx={{ width: "80%" }}>
                <Button 
                  type="submit" 
                  sx={{ width: "100%" }} 
                >
                  login
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Grid>
      <AllAlerts />
    </Grid>
  )
}

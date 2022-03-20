import { 
  CssBaseline, 
  Grid, 
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useUpdateAlert } from "../components/AlertProvider";
import AllAlerts from "../components/AllAlerts";
import { ironOptions } from "../sessionConfig";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {

    if (!req.session.user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        }
      }
    }

    if (req.session.user.username !== "raziman") {
      return {
        redirect: {
          destination: "/403",
          permanent: false,
        }
      }
    }

    return { props: {} }
  },
  ironOptions
)

const Field = React.forwardRef(function Field(props: { label: string }, ref) {

  return (
    <Grid item sx={{ width: "80%" }}>
      <TextField 
        sx={{ width: "100%" }} 
        label={props.label}
        inputRef={ref}
      />
    </Grid>
  )
})

const PasswordField = React.forwardRef(function PasswordField(props, ref) {

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

export default function Create() {
  const username = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const apiUrl = useRef<HTMLInputElement>();
  const apiToken = useRef<HTMLInputElement>();
  const router = useRouter();
  const updateAlertState = useUpdateAlert();


  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = { 
      username: username.current?.value, 
      password: password.current?.value,
      apiUrl: apiUrl.current?.value,
      apiToken: apiToken.current?.value,
    }

    const res = await fetch("/api/create", {
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
          <Paper sx={{ width: 400, height: 500 }}>
            <Grid 
              container
              sx={{ height: "100%" }}
              spacing={3} 
              display="flex" 
              direction="column"
              justifyContent="center" 
              alignItems="center"
            >
              <Typography variant="h5">
                Create User
              </Typography>
              <Field label="username" ref={username} />
              <PasswordField ref={password} />
              <Field label="API url" ref={apiUrl} />
              <Field label="API token" ref={apiToken} />
              <Grid item sx={{ width: "80%" }}>
                <Button 
                  type="submit" 
                  sx={{ width: "100%" }} 
                >
                  create
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Grid>
      <Typography sx={{ marginTop: 4 }}>
        Go to <Link href="/" color="secondary">main</Link> page
      </Typography>
      <AllAlerts />
    </Grid>
  )
}

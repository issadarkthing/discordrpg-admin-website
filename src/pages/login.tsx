import { 
  CssBaseline, 
  Grid, 
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useRef } from "react";

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


  const onLogin = async () => {

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

    if (res.status === 200) {
      router.push("/");
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
            <NameField ref={username} />
            <PasswordField ref={password} />
            <Grid item sx={{ width: "80%" }}>
              <Button sx={{ width: "100%" }} onClick={onLogin}>
                login
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

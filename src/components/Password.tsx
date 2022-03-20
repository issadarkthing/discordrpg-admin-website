import { 
  Button,
  CssBaseline, 
  Grid, 
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import * as React from "react";
import { useRef } from "react";
import { useUpdateAlert } from "./AlertProvider";
import Router from "next/router";
import AllAlerts from "./AllAlerts";


const PasswordField = React.forwardRef(function PasswordField(props: { label: string }, ref) {
  return (
    <Grid item sx={{ width: "80%" }}>
      <TextField 
        sx={{ width: "100%" }} 
        type="password" 
        label={props.label}
        inputRef={ref}
      />
    </Grid>
  )
})


export default function Password() {
  const oldPassword = useRef<HTMLInputElement>();
  const newPassword = useRef<HTMLInputElement>();
  const newPasswordRepeat = useRef<HTMLInputElement>();
  const alertUpdate = useUpdateAlert();

  const onClicked = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.current!.value !== newPasswordRepeat.current!.value) {
      alertUpdate.setError("new password and new password confirmation mismatched");
      return;
    }

    const body = {
      oldPassword: oldPassword.current!.value,
      newPassword: newPassword.current!.value,
    }

    const res = await fetch("/api/password", {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!res.ok) {
      const message = await res.text();
      alertUpdate.setError(message);
    } else {
      Router.push("/");
    }

  }

  return (
    <div>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <CssBaseline />
        <Grid item>
          <form onSubmit={onClicked}>
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
                  🔒 Password reset
                </Typography>
                <PasswordField label="old password" ref={oldPassword} />
                <PasswordField label="new password" ref={newPassword} />
                <PasswordField label="new password confirmation" ref={newPasswordRepeat} />
                <Grid item sx={{ width: "80%" }}>
                  <Button 
                    type="submit" 
                    sx={{ width: "100%" }} 
                  >
                    Change Password
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    Get back to <Link href="/" color="secondary">main</Link> page
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Grid>
      </Grid>
      <AllAlerts />
    </div>
  )
}

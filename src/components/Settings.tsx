import * as React from "react";
import { Button, Grid, Paper, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import { useUpdateAlert } from "./AlertProvider";
import { useQuery } from "react-query";
import { User } from "../sessionConfig";

const ApiUrlField = React.forwardRef((props: { apiUrl: string }, ref) => {

  return (
    <Grid item>
      <TextField 
        sx={{ width: "50%" }} 
        required
        label="API url" 
        helperText="URL endpoint of your bot's server"
        defaultValue={props.apiUrl}
        inputRef={ref}
      />
    </Grid>
  )
})

const ApiTokenField = React.forwardRef((props: { apiToken: string }, ref) => {

  return (
    <Grid item>
      <TextField 
        sx={{ width: "50%" }} 
        required
        label="API token" 
        helperText="Token to be authenticated by your bot's server"
        defaultValue={props.apiToken}
        inputRef={ref}
      />
    </Grid>
  )
});



export default function() {
  const apiUrlField = useRef<HTMLInputElement>();
  const apiTokenField = useRef<HTMLInputElement>();
  const updateAlertState = useUpdateAlert();

  let { data, error, refetch } = useQuery<User>("user", () =>
    fetch("/api/user").then(data => data.json())
  );

  if (!data) {
    data = { username: "", apiToken: "", apiUrl: "" }

    updateAlertState.setError(error as string);
  }

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      apiUrl: apiUrlField.current?.value,
      apiToken: apiTokenField.current?.value,
    }

    console.log(body);

    const res = await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (res.ok) {
      refetch();
      updateAlertState.setSuccess("Saved");
    } else {
      const message = await res.text();
      updateAlertState.setError(message);
    }

  }


  const SaveButton = () => {

    return (
      <Grid item>
        <Button type="submit" startIcon={<SaveIcon />}>
          Save
        </Button>
      </Grid>
    )
  }

  return (
    <>
      <form onSubmit={onSave}>
        <Paper sx={{ 
          padding: 5, 
            backgroundColor: "background.paper",
        }}>
          <Grid gap={4} container direction="column">
            <ApiUrlField ref={apiUrlField} apiUrl={data.apiUrl} />
            <ApiTokenField ref={apiTokenField} apiToken={data.apiToken} />
            <SaveButton />
          </Grid>
        </Paper>
      </form>
    </>
  )
}

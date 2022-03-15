import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AlertProps as MuiAlertProps, Alert as MuiAlert } from "@mui/material";

interface AlertProps {
  severity: MuiAlertProps["severity"];
  onClose: () => void;
  show: boolean;
  message: string;
}

export default function Alert(props: AlertProps) {

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    props.onClose();
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={props.show}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MuiAlert action={action} severity={props.severity}>{props.message}</MuiAlert>
      </Snackbar >
    </div>
  );
}

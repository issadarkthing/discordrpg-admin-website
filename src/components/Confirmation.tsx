import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmationProps {
  title: string;
  content: string;
  show: boolean;
  onClicked: (result: boolean) => void;
}

export default function Confirmation(props: ConfirmationProps) {

  return (
    <div>
      <Dialog
        open={props.show}
        onClose={() => { props.onClicked(false); }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { 
            props.onClicked(false);
          }}>Close</Button>
          <Button onClick={() => { 
            props.onClicked(true);
          }} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

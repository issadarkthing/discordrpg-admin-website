import { 
  Paper, 
  TextField,
  Autocomplete,
  Stack,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useRef } from "react";
import { useQuery } from "react-query";
import { User } from "../sessionConfig";
import { useUpdateAlert } from "./AlertProvider";

export default function ItemForm(props: { user: User }) {
  const ownerIDRef = useRef<HTMLInputElement>();
  const itemNameRef = useRef<HTMLInputElement>();
  const updateAlert = useUpdateAlert();

  let { data } = useQuery<{ name: string, id: string }[]>("items", () =>
    fetch(`/api/request/inventory/items`, {
      headers: {
        "Authorization": `token ${props.user.apiToken}`
      }
    }).then(x => x.json())
  );

  if (!data) {
    data = [];
  }

  const onClicked = async (e: React.FormEvent) => {
    e.preventDefault();

    const ownerID = ownerIDRef.current!.value;
    const itemName = itemNameRef.current!.value;
    const itemID = (data || []).find(x => x.name === itemName)!.id;

    if (!ownerID) {
      updateAlert.setError("owner ID must be provided");
      return;
    } else if (!itemID) {
      updateAlert.setError("item must be selected");
      return;
    }

    const body = {
      id: itemID,
    }

    const res = await fetch(`/api/request/inventory/${ownerID}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${props.user.apiToken}`,
      }
    });

    if (!res.ok) {
      const message = await res.text();
      updateAlert.setError(message);
    } else {
      updateAlert.setSuccess("item added");
    }

  }

  return (
    <Paper sx={{ 
      width: 400, 
        backgroundColor: "background.paper",
        backgroundImage: "none",
        padding: 4,
    }}>
      <form onSubmit={onClicked}>
        <Stack spacing={4}>
          <TextField inputRef={ownerIDRef} fullWidth label="Owner ID"/>
          <Autocomplete
            disablePortal
            fullWidth
            options={data.map(x => ({ label: x.name }))}
            renderInput={(params) => 
            <TextField {...params} inputRef={itemNameRef} label="Item" />
            }
          />
          <Button type="submit">
            Add Item
          </Button>
        </Stack>
      </form>
    </Paper>
  )
}

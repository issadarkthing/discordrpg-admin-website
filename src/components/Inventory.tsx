import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import DataGrid from "./DataGrid";
import { useMutation, useQuery } from "react-query";
import { Grid, Button, Box, Avatar, Paper, Stack } from "@mui/material";
import Confirmation from "./Confirmation";
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useUpdateAlert } from "./AlertProvider";
import { queryClient } from "../pages/_app";
import { User } from "../sessionConfig";
import ItemForm from "./ItemForm";

export interface InventoryStucture {
  id: string;
  name: string;
  ownerID: string;
}

const columns: GridColDef[] = [
  {
    field: "id",
    hide: true,
  },
  {
    field: "itemID",
    headerName: "Item ID",
    width: 120,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "owner",
    headerName: "Owner",
    width: 220,
    renderCell: (params) => {
      const avatarSize = 26;

      return (
        <Box display="flex" alignItems="center" gap="10px">
          <Avatar 
            sx={{ width: avatarSize, height: avatarSize }} 
            alt={params.value.name} 
            src={params.value.imageUrl} 
          />
          {params.value.name}
        </Box>
      )
    }
  },
  {
    field: "ownerID",
    headerName: "Owner ID",
    width: 180,
    renderCell: (params) => {
      return params.row.owner.id;
    }
  }
];

export default function Inventory({ user }: { user: User }) {

  const { apiUrl, apiToken } = user;
  const queryKey = "inventory";
  const { isLoading, error, data, refetch } = useQuery<InventoryStucture[]>(
    queryKey, 
    async () => {

      const res = await fetch(`${apiUrl}/inventory`, { 
        headers: {
          "Authorization": `Basic ${apiToken}`
        }
      });

      if (!res.ok) {
        throw new Error(await res.text());
      } else {
        return await res.json();
      }

    }, 
    { staleTime: 1000 * 60 },
  );


  const [selected, setSelected] = useState<GridSelectionModel>([]);


  const DeleteButton = () => {
    const itemsCount = selected.length;
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const updateAlertState = useUpdateAlert();

    const deleteItems = useMutation("delete-inventory", async (ids: string[]) => {
      if (ids.length === 0) {
        return;
      }

      for (const [itemID, ownerID] of ids.map(x => x.split("_"))) {
        await fetch(`${apiUrl}/inventory/${ownerID}/${itemID}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Basic ${apiToken}`
          }
        });
      }

      setSelected([]);
      await queryClient.invalidateQueries(queryKey);
      await refetch();
    });

    const itemsText = itemsCount > 1 ? "items" : "item";

    return (
      <>
        <Confirmation 
          title={`Delete ${itemsCount} ${itemsText}?`}
          content={`This action will permanently delete ${itemsCount} ${itemsText}`}
          show={showDeleteWarning}
          onClicked={(confirmed) => {
            setShowDeleteWarning(false);

            if (confirmed) {
              deleteItems.mutate(selected as string[]);
              updateAlertState
                .setSuccess(`Successfully deleted ${itemsCount} ${itemsText}`);
            }
          }}
        />
        <Button 
          startIcon={<DeleteIcon />}
          sx={{ color: "text.primary" }}
          onClick={() => { 
            if (itemsCount > 0) {
              setShowDeleteWarning(true); 
            } else {
              updateAlertState
                .setError("Please select at least 1 item");
            }
          }}
        >
          Delete
        </Button>
      </>
    )
  }

  const RefreshButton = () => {
    const updateAlertState = useUpdateAlert();

    return (
      <Button 
        startIcon={<RefreshIcon />}
        sx={{ color: "text.primary" }}
        onClick={async () => { 
          await queryClient.invalidateQueries(queryKey);
          await refetch();
          updateAlertState.setSuccess("Successfully refreshed");
        }}
      >
        Refresh
      </Button>
    )
  }


  if (error) return <div>An error is occurred: {(error as Error).message}</div>;

  return (
    <div style={{ width: "100%" }}>
      <Stack spacing={2} direction="row" sx={{ height: 600 }}>
        <ItemForm user={user} />
        <DataGrid
          rows={data || []}
          columns={columns}
          loading={isLoading}
          selectionModel={selected}
          onSelectionModelChange={model => setSelected(model)}
          sx={{ 
            backgroundColor: "background.paper",
              "& .footerCointainer": {
                color: "text.primary"
              },
          }}
        />
      </Stack>
      <Grid container gap={1} justifyContent="flex-end" sx={{ marginTop: "10px" }}>
        <DeleteButton />
        <RefreshButton />
      </Grid>
    </div>
  )
}

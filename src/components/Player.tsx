import { 
  GridCellEditCommitParams, 
  GridColDef,
} from "@mui/x-data-grid";
import { Avatar, Button, Grid, Box } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import Confirmation from "./Confirmation";
import { useUpdateAlert } from "./AlertProvider";
import DataGrid from "./DataGrid";
import { User } from "../sessionConfig";

export interface PlayerStructure {
  id: string;
  name: string;
  imageUrl: string;
  coins: number;
  level: number;
  xp: number;
  win: number;
  hunt: number;
  currentMonster: number;
}


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 180 },
  {
    field: "imageUrl",
    headerName: "User",
    width: 200,
    renderCell: (params) => {
      const avatarSize = 26;

      return (
        <Box display="flex" alignItems="center" gap="10px">
          <Avatar 
            sx={{ width: avatarSize, height: avatarSize }} 
            alt={params.row.name} 
            src={params.value} 
          />
          {params.row.name}
        </Box>
      )
    }
  },
  {
    field: 'coins',
    headerName: 'Coins',
    type: 'number',
    width: 120,
    editable: true,
  },
  {
    field: 'level',
    headerName: 'Level',
    type: 'number',
    width: 80,
    editable: true,
  },
  {
    field: 'xp',
    headerName: 'XP',
    type: 'number',
    width: 120,
    editable: true,
  },
  {
    field: 'win',
    headerName: 'Win',
    type: 'number',
    width: 80,
    editable: true,
    preProcessEditCellProps: (params) => {
      let hasError = params.row.win > params.row.hunt;
      hasError ||= params.row.win < 0;

      return { ...params.props, error: hasError }
    }
  },
  {
    field: 'hunt',
    headerName: 'Hunt',
    type: 'number',
    width: 80,
    editable: true,
    preProcessEditCellProps: (params) => {
      let hasError = params.row.hunt < 0;

      return { ...params.props, error: hasError }
    }
  },
  {
    field: "winHuntRatio",
    headerName: "Win/Hunt %",
    width: 100,
    renderCell: (params) => {
      const winHuntRatio = (params.row.win / params.row.hunt) * 100;
      const text = isNaN(winHuntRatio) ? "0.00%" : `${winHuntRatio.toFixed(2)}%`;
      return text;
    }
  },
  {
    field: 'currentMonster',
    headerName: 'Current Monster',
    type: 'number',
    width: 140,
    editable: true,
  },
];

export default function Player({ user }: { user: User }) {

  const { apiUrl, apiToken } = user;

  const { isLoading, error, data, refetch } = useQuery<PlayerStructure[]>(
    "players", 
    async () => {

      const res = await fetch(`${apiUrl}/player`, { 
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
    { staleTime: 1000 * 60 });
  
  const [selected, setSelected] = useState<string[]>([]);

  const editPlayer = useMutation("edit-player", async (x: GridCellEditCommitParams) => {
    await fetch(`${apiUrl}/player/${x.id}`, {
      method: "PATCH",
      body: JSON.stringify({ [x.field]: x.value }),
      headers: {
        "Authorization": `Basic ${apiToken}`,
        "Content-Type": "application/json"
      }
    });

    refetch();
  });



  const onCellEditCommit = (params: GridCellEditCommitParams) => {
    editPlayer.mutate(params);
  }


  const DeleteButton = () => {
    const playersCount = selected.length;
    const updateAlertState = useUpdateAlert();
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);


    const deletePlayers = useMutation("delete-players", async (ids: string[]) => {
      if (ids.length === 0) {
        return;
      }

      await fetch(`${apiUrl}/player?ids=${ids.join(",")}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Basic ${apiToken}`,
        }
      });

      refetch();
      setSelected([]);
    });

    const playersText = playersCount > 1 ? "players" : "player";

    return (
      <>
        <Confirmation 
          title={`Delete ${playersCount} players?`}
          content={`This action will permanently delete ${playersCount} ${playersText}`}
          show={showDeleteWarning}
          onClicked={(confirmed) => {
            setShowDeleteWarning(false);

            if (confirmed) {
              deletePlayers.mutate(selected);
              updateAlertState
                .setSuccess(`Successfully deleted ${playersCount} ${playersText}`);
            }
          }}
        />
        <Button 
          sx={{ color: "text.primary" }}
          startIcon={<DeleteIcon />}
          onClick={() => { 
            if (playersCount > 0) {
              setShowDeleteWarning(true); 
            } else {
              updateAlertState
                .setError("Please select at least 1 player");
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
        onClick={() => { 
          refetch();
          updateAlertState.setSuccess("Successfully refreshed");
        }}
      >
        Refresh
      </Button>
    )
  }

  if (error) { 
    return <div>An error is occurred: {(error as Error).message}</div>; 
  }

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={data || []}
        columns={columns}
        loading={isLoading}
        onCellEditCommit={onCellEditCommit}
        onSelectionModelChange={ids => { setSelected(ids as string[]) }}
        sx={{ 
          backgroundColor: "background.paper",
          "& .footerCointainer": {
            color: "text.primary"
          },
        }}
      />
      <Grid 
        container 
        justifyContent="flex-end" 
        gap={1}
        sx={{ marginTop: "10px" }}
      >
        <DeleteButton />
        <RefreshButton />
      </Grid>
    </div>
  )
}

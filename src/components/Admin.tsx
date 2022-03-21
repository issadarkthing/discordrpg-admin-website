import { useQuery } from "react-query";
import DataGrid from "./DataGrid";
import { User } from "../structure/DB";
import { GridColDef } from "@mui/x-data-grid";
import { DateTime } from "luxon";

const renderCell = ({ value }: { value: string }) => {

  if (!value) {
    return (
      <div>
        N/A
      </div>
    )
  }

  return (
    <div>
      {DateTime.fromJSDate(new Date(value)).toRelative()}
    </div>
  );
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "username",
    headerName: "Username",
    width: 100,
  },
  {
    field: "api_url",
    headerName: "API Url",
    width: 200,
  },
  {
    field: "api_token",
    headerName: "API token",
    width: 180,
  },
  {
    field: "created_at",
    headerName: "Created",
    width: 200,
    renderCell,
  },
  {
    field: "last_online",
    headerName: "Last Online",
    width: 200,
    renderCell,
  },
  {
    field: "last_login",
    headerName: "Last Login",
    width: 200,
    renderCell,
  },
  {
    field: "ip",
    headerName: "IP",
    width: 200,
  },
]

export default function Admin() {

  const { isLoading, error, data } = useQuery<Omit<User, "password">[]>(
    "users",
    async () => {

      const res = await fetch(`/api/admin`);

      if (!res.ok) {
        throw new Error(await res.text());
      } else {
        return await res.json();
      }
    },
    { staleTime: 1000 * 60 })


  if (error) { 
    return <div>An error is occurred: {(error as Error).message}</div>; 
  }

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid 
        rows={data || []}
        columns={columns}
        loading={isLoading}
      />
    </div>
  )
}

import { DataGrid as MuiDataGrid, DataGridProps } from "@mui/x-data-grid";


export default function DataGrid(props: DataGridProps) {
  return (
    <MuiDataGrid
      sx={{ 
        width: "100%", 
          borderColor: "divider", 
          "& .MuiDataGrid-cell": {
            borderBottomColor: "divider",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottomColor: "divider",
          },
          "& .MuiIconButton-root": {
            color: "text.primary",
          },
          "& .MuiDataGrid-footerContainer": {
            color: "divider",
              borderTopColor: "divider",
          },
          "& .MuiFormLabel-root": {
            color: "text.primary",
          }
      }}
      rowsPerPageOptions={[10]}
      sortModel={[{ field: "id", sort: "desc" }]}
      autoPageSize
      disableSelectionOnClick
      checkboxSelection
      {...props}
    />
  )
}

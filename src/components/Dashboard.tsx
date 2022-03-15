import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from "@mui/material";
import Player from './Player';
import Inventory from './Inventory';
import { useState } from 'react';
import AllAlerts from "./AllAlerts";

const drawerWidth = 240;
type Category = "Players" | "Inventories";


export default function Dashboard() {

  const categories = ["Players", "Inventories"] as const;
  const [category, setCategory] = useState<Category>("Players");


  const Table = (props: { category: Category }) => {
    switch (props.category) {
      case "Players": return <Player />;
      case "Inventories": return <Inventory />;
    }
  }

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{ 
          bgcolor: 'background.paper',
          marginLeft: `${drawerWidth + 30}px`,
          width: `calc(100% - ${drawerWidth + 70}px)`,
          marginTop: "100px",
        }}
      >
        <Table category={category} />
      </Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {categories.map((text) => (
            <ListItemButton 
              selected={text === category}
              key={text}
              onClick={() => setCategory(text)}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <AllAlerts />
    </div>
  );
}

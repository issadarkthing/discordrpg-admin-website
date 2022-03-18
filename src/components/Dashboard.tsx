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
import UserMenu from "./UserMenu";
import { User } from '../sessionConfig';
import Settings from "./Settings";

const drawerWidth = 240;
type Category = "Players" | "Inventories" | "Settings";


export default function Dashboard({ user }: { user: User }) {

  const categories = ["Players", "Inventories", "Settings"] as const;
  const [category, setCategory] = useState<Category>("Players");


  const Table = (props: { category: Category }) => {
    switch (props.category) {
      case "Players": return <Player apiUrl={user.apiUrl} />;
      case "Inventories": return <Inventory apiUrl={user.apiUrl} />;
      case "Settings": return <Settings apiUrl={user.apiUrl} />;
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
          <Typography 
            variant="h6" 
            noWrap 
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Admin Panel
          </Typography>
          <UserMenu  />
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{ 
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

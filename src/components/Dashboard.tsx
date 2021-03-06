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
import { useState, useEffect } from 'react';
import AllAlerts from "./AllAlerts";
import UserMenu from "./UserMenu";
import Settings from "./Settings";
import Admin from "./Admin";
import { adminUsername, User } from "../sessionConfig";

const drawerWidth = 240;


export default function Dashboard({ user }: { user: User }) {

  const categories = ["Players", "Inventories", "Settings"];
  const [category, setCategory] = useState<string>("Players");

  if (user.username === adminUsername) {
    categories.push("Admins");
  }

  useEffect(() => {

    setInterval(() => {
      
      fetch("/api/user", { method: "POST" });

    }, 1000 * 60); // runs every 1 minute


  }, [])

  const Table = (props: { category: string }) => {
    switch (props.category) {
      case "Players": return <Player user={user} />;
      case "Inventories": return <Inventory user={user} />;
      case "Settings": return <Settings />;
      case "Admins": return <Admin />;
      default: return null;
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
          <UserMenu user={user}  />
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

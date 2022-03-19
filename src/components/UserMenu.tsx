import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Router from "next/router";
import { IconButton, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {

    const res = await fetch("/api/logout");

    if (res.ok) {
      Router.push("/logout");
    }
  }

  const handleChangePassword = () => {
    Router.push("/password");
  }

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleChangePassword}>
          <Stack direction="row" spacing={2}>
            <LockOutlinedIcon /> 
            <div>Change Password</div>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Stack direction="row" spacing={2}>
            <LogoutOutlinedIcon />
            <div>Logout</div>
          </Stack>
        </MenuItem>
      </Menu>
    </div>
  );
}

"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Drawer } from "@mui/material";
import DrawerList from "./DrawerList/page";
import Grid2 from "@mui/material/Grid2";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [auth] = React.useState<boolean>(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const { status } = useSession();

  const router = useRouter();

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <button
          className="border border-solid border-black rounded"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/");
            });
          }}
        >
          Sign Out
        </button>
      );
    } else if (status === "loading") {
      return <span className="text-[#888] text-sm mt-7">Loading...</span>;
    } else {
      return (
        <Link
          href="/pages/signIn"
          className="border border-solid border-black rounded"
        >
          Sign In
        </Link>
      );
    }
  };

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: "black", borderRadius: 5 }}
      >
        <Toolbar>
          <Grid2 sx={{ display: { md: "none" } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Grid2>
          <Typography
            variant="h6"
            component="p"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            FINANCE MANAGEMENT
          </Typography>
          {auth && (
            <Grid2>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{showSession()}</MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
              </Menu>
            </Grid2>
          )}
        </Toolbar>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <DrawerList />
        </Drawer>
      </AppBar>
    </Box>
  );
}

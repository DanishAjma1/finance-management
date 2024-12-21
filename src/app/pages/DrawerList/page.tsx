"use client";
import { Box } from "@mui/system";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";

const navItems = [
  { text: "Home", icon: <InboxIcon />, path: "/" },
  {
    text: "Add User Information",
    icon: <MailIcon />,
    path: "/pages/AddUserInformation",
  },
  { text: "Send email", icon: <MailIcon />, path: "/send-email" },
  { text: "Drafts", icon: <InboxIcon />, path: "/drafts" },
];

const DrawerList = () => (
  <Box role="presentation" sx={{ width: '100%' }}>
    <List>
      {navItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <Button
            component={Link}
            href={item.path}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              textTransform: "none",
              color: "black",
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                "& .MuiListItemIcon-root": {
                  color: "white",
                },
              },
            }}
          >
            <ListItemIcon
              className="MuiListItemIcon-root"
              sx={{
                color: "black",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </Button>
        </ListItem>
      ))}
    </List>
    <Divider />
  </Box>
);

export default DrawerList;

"use client";
import { Box } from "@mui/material";
import { ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import { JSX } from "react";
import { styled } from "@mui/material/styles";

type NavItem = {
  text: string;
  icon: JSX.Element;
  path: string;
};
const navItems: NavItem[] = [
  { text: "Home", icon: <InboxIcon />, path: "/" },
  {
    text: "Analytics",
    icon: <MailIcon />,
    path: "/pages/Analytics",
  },
  {
    text: "Transactions",
    icon: <MailIcon />,
    path: "/pages/Transactions",
  },
  {
    text: "Card",
    icon: <MailIcon />,
    path: "/pages/Card",
  },
  {
    text: "About Us",
    icon: <MailIcon />,
    path: "/pages/AboutUs",
  },
  {
    text: "Add User Information",
    icon: <MailIcon />,
    path: "/pages/AddUserInfo",
  },
  { text: "SignIn", icon: <MailIcon />, path: "/pages/signIn" },
  { text: "SignUp", icon: <InboxIcon />, path: "/pages/signUp" },
];

const StyledButton = styled(Button)(({}) => ({
  display: "flex",
  width: "100%",
  textTransform: "none",
  color: "black",
  "&:hover": {
    backgroundColor: "black",
    color: "white",
    "& .MuiListItemIcon-root": {
      color: "white",
    },
  },
}));

const StyledListItem = styled(ListItem)({
  padding: 0,
});

const StyledListItemIcon = styled(ListItemIcon)({
  color: "black",
});

const DrawerList = () => {
  return (
    <Box role="presentation" sx={{ width: "100%" }}>
      <List>
        {navItems.map((item) => (
          <StyledListItem key={item.text} disablePadding>
            <StyledButton component={Link} href={item.path}>
              <StyledListItemIcon className="MuiListItemIcon-root">
                {item.icon}
              </StyledListItemIcon>
              <ListItemText primary={item.text} />
            </StyledButton>
          </StyledListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
};
export default DrawerList;

import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  Bookmark,
  ExpandLess,
  ExpandMore,
  FolderSpecial,
  Forum,
  Notifications,
  People,
  StarBorder,
} from "@mui/icons-material";

const NavSidebar = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box component="section" flex={1}>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
          ></ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Friends" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Bookmark />
          </ListItemIcon>
          <ListItemText primary="Saved" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <Forum />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default NavSidebar;

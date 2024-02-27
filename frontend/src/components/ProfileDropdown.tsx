import { Box, Tooltip, IconButton, Avatar, Typography } from "@mui/material";
import React from "react";
import { useUserContext } from "../contexts/UserContext";

const ProfileDropdown = () => {
  const { user } = useUserContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Tooltip title="Account settings">
        <>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              alt={user.username}
              src={`/img/users/${user.profilePhoto}.jpg`}
            />
          </IconButton>
          <Typography className="text-pure-white">{user.username}</Typography>
        </>
      </Tooltip>
    </Box>
  );
};

export default ProfileDropdown;

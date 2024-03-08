import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

type UserCardPropsType = {
  imageStr: string;
  username: string;
};

const UserCard = (props: UserCardPropsType) => {
  const { imageStr, username } = props;
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAddFriend = () => {
    // @TODO Add friend with that username
    console.log("Added " + username + " into friends list");
    setAddedSuccess(true);
  };

  return (
    <Paper elevation={3}>
      <Stack
        alignItems="center"
        overflow="hidden"
        textOverflow="ellipsis"
        paddingY={4}
        bgcolor="secondary.main"
        whiteSpace="nowrap"
        className="rounded-lg shadow-md"
      >
        <Avatar src={imageStr} sizes="medium"></Avatar>

        <Typography variant="body2">{username}</Typography>

        <Button
          onClick={handleAddFriend}
          variant={addedSuccess ? "outlined" : "contained"}
        >
          {addedSuccess ? "Request Sent" : "Add Friend"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default UserCard;

import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
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
    <Stack
      alignItems="center"
      overflow="hidden"
      textOverflow="ellipsis"
      paddingY={4}
      bgcolor="primary.light"
      whiteSpace="nowrap"
      className="rounded-lg"
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
  );
};

export default UserCard;

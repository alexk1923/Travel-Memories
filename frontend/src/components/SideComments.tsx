import Box from "@mui/material/Box";
import React from "react";
import Comments from "./Comments";
import { Stack, Typography } from "@mui/material";

const SideComments = (props: { placeId: string }) => {
  return (
    <Stack bgcolor={"red"} flex={1}>
      <Typography variant="h4">Latest comments</Typography>
      <Comments placeId={props.placeId} />
    </Stack>
  );
};

export default SideComments;

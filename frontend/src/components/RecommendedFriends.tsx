import { Grid, Paper, Box } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import UserCard from "./UserCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const RecommendedFriends = () => {
  const potentialFriends = [
    {
      username: "Cabral Nebunu",
      image:
        "https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png",
    },
    {
      username: "Inna Alexandra",
      image:
        "https://teatruldevarabacau.ro/wp-content/uploads/2018/09/B9410937-C56D-40FF-B965-7CA44CE37A06.jpeg",
    },
    {
      username: "Cristiano Ronaldo",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.14.png",
    },
    {
      username: "Cristiano Ronaldo",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.14.png",
    },
    {
      username: "Cristiano Ronaldo",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.14.png",
    },
    {
      username: "Cristiano Ronaldo",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.14.png",
    },
    {
      username: "Cristiano Ronaldo",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.14.png",
    },
    {
      username: "Cristiano Ronaldooooo",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.14.png",
    },
  ];

  return (
    <Grid container spacing={2}>
      {potentialFriends.map((profile) => (
        <Grid
          item
          lg={6}
          className="rounded-lg"
          textOverflow="ellipsis"
          key={profile.username}
        >
          <UserCard username={profile.username} imageStr={profile.image} />{" "}
        </Grid>
      ))}
    </Grid>
  );
};

export default RecommendedFriends;

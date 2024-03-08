import React from "react";
import defaultUser from "../img/users/defaultUser.svg";
import { PLACE_CATEGORY, UserType } from "../constants";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Stack,
  ListItemIcon,
  ListSubheader,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { People, Bookmark, Forum, TravelExplore } from "@mui/icons-material";
import MapIcon from "@mui/icons-material/Map";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PlaceIcon from "@mui/icons-material/Place";

type ProfileDetailsType = {
  user: UserType;
  category: {
    page: string;
    placesCategory?: PLACE_CATEGORY;
    setPlacesCategory?: React.Dispatch<React.SetStateAction<PLACE_CATEGORY>>;
  };
  closeDrawer?: () => void;
};

const ProfileDetails = ({
  user,
  category,
  closeDrawer,
}: ProfileDetailsType) => {
  const menuTitles = [
    { title: "NETWORK", itemList: [{ name: "FRIENDS POSTS" }] },
    {
      title: "MY PLACES",
      itemList: [
        { name: "POSTED", value: PLACE_CATEGORY.MY_PLACES },
        { name: "LIKED", value: PLACE_CATEGORY.LIKED_PLACES },
        { name: "FAVORITES", value: PLACE_CATEGORY.FAVORITE_PLACES },
      ],
    },
    { title: "MY JOURNEY", itemList: [{ name: "MAP" }, { name: "JOURNEY" }] },
  ];

  const selectCategory = (newCategory: PLACE_CATEGORY) => {
    console.log("new Category");
    console.log(newCategory);
    console.log(newCategory >= 0);

    if (newCategory >= 0 && category && category.setPlacesCategory) {
      console.log("Entered if");
      category.setPlacesCategory(newCategory);
    }

    if (closeDrawer) {
      closeDrawer();
    }
  };

  return (
    <Box component="aside">
      <Stack direction="row" alignItems="center">
        <IconButton size="medium">
          <Avatar
            alt={user.username}
            src={`/img/users/${user.profilePhoto}.jpg`}
          />
        </IconButton>
        <Stack>
          <Typography color="primary.dark" fontWeight="bold">
            {user.username}
          </Typography>
          <Typography color="primary.light">@{user.username}</Typography>
        </Stack>
      </Stack>

      <List
        sx={{
          marginTop: 2,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
          ></ListSubheader>
        }
      >
        <ListItemButton
          onClick={() => {
            selectCategory(PLACE_CATEGORY.ALL_PLACES);
          }}
        >
          <ListItemIcon>
            <TravelExplore />
          </ListItemIcon>
          <ListItemText primary="Explore" />
        </ListItemButton>

        <Divider />

        <ListItemButton>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Friends Posts" />
        </ListItemButton>

        <Divider />

        <ListItemButton
          onClick={() => selectCategory(PLACE_CATEGORY.MY_PLACES)}
        >
          <ListItemIcon>
            <PlaceIcon />
          </ListItemIcon>
          <ListItemText primary="Posted" />
        </ListItemButton>

        <ListItemButton
          onClick={() => selectCategory(PLACE_CATEGORY.LIKED_PLACES)}
        >
          <ListItemIcon>
            <ThumbUpIcon />
          </ListItemIcon>
          <ListItemText primary="Liked" />
        </ListItemButton>

        <ListItemButton
          onClick={() => selectCategory(PLACE_CATEGORY.FAVORITE_PLACES)}
        >
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="Favorites" />
        </ListItemButton>

        <Divider />

        <ListItemButton onClick={() => {}}>
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          <ListItemText primary="Map" />
        </ListItemButton>

        <ListItemButton onClick={() => {}}>
          <ListItemIcon>
            <TravelExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Journey" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default ProfileDetails;

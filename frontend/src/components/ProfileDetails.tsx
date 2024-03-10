import React, { useEffect, useState } from "react";
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
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { People, Bookmark, Forum, TravelExplore } from "@mui/icons-material";
import MapIcon from "@mui/icons-material/Map";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PlaceIcon from "@mui/icons-material/Place";
import { usePlaceCategoryContext } from "../contexts/PlaceCategoryContext";
import { PlaceCategoryMap } from "./FilterForm";

type ProfileDetailsType = {
  user: UserType;
  closeDrawer?: () => void;
};

const ProfileDetails = ({ user, closeDrawer }: ProfileDetailsType) => {
  enum MenuTitle {
    "EXPLORE",
    "FRIENDS POSTS",
    "POSTED",
    "LIKED",
    "FAVORITES",
    "MAP",
    "JOURNEY",
  }

  const { placesCategory, setPlacesCategory } = usePlaceCategoryContext();
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuTitle>(
    MenuTitle.EXPLORE,
  );

  const selectCategory = (newCategory: PLACE_CATEGORY) => {
    if (newCategory >= 0) {
      setPlacesCategory(newCategory);
    }

    if (closeDrawer) {
      closeDrawer();
    }
  };

  const selectedCategoryStyle = {
    borderRadius: "0 999em 999em 0",
    transition: "all 0.5s",

    backgroundColor: "primary.main",
    color: "secondary.main",

    "& .menuText": {
      color: "secondary.main",
      backgroundColor: "transparent",
    },

    "&:hover": {
      backgroundColor: "primary.dark",
      color: "secondary.main",
    },
    "&:hover .menuText": {
      color: "secondary.main",
    },
  };

  const getStyleIfItemSelected = (menuItem: MenuTitle) => {
    if (selectedMenuItem === menuItem) {
      return selectedCategoryStyle;
    }

    return {};
  };

  useEffect(() => {
    switch (placesCategory) {
      case PLACE_CATEGORY.ALL_PLACES:
        setSelectedMenuItem(MenuTitle.EXPLORE);
        break;
      case PLACE_CATEGORY.MY_PLACES:
        setSelectedMenuItem(MenuTitle.POSTED);
        break;
      case PLACE_CATEGORY.FAVORITE_PLACES:
        setSelectedMenuItem(MenuTitle.FAVORITES);
        break;
      case PLACE_CATEGORY.LIKED_PLACES:
        setSelectedMenuItem(MenuTitle.LIKED);
        break;
      default:
        break;
    }
  }, [placesCategory]);

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
            setSelectedMenuItem(MenuTitle.EXPLORE);
          }}
          sx={getStyleIfItemSelected(MenuTitle.EXPLORE)}
        >
          <ListItemIcon className="menuText">
            <TravelExplore />
          </ListItemIcon>
          <ListItemText primary="Explore" />
        </ListItemButton>

        <Divider />

        <ListItemButton
          onClick={() => {
            setSelectedMenuItem(MenuTitle["FRIENDS POSTS"]);
          }}
          sx={getStyleIfItemSelected(MenuTitle["FRIENDS POSTS"])}
        >
          <ListItemIcon className="menuText">
            <People />
          </ListItemIcon>
          <ListItemText primary="Friends Posts" />
        </ListItemButton>

        <Divider />

        <ListItemButton
          onClick={() => {
            selectCategory(PLACE_CATEGORY.MY_PLACES);
            setSelectedMenuItem(MenuTitle.POSTED);
          }}
          sx={getStyleIfItemSelected(MenuTitle.POSTED)}
        >
          <ListItemIcon className="menuText">
            <PlaceIcon />
          </ListItemIcon>
          <ListItemText primary="Posted" />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            selectCategory(PLACE_CATEGORY.LIKED_PLACES);
            setSelectedMenuItem(MenuTitle.LIKED);
          }}
          sx={getStyleIfItemSelected(MenuTitle.LIKED)}
        >
          <ListItemIcon className="menuText">
            <ThumbUpIcon />
          </ListItemIcon>
          <ListItemText primary="Liked" />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            selectCategory(PLACE_CATEGORY.FAVORITE_PLACES);
            setSelectedMenuItem(MenuTitle.FAVORITES);
          }}
          sx={getStyleIfItemSelected(MenuTitle.FAVORITES)}
        >
          <ListItemIcon className="menuText">
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="Favorites" />
        </ListItemButton>

        <Divider />

        <ListItemButton
          onClick={() => {
            setSelectedMenuItem(MenuTitle.MAP);
          }}
          sx={getStyleIfItemSelected(MenuTitle.MAP)}
        >
          <ListItemIcon className="menuText">
            <MapIcon />
          </ListItemIcon>
          <ListItemText primary="Map" />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            setSelectedMenuItem(MenuTitle.JOURNEY);
          }}
          sx={getStyleIfItemSelected(MenuTitle.JOURNEY)}
        >
          <ListItemIcon className="menuText">
            <TravelExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Journey" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default ProfileDetails;

import React from "react";
import { UserType } from "../contexts/UserContext";
import defaultUser from "../img/users/defaultUser.svg";
import { PLACE_CATEGORY } from "../constants";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
type ProfileDetailsType = {
  user: UserType;
  category: {
    page: string;
    placesCategory?: PLACE_CATEGORY;
    setPlacesCategory?: React.Dispatch<React.SetStateAction<PLACE_CATEGORY>>;
  };
};

const ProfileDetails = ({ user, category }: ProfileDetailsType) => {
  const menuTitles = [
    { title: "NETWORK", itemList: [{ name: "Friends Posts" }] },
    {
      title: "MY PLACES",
      itemList: [
        { name: "Posted", value: PLACE_CATEGORY.MY_PLACES },
        { name: "Liked", value: PLACE_CATEGORY.LIKED_PLACES },
        { name: "Favorites", value: PLACE_CATEGORY.FAVORITE_PLACES },
      ],
    },
    { title: "MY JOURNEY", itemList: [{ name: "Map" }, { name: "Journey" }] },
  ];
  return (
    <div className="text-body-2 mt-4 flex flex-1 flex-col ">
      {menuTitles.map((menuTitle) => (
        <>
          <Accordion className="text-white">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-primary text-white"
            >
              <Typography>{menuTitle.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {menuTitle.itemList.map((item) => (
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          if (
                            item &&
                            "value" in item &&
                            item?.value &&
                            category &&
                            category.setPlacesCategory
                          )
                            category.setPlacesCategory(item.value);
                        }}
                      >
                        <ListItemText className=" text-primary">
                          <Typography className="font-semibold">
                            {item.name}
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </Box>
              </List>
            </AccordionDetails>
          </Accordion>
        </>
      ))}
    </div>
  );
};

export default ProfileDetails;

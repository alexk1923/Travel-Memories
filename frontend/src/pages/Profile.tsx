import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

import Places from "../components/Places";
import SocialWrapper from "./SocialWrapper";
import LocationForm from "../components/LocationForm";
import FilterForm, {
  PLACE_CATEGORY,
  PLACE_FILTER,
  PLACE_SORT,
  PlaceCategoryMap,
} from "../components/FilterForm";
import { DEFAULT_COUNTRY } from "../constants";
import { CircleFlag } from "react-circle-flags";
import CountryStats from "../components/CountryStats";
import ProfileDetails from "../components/ProfileDetails";
import SortingForm from "../components/SortingForm";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import RecommendedFriends from "../components/RecommendedFriends";
import { usePlaceCategoryContext } from "../contexts/PlaceCategoryContext";
import ModalComponent from "../components/AddPlaceModal";

function Profile() {
  const { profileUser } = useParams();
  const { user } = useUserContext();
  const [currentCity, setCurrentCity] = useState("");
  const [currentCountry, setCurrentCountry] = useState(DEFAULT_COUNTRY);
  const { placesCategory, setPlacesCategory } = usePlaceCategoryContext();
  const [sortPlace, setSortPlace] = useState<PLACE_SORT>(PLACE_SORT.RATINGS);
  const [filterPlace, setFilterPlace] = useState<PLACE_FILTER>({
    country: DEFAULT_COUNTRY,
    city: "",
  });

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setFilterPlace({ country: currentCountry, city: currentCity });
  }, [currentCity, currentCountry]);

  return (
    <Stack direction="row" justifyContent="space-between" mt={2}>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <ProfileDetails user={user} />
      </Box>

      <Box component="main">
        <Container>
          {openModal && (
            <ModalComponent
              onCloseFn={() => setOpenModal(false)}
              title="ADD A NEW PLACE"
            />
          )}

          <Stack justifyContent="center" alignItems="center">
            <Stack width="100%" gap={2}>
              <Typography
                component="h1"
                className="font-bold "
                color="primary.main"
                variant="h5"
              >
                {PlaceCategoryMap[placesCategory]}
              </Typography>

              <Stack alignSelf="flex-start">
                <Typography variant="body1">
                  Tell your friends about your last trip
                </Typography>
                <Button variant="contained" onClick={() => setOpenModal(true)}>
                  ADD NEW PLACE
                </Button>
              </Stack>
              <Stack gap={4}>
                <SortingForm
                  sortPlace={sortPlace}
                  setSortPlace={setSortPlace}
                />
                <LocationForm
                  {...{
                    currentCity,
                    setCurrentCity,
                    currentCountry,
                    setCurrentCountry,
                  }}
                />
              </Stack>

              <Stack justifyContent="center" maxWidth="100%">
                <Places
                  profileUser={profileUser}
                  category={placesCategory as PLACE_CATEGORY}
                  sortPlace={sortPlace as PLACE_SORT}
                  filter={filterPlace}
                />
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box
        component="aside"
        maxWidth="20%"
        sx={{ display: { xs: "none", lg: "block" } }}
      >
        <RecommendedFriends />
      </Box>
    </Stack>
  );
}

const ProfilePage = () => SocialWrapper({ WrappedComponent: Profile });

export default ProfilePage;

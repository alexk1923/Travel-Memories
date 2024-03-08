import { useEffect, useState } from "react";
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
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import RecommendedFriends from "../components/RecommendedFriends";

function Profile() {
  const { profileUser } = useParams();
  const { user } = useUserContext();
  const [currentCity, setCurrentCity] = useState("");
  const [currentCountry, setCurrentCountry] = useState(DEFAULT_COUNTRY);
  const [placesCategory, setPlacesCategory] = useState<PLACE_CATEGORY>(
    PLACE_CATEGORY.MY_PLACES,
  );
  const [sortPlace, setSortPlace] = useState<PLACE_SORT>(PLACE_SORT.RATINGS);
  const [filterPlace, setFilterPlace] = useState<PLACE_FILTER>({
    country: DEFAULT_COUNTRY,
    city: "",
  });
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    setFilterPlace({ country: currentCountry, city: currentCity });
  }, [currentCity, currentCountry]);

  useEffect(() => {}, []);

  // const window = () => Window();

  return (
    <Stack direction="row" justifyContent="space-between" mt={2}>
      <ProfileDetails
        user={user}
        category={{
          page: "Profile",
          placesCategory,
          setPlacesCategory,
        }}
      />

      <Box component="main">
        <Container>
          <Stack justifyContent="center" alignItems="center">
            <Stack width="80%" gap={4}>
              <Typography
                component="h1"
                className="font-bold "
                color="primary.main"
                variant="h5"
              >
                {PlaceCategoryMap[placesCategory]}
              </Typography>
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

              <Stack justifyContent="center">
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

      <Box component="aside" maxWidth="20%">
        <RecommendedFriends />
      </Box>
    </Stack>
  );
}

const ProfilePage = () => SocialWrapper({ WrappedComponent: Profile });

export default ProfilePage;

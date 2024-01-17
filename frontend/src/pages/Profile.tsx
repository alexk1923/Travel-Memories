import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { useLogout } from "../hooks/useLogout";

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
import { Container, Grid, useMediaQuery } from "@mui/material";

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

  return (
    <Grid container>
      <Grid item xs={3}>
        <ProfileDetails
          user={user}
          category={{
            page: "Profile",
            placesCategory,
            setPlacesCategory,
          }}
        />
      </Grid>

      <Grid item xs={6}>
        <Container component="main">
          <h1 className="text-center font-bold text-primary">
            {PlaceCategoryMap[placesCategory]}
          </h1>

          <div className="flex w-full flex-col">
            <div className="flex w-full flex-col">
              <SortingForm sortPlace={sortPlace} setSortPlace={setSortPlace} />
              <LocationForm
                {...{
                  currentCity,
                  setCurrentCity,
                  currentCountry,
                  setCurrentCountry,
                }}
              />
            </div>

            <div className="flex w-full justify-center">
              <Places
                profileUser={profileUser}
                category={placesCategory as PLACE_CATEGORY}
                sortPlace={sortPlace as PLACE_SORT}
                filter={filterPlace}
              />
            </div>
          </div>
        </Container>
      </Grid>

      <Grid item xs={3}></Grid>
    </Grid>
  );
}

const ProfilePage = () => SocialWrapper({ WrappedComponent: Profile });

export default ProfilePage;

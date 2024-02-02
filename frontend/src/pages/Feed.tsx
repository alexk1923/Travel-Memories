import { useUserContext } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import Places from "../components/Places";
import SocialWrapper from "./SocialWrapper";
import LocationForm from "../components/LocationForm";
import FilterForm, {
  PLACE_CATEGORY,
  PLACE_FILTER,
  PLACE_SORT,
} from "../components/FilterForm";
import { DEFAULT_COUNTRY } from "../constants";
import ModalComponent from "../components/AddPlaceModal";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import NavSidebar from "../components/NavSidebar";
import CountryStats from "../components/CountryStats";

function Feed() {
  const { user } = useUserContext();

  const [currentCountry, setCurrentCountry] = useState(DEFAULT_COUNTRY);
  const [currentCity, setCurrentCity] = useState("");
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
    <Stack flexDirection={"row"} alignItems="start">
      <NavSidebar />
      <Container maxWidth="lg" component="main">
        {openModal && (
          <ModalComponent
            onCloseFn={() => setOpenModal(false)}
            title="ADD A NEW PLACE"
          />
        )}

        <Box bgcolor={"secondary.light"}>
          <div className="flex flex-col border-b-4 border-b-slate-200  text-center">
            <Typography variant="h1" color="primary">
              EXPLORE
            </Typography>
          </div>

          <Stack alignItems="center">
            <Stack width="100%">
              <FilterForm
                category={{ page: "Feed" }}
                {...{ sortPlace, setSortPlace }}
              />
              <LocationForm
                setCurrentCountry={setCurrentCountry}
                setCurrentCity={setCurrentCity}
                currentCity={currentCity}
                currentCountry={currentCountry}
              />
            </Stack>

            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="body1">
                Don't find what you are looking for?
              </Typography>
              <Button variant="contained" onClick={() => setOpenModal(true)}>
                ADD NEW PLACE
              </Button>
            </Stack>

            <Places
              profileUser={user.username}
              category={PLACE_CATEGORY.ALL_PLACES}
              sortPlace={sortPlace as PLACE_SORT}
              filter={filterPlace}
            />
          </Stack>
        </Box>
      </Container>
      <CountryStats />
    </Stack>
  );
}

const FeedPage = () => SocialWrapper({ WrappedComponent: Feed });
export default FeedPage;

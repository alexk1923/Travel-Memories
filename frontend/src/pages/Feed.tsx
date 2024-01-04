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
import Button from "../components/Button";
import ModalComponent from "../components/AddPlaceModal";
import Container from "../components/Container";

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
    <Container>
      {openModal && (
        <ModalComponent
          onCloseFn={() => setOpenModal(false)}
          title="ADD A NEW PLACE"
        />
      )}
      <div className="mt-4 max-h-[90%] overflow-y-scroll rounded-lg shadow-lg">
        <div className="flex flex-col border-b-4 border-b-slate-200 bg-pure-white text-center">
          <h1 className="font-bold text-primary">EXPLORE</h1>
        </div>
        <div className="flex flex-col items-center bg-pure-white">
          <div className="flex w-full flex-col pl-8">
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
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <span>Don't find what you are looking for?</span>
            <Button
              text={"ADD NEW PLACE"}
              variant={"filled"}
              onClick={() => setOpenModal(true)}
            />
          </div>

          <div className="flex w-full justify-center">
            <Places
              profileUser={user.username}
              category={PLACE_CATEGORY.ALL_PLACES}
              sortPlace={sortPlace as PLACE_SORT}
              filter={filterPlace}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

const FeedPage = () => SocialWrapper({ WrappedComponent: Feed });
export default FeedPage;

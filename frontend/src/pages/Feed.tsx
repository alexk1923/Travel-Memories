import { useUserContext } from "../contexts/UserContext";
import defaultUserImg from "../img/users/defaultUser.svg";
import React, { useEffect, useState } from "react";
import Places from "../components/Places";
import { PlaceActionType, usePlaceContext } from "../contexts/PlaceContext";
import SocialWrapper from "./SocialWrapper";
import LocationForm from "../components/LocationForm";
import FilterForm, {
  PLACE_CATEGORY,
  PLACE_FILTER,
  PLACE_SORT,
} from "../components/FilterForm";
import { DEFAULT_COUNTRY } from "../constants";
import Button from "../components/Button";

type inputValuesAddPlace = {
  placeName: string;
  city: string;
  imgURL: string;
  [key: string]: string;
};

function Feed() {
  const { user } = useUserContext();
  const [inputValues, setInputValues] = useState<inputValuesAddPlace>({
    placeName: "",
    city: "",
    imgURL: "",
  });

  const [currentCountry, setCurrentCountry] = useState(DEFAULT_COUNTRY);
  const [currentCity, setCurrentCity] = useState("");
  const { dispatch } = usePlaceContext();
  const [sortPlace, setSortPlace] = useState<PLACE_SORT>(PLACE_SORT.RATINGS);
  const [filterPlace, setFilterPlace] = useState<PLACE_FILTER>({
    country: DEFAULT_COUNTRY,
    city: "",
  });

  useEffect(() => {
    setFilterPlace({ country: currentCountry, city: currentCity });
  }, [currentCity, currentCountry]);

  function handleAddPlace(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (currentCountry === "Worldwide") {
      alert("SELECT A COUNTRY FIRST");
      return;
    }
    if (currentCity.length === 0) {
      alert("SELECT A CITY FIRST!");
      return;
    }

    const dataInput = {
      name: inputValues.placeName,
      country: currentCountry,
      city: currentCity,
      imageURL: inputValues.imgURL,
    };

    fetch(`http://localhost:8000/api/places/all/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataInput),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`Added ${data} to the database`);
        dispatch({ type: PlaceActionType.ADD, payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
    setInputValues({
      placeName: "",
      city: "",
      imgURL: "",
    });
  }

  const inputs = [
    {
      key: 1,
      name: "placeName",
      placeholder: "What is the last place you have visited?",
    },
    {
      key: 2,
      name: "imgURL",
      placeholder: "Add image url here",
    },
  ];

  return (
    <div className="mt-4 max-h-[90%] overflow-y-scroll rounded-lg shadow-lg">
      <div className="flex flex-col border-b-4 border-b-slate-200 bg-pure-white text-center">
        <h1 className="font-bold text-primary">EXPLORE</h1>
      </div>
      <div className="flex flex-col items-center bg-pure-white">
        <div className="flex w-[100%] flex-col pl-8">
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
            onClick={undefined}
          />
        </div>
        <div className="bg-red-800 flex w-full  justify-center">
          <Places
            profileUser={user.username}
            category={PLACE_CATEGORY.ALL_PLACES}
            sortPlace={sortPlace as PLACE_SORT}
            filter={filterPlace}
          />
        </div>
      </div>
    </div>
  );
}

const FeedPage = () => SocialWrapper({ WrappedComponent: Feed });
export default FeedPage;

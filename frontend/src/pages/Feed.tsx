import { useUserContext } from "../contexts/UserContext";
import defaultUserImg from "../img/defaultUser.svg";
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

    fetch(`http://localhost:8000/api/places`, {
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
    <>
      <div className="flex flex-row border-b-4 border-b-slate-200 bg-white">
        <div className="flex flex-row items-center">
          <img
            alt="user"
            src={defaultUserImg}
            className="w-[15%] rounded-full drop-shadow-xl"
          />
          <div>
            <h1>
              <b>{user.username}</b>
            </h1>
            <h2>{user.email}</h2>
          </div>
        </div>
      </div>
      <div className="h-screen bg-white">
        <form className="flex w-full flex-col items-center gap-2 [&>*]:w-[30%]">
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
        </form>
        <div className="bg-red-800 w-full ">
          <Places
            profileUser={user.username}
            category={PLACE_CATEGORY.ALL_PLACES}
            sortPlace={sortPlace as PLACE_SORT}
            filter={filterPlace}
          />
        </div>
        <div className="bg-red-400 flex flex-col items-center">
          <p>Cant find your place?</p>
          {inputs.map((inputElem) => {
            return (
              <React.Fragment key={inputElem.key}>
                <input
                  value={inputValues[inputElem.name]}
                  {...inputElem}
                  onChange={(e) =>
                    setInputValues({
                      ...inputValues,
                      [inputElem.name]: e.target.value,
                    })
                  }
                ></input>
              </React.Fragment>
            );
          })}
          <button className="btn w-[15%]" onClick={(e) => handleAddPlace(e)}>
            Add new place
          </button>
        </div>
      </div>
    </>
  );
}

const FeedPage = () => SocialWrapper({ WrappedComponent: Feed });
export default FeedPage;

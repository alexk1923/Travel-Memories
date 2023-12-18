import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { DEFAULT_COUNTRY } from "../constants";

type CountryType = {
  iso3: string;
  country: string;
  cities: string[];
};

type LocationPropsType = {
  currentCity: string;
  currentCountry: string;
  setCurrentCity: React.Dispatch<React.SetStateAction<string>>;
  setCurrentCountry: React.Dispatch<React.SetStateAction<string>>;
};

export default function Location(props: LocationPropsType) {
  const { currentCity, currentCountry, setCurrentCity, setCurrentCountry } =
    props;

  const [countries, setCountries] = useState<CountryType[]>([]);
  const [cities, setCities] = useState([]);
  const [displayType, setDisplayType] = useState("Cards");

  // Get and set the countries
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setCountries(data.data))
      .catch((err) => console.log(err));
  }, []);

  function fetchCities(country: string) {
    if (country === "Worldwide") {
      return;
    }

    const countryData = {
      country,
    };

    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(countryData),
    })
      .then((res) => res.json())
      .then((data) => setCities(data.data.states));
  }

  return (
    <div className="flex w-[50%] flex-col gap-2 text-primary">
      <div className="flex items-center justify-start gap-2">
        <select
          onChange={(e) => {
            setCurrentCountry(e.target.value);
            fetchCities(e.target.value);
          }}
          value={currentCountry}
          className="form-element w-fit max-w-[100%]"
        >
          <option value="Worldwide" className="form-element input-white">
            🌏 Worldwide
          </option>
          {countries.map((country) => (
            <React.Fragment key={uuid()}>
              <option
                value={country.country}
                className="form-element input-white"
              >
                {country.country}
              </option>
            </React.Fragment>
          ))}
        </select>
        {currentCountry !== DEFAULT_COUNTRY && (
          <select
            onChange={(e) => setCurrentCity(e.target.value)}
            value={currentCity}
            className="form-element w-fit max-w-[40%]"
          >
            <option value="">-</option>
            {cities.map((city: { name: string }) => (
              <React.Fragment key={uuid()}>
                <option value={city.name}>{city.name}</option>
              </React.Fragment>
            ))}
          </select>
        )}
      </div>

      <input placeholder="Search..." className="form-element" />
      <select
        value={displayType}
        onChange={(e) => setDisplayType(e.target.value)}
        className="form-element"
      >
        <option value="Cards">Cards</option>
        <option value="Detailed">Detailed</option>
      </select>
    </div>
  );
}

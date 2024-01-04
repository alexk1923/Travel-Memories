import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { DEFAULT_COUNTRY } from "../constants";

type CountryType = {
  iso: string;
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

  // Get and set the countries
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.data);
        console.log(data);
      })
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
    <div className="flex w-full flex-col gap-2 text-primary">
      <select
        onChange={(e) => {
          setCurrentCountry(e.target.value);
          fetchCities(e.target.value);
        }}
        value={currentCountry}
        className="form-element w-full lg:w-fit lg:max-w-full"
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
          className="form-element overflow-hidden text-ellipsis"
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
  );
}

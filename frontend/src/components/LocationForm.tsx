import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { DEFAULT_COUNTRY } from "../constants";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

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
    <FormControl className="w-fit min-w-[25%] max-w-full gap-4">
      <InputLabel id="country-label">Country</InputLabel>
      <Select
        label="Country"
        labelId="country-label"
        onChange={(e) => {
          setCurrentCountry(e.target.value);
          fetchCities(e.target.value);
        }}
        value={currentCountry}
      >
        <MenuItem value={DEFAULT_COUNTRY}>🌏 Worldwide</MenuItem>

        {countries.map((country) => (
          <MenuItem key={uuid()} value={country.country}>
            {country.country}
          </MenuItem>
        ))}
      </Select>
      {currentCountry !== DEFAULT_COUNTRY && (
        <FormControl>
          <InputLabel id="city-label">City</InputLabel>
          <Select
            label="City"
            labelId="city-label"
            onChange={(e) => setCurrentCity(e.target.value)}
            value={currentCity}
          >
            <MenuItem value="">-</MenuItem>
            {cities.map((city: { name: string }) => (
              <MenuItem key={uuid()} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </FormControl>
  );
}

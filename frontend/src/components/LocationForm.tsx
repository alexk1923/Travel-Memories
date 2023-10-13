import React, { useEffect, useState } from 'react'
import { v4 as uuid } from "uuid";

type CountryType = {
    iso3: string;
    country: string;
    cities: string[];
};

type LocationPropsType = {
    currentCity: string;
    currentCountry: string;
    setCurrentCity: React.Dispatch<React.SetStateAction<string>>,
    setCurrentCountry: React.Dispatch<React.SetStateAction<string>>;
}

export default function Location(props: LocationPropsType) {
    const { currentCity, currentCountry, setCurrentCity, setCurrentCountry } = props;

    const [countries, setCountries] = useState<CountryType[]>([]);
    const [cities, setCities] = useState([]);

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

    useEffect(() => {

    }, [])

    return (
        <div className="text-slate-900">
            <select
                onChange={(e) => {
                    setCurrentCountry(e.target.value);
                    fetchCities(e.target.value);
                }}
                value={currentCountry}
            >
                <option value='Worldwide'>
                    🌏 Worldwide
                </option>
                {countries.map((country) => (
                    <React.Fragment key={uuid()}>
                        <option value={country.country}>{country.country}</option>
                    </React.Fragment>
                ))}
            </select>
            {currentCountry.length > 0 && <select
                onChange={(e) => setCurrentCity(e.target.value)}
                value={currentCity}
            >
                <option value=''>
                    -
                </option>
                {cities.map((city: { name: string }) => (
                    <React.Fragment key={uuid()}>
                        <option value={city.name}>{city.name}</option>
                    </React.Fragment>
                ))}
            </select>}
        </div>
    )
}

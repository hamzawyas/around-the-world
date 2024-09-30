import { useEffect, useState } from "react";
import { json } from "react-router-dom";

export const useFetchData = (country) => {
    const [result, setResult] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (country) {
            fetchDataFromAPI();
        } else {
            fetchDataFromLocalstorage();
        }
    }, []);

    const fetchDataFromAPI = () => {
        let url = "https://restcountries.com/v3.1/all";

        setIsloading(true);

        if (country) {
            url = `https://restcountries.com/v3.1/name/${country}`;
        }

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (country) {
                    //country page
                    setResult(data[0]);
                } else {
                    //Home page
                    setResult(data);
                    setFilteredCountries(data);
                    localStorage.setItem("countries", JSON.stringify(data));
                }
            })
            .catch(() => setIsError(true))
            .finally(() => setIsloading(false));
    };

    const fetchDataFromLocalstorage = () => {
        const data = JSON.parse(localStorage.getItem("countries"));

        if (data) {
            setResult(data);
            setFilteredCountries(data);
        } else {
            fetchDataFromAPI();
        }
    };
    return {
        result,
        filteredCountries,
        setFilteredCountries,
        isLoading,
        isError,
    };
};
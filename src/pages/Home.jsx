import ShowMessage from "../components/ShowMessage";
import SearchInput from "../components/SearchInput";
import RegionMenu from "../components/RegionMenu";
import CountryList from "../components/CountryList";
import { useFetchData } from "../useFetchData";

const Home = () => {
  const {
    result,
    filteredCountries,
    setFilteredCountries,
    isLoading,
    isError,
  } = useFetchData();

  return (
    <>
      {isLoading && <ShowMessage message="Loading counties data...!" />}
      {isError && <ShowMessage message="Something went wrong!" />}
      {!isLoading && !isError && (
        <>
          <div className="flex flex-col justify-between gap-10 md:h-14 md:flex-row md:gap-0">
            <SearchInput
              countriesList={result}
              filterCountriesLis={setFilteredCountries}
            />
            <RegionMenu
              countriesList={result}
              filterCountriesLis={setFilteredCountries}
            />
          </div>
          <CountryList data={filteredCountries} />
        </>
      )}
    </>
  );
};

export default Home;

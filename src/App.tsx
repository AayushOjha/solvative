import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { rapidApi } from "./services/api/rapidApi";
import { IPlace } from "./services/interfaces";
import { debounce } from "lodash";
import { Table } from "./components/Table";
import { Loader } from "./components/Loader";
import { Pagination } from "./components/Pagination";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [cities, setCities] = useState<IPlace[]>([]);
  const [totalCities, setTotalCities] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value == " ") {
      // now user can not enter empty space at initial places
    } else {
      setQuery(event.target.value);

      // making sure the call only fires once user has input at least 2 characters
      if (event.target.value && event.target.value.length > 1) {
        debouncedSearch(event.target.value);
      } else {
      }
    }
  };

  const debouncedSearch = useRef(
    debounce(async (value) => {
      setIsLoading(true);
      rapidApi
        .fetchPlaces(value, (page - 1) * limit, limit)
        .then((response) => {
          if (response.data.data.length === 0) {
            setNoResult(true);
          } else {
            setNoResult(false);
          }
          setCities(response.data.data);
          setTotalCities(response.data.metadata.totalCount);
        })
        .catch((error) => {
          // TODO: handle error here
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 500)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handlePageButtonClick = (type: "next" | "prev") => {
    let _page = type === "next" ? page + 1 : page - 1;
    setPage(_page);
    setIsLoading(true);
    rapidApi
      .fetchPlaces(query, (_page - 1) * limit, limit)
      .then((response) => {
        if (response.data.data.length === 0) {
          setNoResult(true);
        } else {
          setNoResult(false);
        }
        setCities(response.data.data);
        setTotalCities(response.data.metadata.totalCount);
      })
      .catch((error) => {
        // TODO: handle error here
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLimitChange = (_limit: number) => {
    if (_limit > 10) {
      alert("Please enter a valid value less than 10");
    } else {
      setLimit(_limit);
      setPage(1); // need to reset page when limit is changed
      setIsLoading(true);
      rapidApi
        .fetchPlaces(query, 1, _limit)
        .then((response) => {
          if (response.data.data.length === 0) {
            setNoResult(true);
          } else {
            setNoResult(false);
          }
          setCities(response.data.data);
          setTotalCities(response.data.metadata.totalCount);
        })
        .catch((error) => {
          // TODO: handle error here
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="page app-container">
      <SearchBar query={query} handleSearchInput={handleSearchInput} />
      {isLoading ? <Loader /> : <></>}
      <Table
        cities={cities}
        noResult={noResult}
        query={query}
        offset={(page - 1) * limit}
      />
      {totalCities > 0 ? (
        <Pagination
          noResult={noResult}
          page={page}
          limit={limit}
          handlePageButtonClick={handlePageButtonClick}
          handleLimitSelect={handleLimitChange}
          totalPage={Math.ceil(totalCities / limit)}
          query={query}
          totalCities={totalCities}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;

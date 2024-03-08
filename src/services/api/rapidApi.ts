import axios, { AxiosPromise } from "axios";
import { IPlace } from "../interfaces";

export interface IFetchPlaceResponse {
  data: IPlace[];
  metadata: {
    currentOffset: number;
    totalCount: number;
  };
}

const fetchPlaces = (
  query: string,
  offset: number,
  limit: number
): AxiosPromise<IFetchPlaceResponse> => {
  return axios.get(
    `https://${process.env.REACT_APP_RAPIDAPI_HOST}/v1/geo/cities`,
    {
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_HOST,
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
      },
      params: {
        namePrefix: query,
        limit,
        offset,
      },
    }
  );
};

const rapidApi = { fetchPlaces };
export { rapidApi };

import { IPlace } from "../services/interfaces";
import "../styles/table.css";

type Props = {
  cities: IPlace[];
  noResult: boolean;
  query: string;
  offset: number;
};

const Table = ({ cities, query, noResult, offset }: Props) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <TableContent
            cities={cities}
            query={query}
            noResult={noResult}
            offset={offset}
          />
        </tbody>
      </table>
    </div>
  );
};

export { Table };

const TableContent = ({ noResult, cities, query, offset }: Props) => {
  if (!query) {
    return (
      <>
        <div className="table-message">Start searching</div>
      </>
    );
  }
  if (noResult) {
    return (
      <>
        <div className="table-message">No result found </div>
      </>
    );
  }
  return (
    <>
      {cities.map((place: any, index: number) => {
        return (
          <tr key={place.id}>
            <td>{offset + index + 1}</td>
            <td>{place.name}</td>
            <td>{place.country}</td>
          </tr>
        );
      })}
    </>
  );
};

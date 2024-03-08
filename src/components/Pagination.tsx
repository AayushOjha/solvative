import { ChangeEvent } from "react";
import "../styles/pagination.css";

type Props = {
  page: number;
  limit: number;
  handlePageButtonClick: (type: "next" | "prev") => void;
  handleLimitSelect: (_limit: number) => void;
  totalPage: number;
  query: string;
  noResult: boolean;
  totalCities: number;
};

const Pagination = ({
  page,
  limit,
  handlePageButtonClick,
  handleLimitSelect,
  totalPage,
  query,
  noResult,
  totalCities,
}: Props) => {
  return (
    <div>
      <div className="pagination-container">
        <div className="page-changer">
          <button
            className="nav-btn"
            disabled={page === 0}
            onClick={() => {
              handlePageButtonClick("prev");
            }}
          >
            Prev
          </button>
          <button
            className="nav-btn"
            disabled={page == totalPage}
            onClick={() => {
              handlePageButtonClick("next");
            }}
          >
            Next
          </button>
        </div>
        <div className="limit-selector">
          <label>Limit:</label>
          <input
            type="number"
            min={5}
            max={10}
            value={limit}
            onChange={({ target }) => {
              const _limit = parseInt(target.value);
              if (typeof _limit === "number") {
                handleLimitSelect(_limit);
              }
            }}
            disabled={totalCities <= limit}
          />
        </div>
      </div>
    </div>
  );
};

export { Pagination };

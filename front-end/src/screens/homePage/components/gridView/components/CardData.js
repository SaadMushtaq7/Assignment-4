import React from "react";
import Spinner from "../../../../../components/Spinner";

const CardData = ({ dataLoading, rawData, error }) => {
  return (
    <>
      <span className="card-text">
        {!dataLoading && <p>{rawData}</p>}
        {dataLoading && <Spinner error={error} />}
      </span>
    </>
  );
};

export default CardData;

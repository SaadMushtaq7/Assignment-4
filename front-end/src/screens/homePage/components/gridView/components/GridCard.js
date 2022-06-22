import React from "react";
import CardData from "./CardData";
import CardUser from "./CardUser";

const GridCard = ({
  rawData,
  avatar,
  username,
  file,
  time,
  dataLoading,
  error,
}) => {
  return (
    <div className="col-sm">
      <div className="card">
        <CardData dataLoading={dataLoading} rawData={rawData} error={error} />
        <CardUser avatar={avatar} username={username} file={file} time={time} />
      </div>
    </div>
  );
};

export default GridCard;

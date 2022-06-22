import React, { useCallback, useEffect, useState } from "react";
import * as R from "ramda";
import { fetchGistRaw } from "../../../../services/gistCRUD";
import GridCard from "./components/GridCard";
import Logo from "../../../../logo.svg";
import "./homePageGrid.css";

export default function HomePageGrid({ data }) {
  let mapIndexed = R.addIndex(R.map);
  const [rawDataUrl] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFiles = useCallback(async () => {
    setDataLoading(true);
    for (let i = 0; i < data.length; i++) {
      const file_name = Object.keys(data[i].files)[0];
      const temp = data[i].files[file_name]["raw_url"];
      const res = await fetchGistRaw(temp);
      if (res.status === 200) {
        rawDataUrl.push(res.data);
      } else {
        setError(res);
      }
    }

    setDataLoading(false);
  }, [data, rawDataUrl]);

  useEffect(() => {
    fetchFiles();
    console.log(rawDataUrl);
  }, [fetchFiles, rawDataUrl]);

  return (
    <div className="home-page-grid-container">
      <div className="container">
        <div className="row">
          {mapIndexed((file, index) => {
            const [, fTime] = file.created_at.split("T");
            const [time] = fTime.split("Z");
            return (
              <GridCard
                key={index}
                rawData={R.pathOr("Data not found!", [], rawDataUrl[index])}
                avatar={R.pathOr(Logo, ["owner", "avatar_url"], file)}
                username={R.pathOr("username", ["owner", "login"], file)}
                time={R.pathOr("N/A", [], time)}
                starLoading={R.pathOr(false, [], dataLoading)}
                file={R.pathOr([], [], file)}
                dataLoading={dataLoading}
                error={R.pathOr(false, [], error)}
              />
            );
          }, data)}
        </div>
      </div>
    </div>
  );
}

import React, { useCallback, useEffect, useState } from "react";
import * as R from "ramda";
import { fetchGistRaw } from "../../../../services/gistCRUD";
import GridCard from "./components/GridCard";
import Logo from "../../../../logo.svg";
import "./homePageGrid.css";
import Spinner from "../../../../components/Spinner";

export default function HomePageGrid({ data }) {
  let mapIndexed = R.addIndex(R.map);

  const [rawDataUrl, setRawDataUrl] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState(null);

  const rawDataFetcher = useCallback(async (file) => {
    const file_name = Object.keys(file.files)[0];
    const temp = file.files[file_name]["raw_url"];
    const res = await fetchGistRaw(temp);
    if (res.status === 200) {
      return res.data;
    } else {
      setError(res);
    }
  }, []);

  const fetchFiles = useCallback(() => {
    setDataLoading(true);
    const promises = [];
    promises.push(R.map(rawDataFetcher, data));
    Promise.all(promises[0]).then((res) => setRawDataUrl(res));

    setDataLoading(false);
  }, [data, rawDataFetcher, rawDataUrl.length]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

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
                rawData={R.pathOr(<Spinner />, [], rawDataUrl[index])}
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

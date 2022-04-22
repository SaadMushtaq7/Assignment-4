import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
import "../styles/home-page-grid.css";

export default function HomePageGrid({ data, user }) {
  const [rawDataUrl] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFiles = async () => {
    for (let i = 0; i < data.length; i++) {
      const file_name = Object.keys(data[i].files)[0];
      const temp = data[i].files[file_name]["raw_url"];
      await axios
        .get(temp)
        .then((res) => {
          rawDataUrl.push(res.data);
        })
        .catch((error) => {
          console.log(`Error fetching data: ${error}`);
          setError(error);
        });
    }
    setDataLoading(true);
  };

  useEffect(() => {
    fetchFiles();
  });

  return (
    <div className="home-page-grid-container">
      <div className="container">
        {!dataLoading ? (
          <Spinner error={error} />
        ) : (
          <div className="row">
            {data.map((file, index) => {
              const [, fTime] = file.created_at.split("T");
              const [time] = fTime.split("Z");
              return (
                <div key={index} className="col-sm">
                  <div className="card">
                    <p className="card-text">{rawDataUrl[index]}</p>
                    <div className="grid-user">
                      <img
                        src={file.owner.avatar_url}
                        className="card-img-top"
                        alt="Use"
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          {file.owner.login}/
                          <span>
                            <Link
                              style={{ textDecoration: "none" }}
                              to="/file"
                              state={{ file: file, user: user }}
                            >
                              {Object.keys(file.files)[0]}
                            </Link>
                          </span>
                        </h5>
                        <p className="card-time">{time}</p>
                        <p className="card-source">Broadcast Server</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

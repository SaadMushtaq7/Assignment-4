import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
import "../styles/home-page-grid.css";

export default function HomePageGrid({ data, user }) {
  const [rawDataUrl] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);
  const fetchFiles = async () => {
    for (let i = 0; i < data.length; i++) {
      const file_name = Object.keys(data[i].files)[0];
      const temp = data[i].files[file_name]["raw_url"];
      await axios
        .get(temp)
        .then((res) => {
          rawDataUrl.push(res.data);
        })
        .catch((error) => console.log(`Error fetching data: ${error}`));
    }
    setDataReceived(true);
  };
  useEffect(() => {
    fetchFiles();
  });

  return (
    <div className="home-page-grid-container">
      <div className="container">
        {!dataReceived ? (
          <Spinner />
        ) : (
          <div className="row">
            {data.map((file, idx) => {
              const [, fTime] = file.created_at.split("T");
              const time = fTime.split("Z");
              return (
                <div key={idx} className="col-sm">
                  <div className="card">
                    <p className="card-text">
                      {rawDataUrl[idx].length > 500
                        ? rawDataUrl[idx].slice(0, 450) + ` more...`
                        : rawDataUrl[idx]}
                    </p>
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
                              state={[file, user]}
                            >
                              {Object.keys(file.files)[0].length > 10
                                ? Object.keys(file.files)[0].slice(0, 10) +
                                  "..."
                                : Object.keys(file.files)[0]}
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

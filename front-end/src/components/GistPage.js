import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import "../styles/gist-page.css";
export default function GistPage() {
  const location = useLocation();
  const currentFile = location.state[0];
  const currentUser = location.state[1];
  const [rawData, setRawData] = useState("");
  const [, fTime] = currentFile.created_at.split("T");
  const time = fTime.split("Z");

  const file_name = Object.keys(currentFile.files)[0];
  const temp = currentFile.files[file_name]["raw_url"];
  const fetchFiles = async () => {
    await axios
      .get(temp)
      .then((res) => {
        setRawData(res.data);
      })
      .catch((error) => console.log(`Error fetching data: ${error}`));
  };
  useEffect(() => {
    fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="gist-page-container">
      <NavBar user={currentUser} />
      <div className="gist-page-header">
        <div className="gist-page-user">
          <img
            src={currentFile.owner.avatar_url}
            className="card-img-top"
            alt="User"
          />
          <div className="card-body">
            <h5 className="card-title">
              {currentFile.owner.login}/
              <span className="card-filename">{file_name}</span>
            </h5>
            <p className="card-time">{time}</p>
            <p className="card-source">Broadcast Server</p>
          </div>
        </div>
        <div className="gist-page-action">
          <div>
            Stars
            <i className="fa-regular fa-star" />
            <span>0</span>
          </div>
          <div>
            Forks
            <i className="fa-solid fa-code-fork" />
            <span>0</span>
          </div>
        </div>
      </div>
      <div className="body">
        <p>{Object.keys(currentFile.files)[0]}</p>
        <textarea rows="22" cols="130" value={rawData} disabled={true} />
      </div>{" "}
    </div>
  );
}

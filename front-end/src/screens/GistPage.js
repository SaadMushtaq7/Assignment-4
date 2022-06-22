import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as R from "ramda";
import {
  addStarFile,
  deleteStarFiles,
  setForkFiles,
} from "../redux/actions/filesActions";
import { starGist, unStarGist, forkGist } from "../services/gistActions";
import NavBar from "../components/NavBar";
import Logo from "../logo.svg";
import "../styles/gistPage.css";
import useApiCall from "../customHooks/useApiCall";

const GistPage = () => {
  const location = useLocation();
  const currentUser = useSelector((state) => state.userProfile.user);
  const starFiles = useSelector((state) => state.starfiles.files || []);
  const forkFiles = useSelector((state) => state.forkfiles || []);

  const dispatch = useDispatch();

  const { file: currentFile } = location.state;

  const [rawData, setRawData] = useState("");
  const [starCheck, setStarCheck] = useState(false);
  const [forkCheck, setForkCheck] = useState(false);

  const [, fTime] = currentFile.created_at.split("T");
  const [time] = fTime.split("Z");

  const file_name = Object.keys(currentFile.files)[0];
  const temp = currentFile.files[file_name]["raw_url"];

  const { data, error } = useApiCall({
    url: temp,
    method: "get",
  });

  const handleStarGist = async () => {
    const res = await starGist(currentFile);
    if (res === 204) {
      dispatch(addStarFile(currentFile));
      setStarCheck(true);
    }
  };
  const handleUnStarGist = async () => {
    const res = await unStarGist(currentFile.id);
    if (res === 204) {
      setStarCheck(false);
      dispatch(deleteStarFiles(currentFile));
    }
  };

  const handleStar = () => {
    if (!starCheck) {
      handleStarGist();
    } else {
      handleUnStarGist();
    }
  };

  const handleGistFork = async () => {
    const res = await forkGist(currentFile);
    if (res.status === 201) {
      setForkCheck(true);
      dispatch(setForkFiles(currentFile));
    }
  };

  const checkStarred = useCallback(() => {
    if (starFiles) {
      const starredItems = starFiles.filter(
        (file) => file.id === currentFile.id
      ).length;
      if (starredItems) {
        setStarCheck(true);
      }
    }
  }, [currentFile.id, starFiles]);

  const checkForked = useCallback(() => {
    if (forkFiles.filter((file) => file.id === currentFile.id).length) {
      setForkCheck(true);
    }
  }, [currentFile.id, forkFiles]);

  useEffect(() => {
    if (data && !error) {
      setRawData(data);
    }
    checkStarred();
    checkForked();
  }, [data, error, checkStarred, checkForked]);

  return (
    <div className="gist-page-container">
      <NavBar user={R.pathOr(null, [], currentUser)} />
      <div className="gist-page-header">
        <div className="gist-page-user">
          <img
            src={R.pathOr(Logo, ["owner", "avatar_url"], currentFile)}
            className="card-img-top"
            alt="User"
          />
          <div className="card-body">
            <h5 className="card-title">
              {R.pathOr("username", ["owner", "login"], currentFile)}/
              <span className="card-filename">
                {R.pathOr("filename", [], file_name)}
              </span>
            </h5>
            <p className="card-time">{R.pathOr("N/A", [], time)}</p>
            <p className="card-source">Broadcast Server</p>
          </div>
        </div>
        <div className="gist-page-action">
          <div>
            <span className="icon-box" onClick={handleStar}>
              Stars
              <i
                className={
                  starCheck
                    ? "fa-regular fa-star checked"
                    : "fa-regular fa-star"
                }
              />
            </span>

            <span className="count">{starCheck ? 1 : 0}</span>
          </div>
          <div>
            <span className="icon-box" onClick={handleGistFork}>
              Forks
              <i
                className={
                  forkCheck
                    ? "fa-solid fa-code-fork checked"
                    : "fa-solid fa-code-fork"
                }
              />
            </span>
            <span className="count">{forkCheck ? 1 : 0}</span>
          </div>
        </div>
      </div>
      <div className="body">
        <p>{Object.keys(currentFile.files)[0]}</p>
        <textarea
          rows="22"
          cols="130"
          value={R.pathOr("", [], rawData)}
          disabled={true}
        />
      </div>
    </div>
  );
};

export default GistPage;

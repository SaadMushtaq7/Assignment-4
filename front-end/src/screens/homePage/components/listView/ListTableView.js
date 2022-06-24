import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as R from "ramda";
import {
  addStarFile,
  deleteStarFiles,
  setForkFiles,
} from "../../../../redux/actions/filesActions";

import {
  starGist,
  unStarGist,
  forkGist,
} from "../../../../services/gistActions";
import ListRow from "./components/ListRow";
import Logo from "../../../../logo.svg";
import "./homePageList.css";

const ListTableView = ({ data }) => {
  const dispatch = useDispatch();

  const starFiles = useSelector((state) => state.starfiles.files || []); //in rd action
  const forkFiles = useSelector((state) => state.forkfiles || []);

  const [clickedFile, setClickedFile] = useState(null);
  const [starCheck, setStarCheck] = useState(false);
  const [starLoading, setStarLoading] = useState(false);
  const [forkLoading, setForkLoading] = useState(false);

  let mapIndexed = R.addIndex(R.map);

  const handleStarGist = async (currentFile) => {
    setStarLoading(true);
    /*const {
      response: starResponse,
      error: starError,
      loading: starLoader,
    } = await api({
      url: `https://api.github.com/gists/${currentFile.id}/star`,
      method: "PUT",
      headerCheck: true,
      body: {
        description: currentFile.description,
        public: false,
        files: currentFile,
      },
    });
    console.log(starResponse, starError, starLoader);
    if (starResponse && !starLoader && !starError) {
      dispatch(addStarFile(currentFile));
      setStarCheck(true);
      setStarLoading(false);
    }*/
    const res = await starGist(currentFile);
    if (res === 204) {
      dispatch(addStarFile(currentFile));
      setStarCheck(true);
      setStarLoading(false);
    }
  };
  const handleUnStarGist = async (currentFile) => {
    setStarLoading(true);
    const res = await unStarGist(currentFile.id);
    if (res === 204) {
      setStarCheck(false);
      dispatch(deleteStarFiles(currentFile));
      setStarLoading(false);
    }
  };

  const handleStar = (file) => {
    if (starFiles.some((item) => item.id === file.id)) {
      setStarCheck(true);
    } else {
      setStarCheck(false);
    }
    setClickedFile(file);
    if (!starCheck) {
      handleStarGist(file);
    } else {
      handleUnStarGist(file);
    }
  };

  const handleGistFork = async (currentFile) => {
    setClickedFile(currentFile);
    setForkLoading(true);
    const res = await forkGist(currentFile);
    if (res.status === 201) {
      dispatch(setForkFiles(currentFile));
      setForkLoading(false);
    }
  };

  return (
    <div className="home-page-list-container">
      <table className="table table-light">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" className="checkbox-size" />
            </th>
            <th></th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Keyword</th>
            <th scope="col">Notebook Name</th>
            <th scope="col">
              <i className="fa-regular fa-star" />
              <i className="fa-solid fa-code-fork" />
            </th>
          </tr>
        </thead>
        <tbody>
          {mapIndexed((file, index) => {
            const [date, fTime] = file.created_at.split("T");
            const [time] = fTime.split("Z");

            return (
              <ListRow
                key={index}
                file={R.pathOr([], [], file)}
                clickedFile={R.pathOr([], [], clickedFile)}
                starFiles={R.pathOr([], [], starFiles)}
                forkFiles={R.pathOr([], [], forkFiles)}
                avatar={R.pathOr(Logo, ["owner", "avatar_url"], file)}
                username={R.pathOr("username", ["owner", "login"], file)}
                date={R.pathOr("N/A", [], date)}
                time={R.pathOr("N/A", [], time)}
                starLoading={R.pathOr(false, [], starLoading)}
                forkLoading={R.pathOr(false, [], forkLoading)}
                handleStar={handleStar}
                handleGistFork={handleGistFork}
              />
            );
          }, data)}
        </tbody>
      </table>
    </div>
  );
};

export default ListTableView;

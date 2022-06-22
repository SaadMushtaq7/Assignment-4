import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as R from "ramda";
import {
  userDeleteFile,
  userDeleteRawData,
  userSetRawData,
  setStarredRawData,
  deleteStarFiles,
  deleteStarredRawData,
} from "../../redux/actions/filesActions";
import { fetchGistRaw, deleteGist } from "../../services/gistCRUD";
import { isSomething } from "../../services/isSomething";
import { unStarGist } from "../../services/gistActions";
import NavBar from "../../components/NavBar";
import Spinner from "../../components/Spinner";
import UserInfo from "./components/UserInfo";
import GistCard from "./components/GistCard";
import "react-toastify/dist/ReactToastify.css";
import "./gistList.css";

const GistList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { filesType } = location.state;

  const mapIndexed = R.addIndex(R.map);

  const [deleteCheck, setDeleteCheck] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [rawError, setRawError] = useState(null);
  const [files, setFiles] = useState([]);
  const [rawFiles, setRawFiles] = useState([]);
  const user = useSelector((state) => state.userProfile.user);
  const userFiles = useSelector((state) => state.alluserfiles.files || []);
  const rawUserFiles = useSelector((state) => state.allrawfiles.payload || []);
  const starFiles = useSelector((state) => state.starfiles.files || []);
  const rawStarFiles = useSelector(
    (state) => state.allstarrawfiles.payload || []
  );

  const [searchedData, setSearchedData] = useState(files);

  const handleFetchGistRaw = useCallback(
    async (data) => {
      const tempArr = [];
      for (let i = 0; i < data.length; i++) {
        const file_name = Object.keys(data[i].files)[0];
        const temp = data[i].files[file_name]["raw_url"];
        const res = await fetchGistRaw(temp);
        if (res.status === 200) {
          tempArr.push(res.data);
        } else {
          setRawError(res);
        }
      }
      if (filesType === "userGists") {
        dispatch(userSetRawData(tempArr));
      } else if (filesType === "starGists") {
        dispatch(setStarredRawData(tempArr));
      }
    },
    [dispatch, filesType]
  );

  const handleDeleteGist = async (file, index) => {
    if (filesType === "starGists") {
      const res = await unStarGist(file.id);
      if (res === 204) {
        dispatch(deleteStarFiles(file));
        dispatch(deleteStarredRawData(index));
        toast.info("File removed from favourites!");
        setDeleteCheck(true);
      } else {
        toast.error("Unable to remove from favourite!");
      }
    } else if (filesType === "userGists") {
      const res = await deleteGist(file.id);
      if (res === 204) {
        dispatch(userDeleteFile(file));
        dispatch(userDeleteRawData(index));
        toast.info("File Deleted!");
        setDeleteCheck(true);
      } else {
        toast.error("Unable to delete file!");
      }
    }
  };

  const searchFiles = (e) => {
    e.preventDefault();
    let tempData = files;
    if (searchQuery) {
      tempData = R.filter((gist) => searchQuery === gist.id, files);
    }
    setSearchedData(tempData);
  };

  useEffect(() => {
    if (!deleteCheck) {
      if (files) {
        handleFetchGistRaw(files);
      } else {
        setError("404");
      }
    } else {
      setDeleteCheck(false);
    }
    if (filesType === "userGists") {
      setFiles(userFiles);
      setRawFiles(rawUserFiles);
    } else if (filesType === "starGists") {
      setFiles(starFiles);
      setRawFiles(rawStarFiles);
    }
    setSearchedData(files);
  }, [
    files.length,
    filesType,
    userFiles.length,
    starFiles.length,
    rawUserFiles.length,
    rawStarFiles.length,
  ]);
  return (
    <div className="users-gist-container">
      <NavBar
        user={R.pathOr(null, [], user)}
        setSearchQuery={setSearchQuery}
        searchFiles={searchFiles}
      />
      {user && (
        <div className="container">
          <div className="row user-and-files">
            <UserInfo
              avatar={user.photos[0].value}
              user={R.pathOr(null, [], user)}
            />
            <div className="col files">
              {isSomething(searchedData) &&
                mapIndexed((file, index) => {
                  const file_name = Object.keys(file.files)[0];
                  const [, fTime] = file.created_at.split("T");
                  const [time] = fTime.split("Z");

                  return (
                    <GistCard
                      key={file.id}
                      file={R.pathOr(null, [], file)}
                      filename={R.pathOr("filename", [], file_name)}
                      time={R.pathOr("N/A", [], time)}
                      index={R.pathOr(0, [], index)}
                      handleDeleteGist={handleDeleteGist}
                      rawFiles={R.pathOr([], [], rawFiles)}
                      rawError={R.pathOr(null, [], rawError)}
                      filesType={R.pathOr("starGists", [], filesType)}
                    />
                  );
                }, searchedData)}
              {!isSomething(searchedData) && (
                <Spinner error={R.pathOr(null, [], error)} />
              )}
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default GistList;

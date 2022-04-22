import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "./NavBar";
import Spinner from "./Spinner";
import {
  userSetFiles,
  userSetRawData,
  userDeleteFile,
} from "../redux/actions/filesActions";
import "react-toastify/dist/ReactToastify.css";
import "../styles/user-gist.css";

export default function UserGists() {
  const location = useLocation();
  const { user } = location.state;

  const [deleteCheck, setDeleteCheck] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [rawError, setRawError] = useState(null);

  const dispatch = useDispatch();

  const files = useSelector((state) => state.alluserfiles.files || []);
  const rawFiles = useSelector((state) => state.allrawfiles.payload || []);

  const [searchedData, setSearchedData] = useState(files);

  const fetchRawData = async (data) => {
    const tempArr = [];

    for (let i = 0; i < data.length; i++) {
      const tempFileName = Object.keys(data[i].files)[0];
      const tempData = data[i].files[tempFileName]["raw_url"];
      await axios
        .get(tempData)
        .then((res) => {
          tempArr.push(res.data);
        })
        .catch((err) => {
          console.log(`Error fetching raw data: ${err}`);
          setRawError(err);
        });
    }
    dispatch(userSetRawData(tempArr));
  };

  const getUserFiles = async () => {
    await axios
      .get(`https://api.github.com/gists`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_GIT_PAK}`,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          if (user.id === JSON.stringify(res.data[0].owner.id)) {
            dispatch(userSetFiles(res.data));
            fetchRawData(res.data);
          }
        }
      })
      .catch((error) => {
        console.log(`Error fetching data: ${error}`);
        setError(error);
      });
  };

  const deleteCurrentFile = async (file) => {
    await axios
      .delete(`https://api.github.com/gists/${file.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_GIT_PAK}`,
        },
      })
      .then((res) => {
        toast.info("File Deleted!");
        dispatch(userDeleteFile(file));
        setDeleteCheck(true);
      })
      .catch((error) => {
        console.log(`Error Deleting data: ${error}`);
        toast.error("Unable to delete file!");
      });
  };

  const searchFiles = (e) => {
    e.preventDefault();
    let tempData = files;
    if (searchQuery) {
      tempData = files.filter((file) =>
        file.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setSearchedData(tempData);
  };

  useEffect(() => {
    if (!deleteCheck) {
      getUserFiles();
    } else {
      setDeleteCheck(false);
    }
    setSearchedData(files);
  }, [files.length]);

  return (
    <div className="users-gist-container">
      <NavBar
        user={user}
        setSearchQuery={setSearchQuery}
        searchFiles={searchFiles}
      />
      {user ? (
        <div className="container">
          <div className="row user-and-files">
            <div className="col-4 user">
              <img src={user.photos[0].value} alt="user" />
              <h4>{user.username}</h4>

              <button className="btn btn-light px-2">
                <a
                  style={{ textDecoration: "none", color: "#1D80FF" }}
                  href={user.profileUrl}
                >
                  View Github Profile
                </a>
              </button>
            </div>
            <div className="col files">
              {searchedData ? (
                searchedData.map((file, idx) => {
                  const file_name = Object.keys(file.files)[0];
                  const [, fTime] = file.created_at.split("T");
                  const [time] = fTime.split("Z");

                  return (
                    <div key={file.id} className="single-files">
                      <div className="user-gist-page-header">
                        <div className="user-gist-page-user">
                          <img
                            src={file.owner.avatar_url}
                            className="card-img-top"
                            alt="User"
                          />
                          <div className="card-body">
                            <h5 className="card-title">
                              {file.owner.login}/
                              <span className="card-filename">{file_name}</span>
                            </h5>
                            <p className="card-time">{time}</p>
                            <p className="card-source">Broadcast Server</p>
                          </div>
                        </div>
                        <div className="user-gist-page-action">
                          <Link
                            to="/editgist"
                            state={{ file: file, user: user }}
                            style={{ textDecoration: "none" }}
                          >
                            <div className="action">
                              <i className="fa-solid fa-pen-to-square" />
                              Edit
                            </div>
                          </Link>
                          <div
                            className="action"
                            onClick={() => {
                              deleteCurrentFile(file);
                            }}
                          >
                            <i className="fa-solid fa-trash-can" />
                            Delete
                          </div>

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
                        {rawFiles.length > 0 ? (
                          <textarea
                            rows="12"
                            cols="90"
                            value={rawFiles[idx]}
                            disabled={true}
                          />
                        ) : (
                          <Spinner error={rawError} />
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <Spinner error={error} />
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
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
}

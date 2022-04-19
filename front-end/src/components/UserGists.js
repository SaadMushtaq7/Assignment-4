import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
//import useSWR from "swr";
//import { getUserFiles } from "../ApiCalls";
import {
  userSetFiles,
  userSetRawData,
  userDeleteFile,
} from "../redux/actions/filesActions";
import NavBar from "./NavBar";
import Spinner from "./Spinner";
import "../styles/user-gist.css";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserGists() {
  const [deleteCheck, setDeleteCheck] = useState(false);
  const gitPAT = `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`;
  const location = useLocation();
  const user = location.state;

  const dispatch = useDispatch();

  const files = useSelector((state) =>
    state.alluserfiles.files ? state.alluserfiles.files : []
  );
  const rawFiles = useSelector((state) =>
    state.allrawfiles.payload ? state.allrawfiles.payload : []
  );
  const fetchRawData = async () => {
    const tempArr = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const tempFileName = Object.keys(files[i].files)[0];
        const tempData = files[i].files[tempFileName]["raw_url"];
        await axios
          .get(tempData)
          .then((res) => {
            tempArr.push(res.data);
          })
          .catch((err) => {
            console.log(`Error fetching data: ${err}`);
          });
      }
      dispatch(userSetRawData(tempArr));
    }
  };

  const getUserFiles = async () => {
    await axios
      .get(`https://api.github.com/gists`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${gitPAT}`,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          if (user.id === JSON.stringify(res.data[0].owner.id)) {
            dispatch(userSetFiles(res.data));
          }
        }
      })
      .catch((error) => {
        console.log(`Error fetching data: ${error}`);
      });
  };

  const deleteCurrentFile = async (file) => {
    await axios
      .delete(`https://api.github.com/gists/${file.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${gitPAT}`,
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

  useEffect(() => {
    if (!deleteCheck) {
      getUserFiles();
      fetchRawData();
    } else {
      fetchRawData();
      setDeleteCheck(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files.length]);

  return (
    <div className="users-gist-container">
      <NavBar user={user} />
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
              {files ? (
                files.map((file, idx) => {
                  const file_name = Object.keys(file.files)[0];
                  const [, fTime] = file.created_at.split("T");
                  const time = fTime.split("Z");
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
                              {file.owner.login.length > 9
                                ? file.owner.login.slice(0, 9) + "..."
                                : file.owner.login}
                              /
                              <span className="card-filename">
                                {file_name.length > 7
                                  ? file_name.slice(0, 7) + "..."
                                  : file_name}
                              </span>
                            </h5>
                            <p className="card-time">{time}</p>
                            <p className="card-source">Broadcast Server</p>
                          </div>
                        </div>
                        <div className="user-gist-page-action">
                          <Link
                            to="/editgist"
                            state={[file, user]}
                            style={{ textDecoration: "none" }}
                          >
                            <div className="action">
                              <i className="fa-solid fa-pen-to-square" />
                              Edit
                            </div>
                          </Link>
                          <div
                            className="action"
                            onClick={(e) => {
                              e.stopPropagation();
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
                          <Spinner />
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <Spinner />
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

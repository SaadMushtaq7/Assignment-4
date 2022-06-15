import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "./NavBar";
import { userEditFile, userEditRawData } from "../redux/actions/filesActions";
import "react-toastify/dist/ReactToastify.css";

export default function EditGistFile() {
  const location = useLocation();
  const { file, index } = location.state;
  console.log(location.state);
  const user = useSelector((state) => state.userProfile.files);
  const rawFiles = useSelector((state) => state.allrawfiles.payload || []);

  const [desc, setDesc] = useState(file.description);
  const [fileName, setFileName] = useState(Object.keys(file.files)[0]);
  const [fileContent, setFileContent] = useState("");

  const dispatch = useDispatch();

  const handleUpdate = () => {
    const stateRawFile = {
      index: index,
      fileContent: fileContent,
    };
    dispatch(userEditRawData(stateRawFile));
    const tempFile = { [fileName]: { content: fileContent } };
    axios
      .patch(
        `https://api.github.com/gists/${file.id}`,
        { files: tempFile, description: desc },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_GIT_PAK}`,
          },
        }
      )
      .then((res) => {
        dispatch(userEditFile(res.data));

        toast.success("File Updated Successfully!");
      })
      .catch((err) => {
        console.log(`Error Updating data: ${err}`);
        toast.error("Failed to update");
        return;
      });
  };

  useEffect(() => {
    setFileContent(rawFiles[index]);
  }, [index, rawFiles]);
  return (
    <>
      <NavBar user={user} />
      <div className="create-gist-file-container">
        <div className="add-form">
          <div className="description">
            <input
              placeholder="Enter gist description..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="filename">
            <input
              placeholder="Enter file name..."
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          <div className="filecontent">
            <textarea
              placeholder="Enter file content..."
              rows="15"
              cols="130"
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
            />
          </div>
        </div>
        <div className="btn-action">
          <button className="btn btn-success">Add File</button>
          <button className="btn btn-success" onClick={handleUpdate}>
            Update Gist
          </button>
        </div>
      </div>
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
    </>
  );
}

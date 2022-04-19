import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { userEditFile } from "../redux/actions/filesActions";
import NavBar from "./NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditGistFile() {
  const gitPAT = `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`;
  const location = useLocation();
  const stateData = location.state;
  const user = stateData[1];
  const file = stateData[0];
  const [desc, setDesc] = useState(file.description);
  const [fileName, setFileName] = useState(Object.keys(file.files)[0]);
  const [fileContent, setFileContent] = useState("");

  const dispatch = useDispatch();
  const handleUpdate = () => {
    const tempFile = {};
    const fileData = {};
    fileData["content"] = fileContent;
    tempFile[fileName] = fileData;
    axios
      .patch(
        `https://api.github.com/gists/${file.id}`,
        { files: tempFile, description: desc },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gitPAT}`,
          },
        }
      )
      .then((res) => {
        dispatch(userEditFile(res.data));
      })
      .catch((err) => {
        console.log(`Error Updating data: ${err}`);
        toast.error("Failed to update");
      })
      .finally(() => {
        toast.success("File Updated Successfully!");
      });
  };
  useEffect(() => {
    const tempData = file.files[fileName]["raw_url"];
    axios
      .get(tempData)
      .then((res) => {
        setFileContent(res.data);
      })
      .catch((err) => console.log(`Error fetching data: ${err}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

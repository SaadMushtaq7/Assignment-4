import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "./NavBar";
import "react-toastify/dist/ReactToastify.css";
import "../styles/create-gist-file.css";

export default function CreateGistFile() {
  const location = useLocation();
  const { user: currentUser } = location.state;

  const [desc, setDesc] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");

  const createGist = () => {
    if (desc !== "" && fileName !== "" && fileContent !== "") {
      const file = { [fileName]: { content: fileContent } };
      axios
        .post(
          "https://api.github.com/gists",
          { files: file, description: desc },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_GIT_PAK}`,
            },
          }
        )
        .then((res) => {
          toast.success("File Added Successfully!");
          setDesc("");
          setFileContent("");
          setFileName("");
        })
        .catch((error) => {
          console.log(`Error adding data: ${error}`);
          toast.error("Failed to save data!");
        });
    } else {
      toast.error("Form not completely filled!");
    }
  };

  return (
    <>
      <NavBar user={currentUser} />
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
          <button className="btn btn-success" onClick={createGist}>
            Create Gist
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

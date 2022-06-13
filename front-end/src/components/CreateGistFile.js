import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import NavBar from "./NavBar";
import "react-toastify/dist/ReactToastify.css";
import "../styles/create-gist-file.css";

export default function CreateGistFile() {
  const location = useLocation();
  const { user: currentUser } = location.state;

  const formik = useFormik({
    initialValues: {
      description: "",
      fileName: "",
      fileContent: "",
    },
    onSubmit: () => {
      const file = {
        [formik.values.fileName]: { content: formik.values.fileContent },
      };
      axios
        .post(
          "https://api.github.com/gists",
          { files: file, description: formik.values.description },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_GIT_PAK}`,
            },
          }
        )
        .then((res) => {
          toast.success("File Added Successfully!");
          formik.setFieldValue("description", "");
          formik.setFieldValue("fileName", "");
          formik.setFieldValue("fileContent", "");
        })
        .catch((error) => {
          console.log(`Error adding data: ${error}`);
          toast.error("Failed to save data!");
        });
    },
  });

  return (
    <>
      <NavBar user={currentUser} />
      <form onSubmit={formik.handleSubmit}>
        <div className="create-gist-file-container">
          <div className="add-form">
            <div className="description">
              <input
                name="description"
                placeholder="Enter gist description..."
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </div>
            <div className="filename">
              <input
                name="fileName"
                placeholder="Enter file name..."
                value={formik.values.fileName}
                onChange={formik.handleChange}
              />
            </div>
            <div className="filecontent">
              <textarea
                name="fileContent"
                placeholder="Enter file content..."
                rows="15"
                cols="130"
                value={formik.values.fileContent}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="btn-action">
            <button className="btn btn-success">Add File</button>
            <button type="submit" className="btn btn-success">
              Create Gist
            </button>
          </div>
        </div>
      </form>
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

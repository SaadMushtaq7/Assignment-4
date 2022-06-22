import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as R from "ramda";
import {
  userEditFile,
  userEditRawData,
} from "../../redux/actions/filesActions";
import { createGist, updateGist } from "../../services/gistCRUD";
import NavBar from "../../components/NavBar";
import ActionGistBody from "./components/ActionGistBody";
import "react-toastify/dist/ReactToastify.css";
import "./gistAction.css";

const GistActions = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { file: currentFile, index } = location.state || {
    currentFile: null,
    index: null,
  };

  const user = useSelector((state) => state.userProfile.user);
  const rawFiles = useSelector((state) => state.allrawfiles.payload || []);

  const [buttonText, setButtonText] = useState("");

  const formik = useFormik({
    initialValues: {
      description: currentFile ? currentFile.description : "",
      fileName: currentFile ? Object.keys(currentFile.files)[0] : "",
      fileContent: currentFile ? rawFiles[index] : "",
    },
    onSubmit: () => {
      if (currentFile) {
        handleUpdateGist(
          formik.values.fileContent,
          formik.values.fileName,
          formik.values.description
        );
      } else {
        handleCreateGist(
          formik.values.fileName,
          formik.values.fileContent,
          formik.values.description
        );
      }
    },
  });

  const handleCreateGist = async (fileName, fileContent, description) => {
    const file = { [fileName]: { content: fileContent } };

    const res = await createGist(file, description);
    if (res === 201) {
      toast.success("File Added Successfully!");
      formik.setFieldValue("description", "");
      formik.setFieldValue("fileName", "");
      formik.setFieldValue("fileContent", "");
    } else {
      toast.error("Failed to save data!");
    }
  };

  const handleUpdateGist = async (fileContent, fileName, desc) => {
    const stateRawFile = {
      index: index,
      fileContent: fileContent,
    };

    const tempFile = { [fileName]: { content: fileContent } };
    const res = await updateGist(tempFile, desc, currentFile.id);

    if (res) {
      dispatch(userEditFile(res));
      dispatch(userEditRawData(stateRawFile));
      toast.success("File Updated Successfully!");
    } else {
      toast.error("Failed to update");
    }
  };

  useEffect(() => {
    if (currentFile) {
      setButtonText("Update Gist");
    } else {
      setButtonText("Create Gist");
    }
  }, [currentFile]);

  return (
    <>
      <NavBar user={R.pathOr(null, [], user)} />

      <ActionGistBody
        handleSubmit={formik.handleSubmit}
        description={R.pathOr("", ["values", "description"], formik)}
        handleChange={formik.handleChange}
        fileName={R.pathOr("", ["values", "fileName"], formik)}
        fileContent={R.pathOr("", ["values", "fileContent"], formik)}
        buttonText={R.pathOr("Submit", [], buttonText)}
      />

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
};

export default GistActions;

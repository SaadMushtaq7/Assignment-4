import { useState } from "react";
import axios from "axios";

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const axiosAction = ({ url, method, headerCheck = false, body = null }) => {
    setLoading(true);
    axios
      .request({
        method: method,
        url: url,
        headers: headerCheck
          ? {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_GIT_PAK}`,
            }
          : null,
        data: body,
      })
      .then((res) => {
        setResponse(res);
        console.log(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));

    return { response, loading, error };
  };
  return axiosAction;
};

export default useAxios;

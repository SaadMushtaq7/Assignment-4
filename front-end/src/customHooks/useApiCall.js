import { useEffect, useState } from "react";
import axios from "axios";

const useApiCall = ({ url, method, headerCheck = false, body = null }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    url &&
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
          setData(res.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => setLoading(false));
  }, [body, headerCheck, url, method]);
  return { data, loading, error };
};

export default useApiCall;

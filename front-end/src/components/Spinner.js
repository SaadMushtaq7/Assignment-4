import React, { useEffect, useState } from "react";
import loading from "../loading.gif";
import "../styles/spinner.css";
export default function Spinner() {
  const [timer, setTimer] = useState(true);

  useEffect(() => {
    if (timer) {
      setTimeout(() => {
        setTimer(false);
      }, [10000]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="spinner-container">
      {timer ? (
        <img src={loading} alt="loading" />
      ) : (
        <h2>
          Data not found <i className="fa-solid fa-circle-exclamation"></i>
        </h2>
      )}
    </div>
  );
}

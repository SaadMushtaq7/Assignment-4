//import React, { useEffect, useState } from "react";
import loading from "../loading.gif";
import "../styles/spinner.css";
export default function Spinner() {
  /*  const [timer, setTimer] = useState(true);

  useEffect(() => {
    if (timer) {
      setTimeout(() => {
        setTimer(false);
      }, [10000]);
    }
  }, []);
*/
  return (
    <div className="spinner-container">
      <img src={loading} alt="loading" />
      {/*timer ? (
        <img src={loading} alt="loading" />
      ) : (
        <h2>
          Data not found <i className="fa-solid fa-circle-exclamation"></i>
        </h2>
      )*/}
    </div>
  );
}

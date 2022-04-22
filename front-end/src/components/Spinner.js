import loading from "../loading.gif";
import "../styles/spinner.css";

export default function Spinner({ error }) {
  return (
    <div className="spinner-container">
      {!error ? (
        <img src={loading} alt="loading" />
      ) : (
        <h2>
          Data not found <i className="fa-solid fa-circle-exclamation"></i>
        </h2>
      )}
    </div>
  );
}

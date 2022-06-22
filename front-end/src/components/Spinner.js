import loading from "../loading.gif";
import "../styles/spinner.css";

const Spinner = ({ error }) => {
  return (
    <div className="spinner-container">
      {error ? (
        <h2>
          Data not found <i className="fa-solid fa-circle-exclamation"></i>
        </h2>
      ) : (
        <img src={loading} alt="loading" />
      )}
    </div>
  );
};

export default Spinner;

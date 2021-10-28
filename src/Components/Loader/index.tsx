import { FC } from "react";
import "./loader.scss";

const Loader: FC = () => {
  return (
    <div className="loader__main">
      <i className="fas fa-circle-notch fa-spin"></i>
    </div>
  );
};

export default Loader;

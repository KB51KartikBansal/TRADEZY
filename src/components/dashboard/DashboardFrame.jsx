import { useNavigate } from "react-router-dom";
import { logger } from "../../utils/logger";

const DashboardFrame = ({ color, title, no,hoverStatus }) => {
  let navigate = useNavigate();

  const showDetails = () => {
    logger.info("dashboard Frame is clicked ");
    switch (title) {
      case "Open Trades":
        navigate("/open-trade");
        break;
      case "Closed Trades":
        navigate("/close-trade");
        break;
      case "Winning Trades":
        navigate("/winning-trade");
        break;
      case "Losing Trade":
        navigate("/losing-trade");
        break;
      default:
        navigate("/");
    }
  };
  return (
    <div
    data-testid="frame"
      className={`col-lg-4 col-md-5 col-sm-5 col-10 m-2 p-2 border rounded shadow rounded text-wrap text-center ${hoverStatus}`}
      style={{ background:`${color}`, minWidth: "150px" }}
      onClick={(e) => showDetails()}
    >
      <p>{title}</p>
      <p>{Math.round(no)}</p>
    </div>
  );
};

export default DashboardFrame;

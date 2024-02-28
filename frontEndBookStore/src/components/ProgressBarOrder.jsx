import ProgressBar from "react-bootstrap/ProgressBar";

function ProgressBarOrder({ now }) {
  return <ProgressBar now={now} label={`${now}%`} />;
}
export default ProgressBarOrder;

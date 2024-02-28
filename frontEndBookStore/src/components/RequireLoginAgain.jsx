import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function AlertDismissibleExample() {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You are not logged in!</Alert.Heading>
        <p>If you want to order a book , you should log in!</p>
      </Alert>
    );
  }
  return <div></div>;
}

export default AlertDismissibleExample;

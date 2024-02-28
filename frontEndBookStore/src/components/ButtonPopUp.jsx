import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ButtonPopUp({ isLoggedIn, handleLogin, bookInfo }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const addToCart = async () => {
    try {
      const currentUser = await handleLogin();
      const userId = currentUser.id;
      const bookId = bookInfo.id;
      const jwt = localStorage.getItem("jwtToken");

      const response = await axios.post(
        `http://localhost:8080/addBook/${userId}/${bookId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // If you need to do something with the response, uncomment the following lines
      // console.log("Response status:", response.status);
      // console.log("Response data:", response.data);
      // console.log("Response headers:", response.headers);
    } catch (error) {
      console.error(error);
    }
  };


  const handleShow = () => {
    addToCart();
    setShow(true);
  };

  return (
    <>
      <Button disabled={!isLoggedIn} variant="primary" onClick={handleShow}>
        Add To Cart
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>You have added it to the cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Would you like to continue shopping or go to the cart ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Continue
          </Button>
          <a href="/cart">
            <Button variant="primary">Go to Cart</Button>
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ButtonPopUp;

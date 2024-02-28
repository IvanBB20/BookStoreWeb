import axios from "axios";
import React, { useEffect, useId, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import BookOrderCart from "./BookOrderCart";
import Button from "react-bootstrap/Button";
import ProgressBarOrder from "./ProgressBarOrder.jsx";
import { useNavigate } from "react-router-dom";
import TabsInfo from "./TabsInfo.jsx";
import Alert from "react-bootstrap/Alert";

export default function Cart({ handleLogin }) {
  const [books, setBooks] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isVisibleProgressBar, setIsVisibleProgressBar] = useState(false);
  const [myAlert, setMyAlert] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [disableButton, setDisabledButton] = useState(false);
  const [finished, setFinished] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await handleLogin();
        if (!response) {
          setMyAlert(true);
          return;
        }
        const jwt = localStorage.getItem("jwtToken");
        const ordersResponse = await axios.get(
          `http://localhost:8080/showOrders/${response.id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (ordersResponse.status === 200 && ordersResponse.data.length > 0) {
          setBooks(ordersResponse.data);
          setDisabledButton(false);
          setIsCartEmpty(false);
        } else {
          setBooks([]);
          setIsCartEmpty(true);
          setDisabledButton(true);
        }
      } catch (error) {
        console.error(error);
        setBooks([]);
        setFinished(false);
        setIsCartEmpty(true);
        setDisabledButton(true);
      }
    };

    fetchData();
  }, []);

  const styleCart = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "space-between",
  };
  const styleButton = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  };

  useEffect(() => {
    if (!isVisibleProgressBar) {
      return;
    }
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + 10;

        if (nextProgress >= 100) {
          clearInterval(interval);
          handleLogin().then((response) => {
            console.log(response);
            const jwt = localStorage.getItem("jwtToken");
            axios
              .delete(`http://localhost:8080/deleteOrder/${response.id}`, {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                },
              })
              .then((response) => {
                console.log(response);
                setFinished(true);
              });
          });
          return 100;
        }
        return nextProgress;
      });
    }, 2500);

    return () => {
      //  console.log("Cleaning up");
      clearInterval(interval);
      const jwt = localStorage.getItem("jwtToken");
    };
  }, [isVisibleProgressBar]);

  useEffect(() => {
    if (books.length === 0) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [books]);
  const showProgressBar = () => {
    if (isVisibleProgressBar) {
      return <ProgressBarOrder now={progress}></ProgressBarOrder>;
    }

    return <div></div>;
  };

  return (
    <div
      style={{ backgroundColor: "#AAC2E4", height: "100vh", width: "100vw" }}
    >
      {myAlert && (
        <Alert variant="danger">
          Please go and <Alert.Link href="/login"> log in !</Alert.Link>
        </Alert>
      )}
      <div style={styleCart}>
        {!isVisibleProgressBar &&
          books.map((book) => (
            <BookOrderCart
              key={uuidv4()}
              bookInfo={book}
              handleLogin={handleLogin}
              setBooks={setBooks}
            ></BookOrderCart>
          ))}
      </div>

      {isCartEmpty && (
        <Alert variant="info">
          Oppps ... Your cart is empty..{" "}
          <Alert.Link href="/books">
            {" "}
            click here if you want to order some books!
          </Alert.Link>
        </Alert>
      )}
      <div style={styleButton}>
        {!isVisibleProgressBar && (
          <Button
            onClick={() => {
              setIsVisibleProgressBar(true);
            }}
            variant="info"
            disabled={disableButton}
          >
            Press to buy Your Order of Books
          </Button>
        )}
      </div>
      {showProgressBar()}
      {finished && (
        <Alert variant="success">
          Books are ordered{" "}
          <Alert.Link href="/books">
            {" "}
            click here if you want to check out more books!
          </Alert.Link>
        </Alert>
      )}
    </div>
  );
}

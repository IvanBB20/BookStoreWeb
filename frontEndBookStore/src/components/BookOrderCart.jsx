import React, { useEffect } from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function BookOrderCart({ bookInfo, handleLogin, setBooks }) {
  const greyishStyle = {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    margin: "3px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid",

    width: "250px",
  };

  const deleteById = async (id) => {
    try {
      const response = await handleLogin();
      const userId = response.id;
      const jwt = localStorage.getItem("jwtToken");

      console.log("User ID:", userId);

      const deleteResponse = await axios.delete(
        `http://localhost:8080/deleteBook/${userId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("Delete response:", deleteResponse);

      if (deleteResponse && deleteResponse.data && deleteResponse.data.orders) {
        setBooks(deleteResponse.data.orders);
        return deleteResponse.data.orders;
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div>
      <div style={greyishStyle}>
        <Button
          onClick={() => {
            deleteById(bookInfo.id);
          }}
          variant="light"
        >
          ❎
        </Button>{" "}
        <Image src={bookInfo.url} height={95} width={85} rounded></Image>
        <div>{bookInfo.title}</div>
        <div>{bookInfo.price}$</div>
      </div>
    </div>
  );
}

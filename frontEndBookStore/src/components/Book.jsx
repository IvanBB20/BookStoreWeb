import React from "react";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';
import ButtonPopUp from "./ButtonPopUp";


export default function Book({ bookInfo, isLoggedIn , handleLogin}) {
  const greyishStyle = {


    backgroundImage: `url(https://t4.ftcdn.net/jpg/02/61/49/05/360_F_261490536_nJ5LSRAVZA0CK9Nvt2E1fXJVUfpiqvhT.jpg)`,
    //backgroundColor: "#f0f0f0",
    padding: "20px",
    margin: "3px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "2px solid",
    width: "250px",
  };

  return (
    <div>
      <div style={greyishStyle}>
        <Image src={bookInfo.url} height={155} width={115} rounded></Image>
        <div>{bookInfo.title}</div>
        <div>{bookInfo.price}$</div>
        {!isLoggedIn ?  <div></div> :  <ButtonPopUp isLoggedIn={isLoggedIn} handleLogin={handleLogin} bookInfo = {bookInfo} variant="success" >
          Add To Cart
        </ButtonPopUp>}
       
      </div>
    </div>
  );
}

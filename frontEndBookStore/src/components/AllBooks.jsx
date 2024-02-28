import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Book from "./Book";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CheckBox from "./CheckBox";

export default function AllBooks({ isLoggedIn, handleLogin, setIsLoggedIn }) {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ price: null, genre: null });

  var priceIdCount = 1;
  var genreIdCount = 1;
  const [checkbox, setCheckBox] = useState([
    {
      id: `${priceIdCount++}`,
      label: "1-15$",
      disabled: false,
      checked: false,
      value: { low: 1.0, high: 15.0 },
    },
    {
      id: `${priceIdCount++}`,
      label: "16-30$",
      disabled: false,
      checked: false,
      value: { low: 16.0, high: 30.0 },
    },
    {
      id: `${priceIdCount++}`,
      label: "31-45$",
      disabled: false,
      checked: false,
      value: { low: 31.0, high: 45.0 },
    },
    {
      id: `${priceIdCount++}`,
      label: "45+$",
      disabled: false,
      checked: false,
      value: { low: 45.0, high: 150.0 },
    },
    //------------------------------------------
    {
      id: `${priceIdCount + genreIdCount++}`,
      label: "Fantasy",
      disabled: false,
      checked: false,
      value: "Fantasy",
    },
    {
      id: `${priceIdCount + genreIdCount++}`,
      label: "Comedy",
      disabled: false,
      checked: false,
      value: "Comedy",
    },
    {
      id: `${priceIdCount + genreIdCount++}`,
      label: "Autobiography",
      disabled: false,
      checked: false,
      value: "Autobiography",
    },
    {
      id: `${priceIdCount + genreIdCount++}`,
      label: "Action",
      disabled: false,
      checked: false,
      value: "Action",
    },
  ]);

  const setPrice = (price) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: price,
    }));
  };

  const setGenre = (genre) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      genre: genre,
    }));
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/books");
      setBooks(response.data);
      const responseUser = await handleLogin();
      responseUser ? setIsLoggedIn(true) : setIsLoggedIn(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const alignBooks = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "flex-start",
    alignContent: "space-around",
    gap: "40px",
    marginLeft: "45px",
  };

  const shoppingCart = {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "35px",
  };

  const formatButtonsAndBooks = {
    display: "flex",
  };

  const buttonVariant = "info";
  const makeSideBarColumn = {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };

  useEffect(() => {
    const isPriceChecked = () => {
      for (var i = 0; i < priceIdCount - 1; i++) {
        if (checkbox[i].checked) {
          return checkbox[i];
        }
      }
      return null;
    };

    const isGenreChecked = () => {
      for (var i = priceIdCount - 1; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
          return checkbox[i];
        }
      }

      return null;
    };

    const arePriceAndGenreChecked = () => {
      var priceObj = isPriceChecked();
      var genreObj = isGenreChecked();

      if (priceObj && genreObj) {
        return { priceObj, genreObj };
      }
      return null;
    };

    axios.get("http://localhost:8080/books").then((response) => {
      const allBooks = response.data;

      if (checkbox === null) {
        return allBooks;
      }
      var filteredBooks = allBooks;

      var filterByPriceAndGenre = arePriceAndGenreChecked();

      var price = isPriceChecked();
      var genre = isGenreChecked();

      const predicateForGenre = (curBook) => {
        console.log(genre.value);
        return curBook.genre === genre.value;
      };

      const priceFilter = (low, high) => {
        const predicateForPrice = (curBook) => {
          return low <= curBook.price && high >= curBook.price;
        };

        return allBooks.filter(predicateForPrice);
      };

      if (filterByPriceAndGenre) {
        filteredBooks = priceFilter(price.value.low, price.value.high).filter(
          predicateForGenre
        );
      } else if (price) {
        filteredBooks = priceFilter(price.value.low, price.value.high);
      } else if (genre) {
        filteredBooks = allBooks.filter(predicateForGenre);
      }

      setBooks(filteredBooks);
    });
  }, [checkbox]);

  //https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png

  const backGroundStyle = {
    backgroundImage: `url(https://images.alphacoders.com/132/1326370.png)`,

    backgroundSize: "cover",
   // background-size: cover;
    backgroundRepeat: "no-repeat"
  };
  return (
    <div style={backGroundStyle}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <a href="/cart">
          <div style={{ fontSize: "45px" }}>🛒</div>
        </a>
      </div>

      <div style={formatButtonsAndBooks}>
        <div style={makeSideBarColumn}>
          <Button
            variant={buttonVariant}
            style={{height:"70px"}}
            onClick={async () => {
              // setCheckBox([]); // change later

              const updatedCheckBoxes = checkbox.map((cb) => ({
                ...cb,
                checked: false,
                disabled: false,
              }));
              const response = await axios.get("http://localhost:8080/books");
              setBooks(response.data);
              setCheckBox(updatedCheckBoxes);
            }}
          >
            ShowAll
          </Button>{" "}
          <div>Price:</div>
          {checkbox.map((cb) => (
            <CheckBox
              key={uuidv4()}
              id={cb.id}
              label={cb.label}
              disabled={cb.disabled}
              checked={cb.checked}
              setCheckBox={setCheckBox}
              priceIdCount={priceIdCount}
            ></CheckBox>
          ))}
        </div>

        <div style={alignBooks}>
          {books.map((book) => (
            <Book
              key={uuidv4()}
              bookInfo={book}
              isLoggedIn={isLoggedIn}
              handleLogin={handleLogin}
            ></Book>
          ))}
        </div>
      </div>
    </div>
  );
}

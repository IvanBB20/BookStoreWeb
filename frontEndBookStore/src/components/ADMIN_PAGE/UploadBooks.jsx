import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function UploadBooks() {
  const [curBook, setCurBook] = useState({});

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");

    const checkAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/me", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log(response);
        if (response && response.data.role.includes("ADMIN")) {
          const res = response.data.role.includes("ADMIN");
          console.log(res);
          setIsAdmin(res);
        } else {
          setIsAdmin(false);
        }

        console.log(isAdmin);
      } catch (err) {
        console.log(err);
      }
    };

    checkAdmin();
  }, []);

  const style = {
    display: "flex",
    gap: "20px",
    padding: "20px",
    justifyContent: "center",
    backgroundColor: "blue",
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/books",
        curBook,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      // setCurBook({});
    } catch (error) {
      alert("Error something went wrong");
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setCurBook({
      ...curBook,
      [e.target.name]: value,
    });
  };

  return (
    <div>
      { isAdmin &&
        <div style={style}>
          <Form
            onSubmit={handleSumbit}
            style={{
              display: "flex",
              gap: "20px",
              flexDirection: "column",
              margin: "20px",
            }}
          >
            <Form.Control
              name="title"
              onChange={handleChange}
              value={curBook.title}
              type="text"
              placeholder="Title"
            />
            <Form.Control
              name="author"
              onChange={handleChange}
              value={curBook.author}
              type="text"
              placeholder="Author"
            />
            <Form.Control
              name="genre"
              onChange={handleChange}
              value={curBook.genre}
              type="text"
              placeholder="Genre"
            />
            <Form.Control
              name="pages"
              onChange={handleChange}
              value={curBook.pages}
              type="text"
              placeholder="Pages"
            />
            <Form.Control
              name="url"
              onChange={handleChange}
              value={curBook.url}
              type="text"
              placeholder="Url"
            />
            <Form.Control
              name="price"
              onChange={handleChange}
              value={curBook.price}
              type="text"
              placeholder="Price"
            />

            <Button type="submit" variant="primary">
              {" "}
              Submit Book!{" "}
            </Button>
          </Form>
        </div>
      }
    </div>
  );
}

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ handleLogin }) {
  var navigate = useNavigate();

  const [webUser, setWebUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setWebUser({
      ...webUser,
      [e.target.name]: value,
    });
  };


  const handleSumbit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        webUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login response:", response);

      localStorage.setItem("jwtToken", response.data.jwt);
      navigate("/books");
    } catch (error) {
      console.error("Login error:", error);
      // Clear username and password fields in case of login failure
      setWebUser({
        ...webUser,
        username: "",
        password: "",
      });
    }
  };

  const backGroundStyle = {
    backgroundImage: `url(https://wallpapers.com/images/hd/colorful-abstract-background-rra8u4adw1ubypzl.jpg)`,
    height: "100vh",
    width: "100vw",
    backgroundSize: "cover",
    backgroundPositionX: "center" /* Add this line */,
    backgroundPositionY: "center",
    backgroundAttachment: "fixed",
  };
  return (
    <div style={backGroundStyle}>
      <Form onSubmit={handleSumbit}>
        <Row className="mt-1 justify-content-center">
          <Col sm={3}>
            <Form.Group className="mt-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="username"
                value={webUser.username}
                onChange={handleChange}
                name="username"
              ></Form.Control>
              <Form.Text className="text-muted"> </Form.Text>
            </Form.Group>

            <Form.Group className="mt-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                value={webUser.password}
                onChange={handleChange}
                name="password"
              ></Form.Control>
              <Form.Text className="text-muted"> </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

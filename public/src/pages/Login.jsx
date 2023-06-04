import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import { REACT_APP_LOCALHOST_KEY, toastOptions } from "../utils/config";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    console.log(123)
    if (localStorage.getItem(REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);
  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const validataForm = () => {
    const { username, passwrod } = user;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (passwrod === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (validataForm()) {
      const { username, password } = user;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
        navigate("/");
      }
    }
  };
  return (
    <>
      <FormContainer>
        <form
          action=""
          onSubmit={e => {
            handleSubmit(e);
          }}
        >
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>ChatRoom</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={e => {
              handleChange(e);
            }}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={e => {
              handleChange(e);
            }}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Register.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;

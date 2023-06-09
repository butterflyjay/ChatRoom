import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import { REACT_APP_LOCALHOST_KEY, toastOptions } from "../utils/config";

/**
 * 注册页面组件
 */
function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (localStorage.getItem(REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);
  /**
   * 注册信息校验
   */
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FromContainer>
        <form
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
          />
          <input
            type="emial"
            placeholder="Email"
            name="email"
            onChange={e => {
              handleChange(e);
            }}
            required="email"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={e => {
              handleChange(e);
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={e => {
              handleChange(e);
            }}
          />
          <button type="submit">Create User</button>
          <span>
            already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FromContainer>
      <ToastContainer />
    </>
  );
}
const FromContainer = styled.div`
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
    padding: 3rem 5rem;
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
      transition: 0.5s ease-in-out;
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
  }
`;
export default Register;

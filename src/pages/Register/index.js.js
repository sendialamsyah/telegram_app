import React, { useState } from "react";
import styles from "./register.module.css";
import Input from "../../components/base/Input";
import Button from "../../components/base/Button";
import Image from "../Login/image/Vector (2).png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_BACKEND}/user/register`, formRegister)
      .then(() => {
        alert("Register sucess");
        navigate('/login')
      })
      .catch((err) => {
        // console.log(err);
        alert("Register failed");
        
      });
  };
  return (
    <div className={styles.container}>
      <h5> Register </h5>
      <p>Let’s create your account!</p>
      <div className={styles.formWarpper}>
        <form onSubmit={handleRegister}>
          <h6>Name</h6>
          <Input
            type="text"
            name="name"
            value={formRegister.name}
            placeholder="Telegram App"
            onChange={handleChange}
          />
          <h6>Email</h6>
          <Input
            type="email"
            name="email"
            value={formRegister.email}
            placeholder="telegram@mail.com"
            onChange={handleChange}
          />
          <h6>Password</h6>
          <Input
            type="password"
            name="password"
            value={formRegister.password}
            placeholder="******"
            onChange={handleChange}
          />
          <br />
          <Button
            bgColor="#7E98DF"
            textColor="#FFFFFF"
            border="none"
            title="Register"
            type="submit"
          />
        </form>
        <div className={styles.loginWith}>
          <p>Register With</p>
          <hr className={styles.hr1} />
          <hr className={styles.hr2} />
        </div>
        <Button
          bgColor="#FFFFFF"
          textColor="#7E98DF"
          border="1px solid #7E98DF"
          src={Image}
          alt="img"
          title="Google"
        />
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import styles from "./login.module.css";
import Input from '../../components/base/Input'
import Button from "../../components/base/Button";
import Image from '../../assets/Vector (2).png'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import io from 'socket.io-client'
import swal from 'sweetalert'

const Login = ({setSocket}) => {
  const navigate = useNavigate()
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e) =>{
    setFormLogin({
      ...formLogin,
      [e.target.name] : e.target.value
    })
  }
  const handleLogin = (e) =>{
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_RAILWAY}/users/login`, formLogin)
    .then((res)=>{
      const respData = res.data.data
      // console.log(respData);
      localStorage.setItem('token', respData.token)
      localStorage.setItem('refreshToken', respData.refreshToken)
      const resultSocket = io('https://telegrambackend.up.railway.app', {
        query: {
          token: respData.token
        }
      })
      setSocket(resultSocket)
      swal({
        title: "Good job!",
        text: "Login Success",
        icon: "success",
        button: "Oke",
      });
      navigate('/chat')
    })
    .catch((err)=>{
      console.log(err)
      swal({
        title: "Login Failed",
        text: "wrong email or password",
        icon: "error",
        button: "Ok",
      });
    })
  }
  return (
    <div className={styles.container}>
      <h5>Login</h5>
      <p>Hi, Welcome back!</p>
      <div className={styles.formWarpper}>
        <form onSubmit={handleLogin}>
        <h6 htmlFor="email">Email</h6>
        <Input type='text' name='email' value={formLogin.email} placeholder='telegram@mail.com' onChange={handleChange} />
        <h6 htmlFor="password">Password</h6>
        <Input type='password' name='password' value={formLogin.password} placeholder='******' onChange={handleChange} />
        <p>Forgot Password?</p>
        <Button bgColor='#7E98DF' textColor='#FFFFFF' border='none' title='Login' type='submit'/>
        </form>
        <div className={styles.loginWith}>
        <p>Login With</p>
        <hr className={styles.hr1}/>
        <hr className={styles.hr2}/>
        </div>
        <Button bgColor='#FFFFFF' textColor='#7E98DF' border='1px solid #7E98DF' src={Image} alt='img' title='Google' />
      </div>
      <p className={styles.signUp}>
        Don’t have an account? <Link to='/register'><span>Sign Up</span></Link>
      </p>
    </div>
  );
};

export default Login;

// import Swal from "sweetalert2";
// import styled from "styled-components";
// import hotelIcon from "../icons/5-estrellas.png";
// import { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import colors from "../styles/colors";
// import { GeneralContext } from "../App";
// import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { userLogin, resetStatus } from "../features/login/loginSlice";
// import { getLoginStatus } from "../features/login/loginSlice";

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: white;
//   height: 100vh;
// `;
// const Image = styled.img`
//   margin-bottom: 10px;
//   height: 120px;
//   width: 120px;
// `;

// const Form = styled.form`
//   box-shadow: 0px 16px 30px #00000014;
//   text-align: center;
//   background-color: white;
//   padding: 25px 35px;
//   border-radius: 12px;
//   font-family: "Poppins", sans-serif;
//   font-size: 18px;
// `;

// const Label = styled.label`
//   display: block;
//   text-align: left;
//   margin-bottom: 5px;
// `;
// const Input = styled.input`
//   font-size: 18px;
//   padding: 5px;
//   margin-bottom: 30px;
//   border: none;
//   outline: none;
//   border-bottom: 2px solid ${colors.bottomBorderGray};
// `;
// const Button = styled.button`
//   display: block;
//   border: none;
//   border-radius: 8px;
//   font-family: "Poppins", sans-serif;
//   font-size: 18px;
//   padding: 10px 40px;
//   color: ${colors.hardGreen};
//   background: ${colors.lightGreen} 0% 0% no-repeat padding-box;
//   margin: 0 auto 30px;
//   &:hover {
//     color: ${colors.lightGreen};
//     background-color: ${colors.hardGreen};
//   }
// `;

// type Props = {
//   bold?: boolean;
// };

// const P = styled.p<Props>`
//   margin: 1px;
//   font-size: 12px;
//   font-weight: ${(props) => (props.bold ? "bold" : "normal")};
// `;

// const H1 = styled.h1`
//   color: black;
//   margin: 5px 0px 25px;
//   max-height: 35px;
//   font-size: 36px;
//   & span {
//     color: ${colors.red};
//     line-height: 30px;
//   }
// `;

// export const Login = () => {
//   const loginStatus = useAppSelector(getLoginStatus);
//   const Gcontext = useContext(GeneralContext);
//   const loginState = Gcontext.loginState;
//   const dispatchLogin = Gcontext.dispatchLogin;
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const [email, setEmail] = useState("email@prueba.com");
//   const [password, setPassword] = useState("12345");

//   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     dispatch(userLogin({ email: email, password: password }));
//   };

//   useEffect(() => {
//     if (loginState.authenticated === true) {
//       navigate("/");
//     } else {
//       navigate("/login");
//     }
//     if (loginStatus === "fulfilled") {
//       dispatchLogin({
//         type: "LOGIN",
//         payload: {
//           username:
//             JSON.parse(localStorage.getItem("logged") || "").username ||
//             "Default Username",
//           email:
//             JSON.parse(localStorage.getItem("logged") || "").email || email,
//           photo: "",
//         },
//       });
//       navigate("/");
//       dispatch(resetStatus());
//     } else if (loginStatus === "rejected") {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Invalid login: Check Email or Password",
//       });
//     }
//   }, [loginState, loginStatus]);

//   return (
//     <Container>
//       <Form onSubmit={handleSubmit}>
//         <Image src={hotelIcon} />

//         <H1>
//           travl <span>Login</span>
//         </H1>

//         <Label htmlFor="email">Email:</Label>
//         <Input
//         defaultValue={"email@email.com"}
//           onChange={handleEmailChange}
//           type="email"
//           name="email"
//           id="email"
//           required
//           autoComplete="on"
//           data-cy="email"
//         />
//         <Label htmlFor="password">Password:</Label>
//         <Input
//         defaultValue={"1234"}
//           onChange={handlePasswordChange}
//           type="password"
//           name="password"
//           id="password"
//           required
//           autoComplete="current-password"
//           data-cy="password"
//         />
//         <Button type="submit" data-cy="submit">
//           Login
//         </Button>
//         <P bold>To see the demo:</P>
//         <P>Mail: email@email.com</P>
//         <P>Password: 1234</P>
//       </Form>
//     </Container>
//   );
// };

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginThunk } from '../features/login/loginthunk';
// import { useNavigate } from 'react-router-dom';
// import {
//   LoginContainer,
//   LoginForm,
//   Title,
//   InputGroup,
//   Label,
//   Input,
//   Button,
//   ErrorMessage,
// } from './LoginStyled'; 

// export const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Hook de navegación
//   const { loginError, isAuthenticated } = useSelector((state) => state.login);

//   const [formData, setFormData] = useState({ username: '', password: '' });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Llama al loginThunk
//     dispatch(loginThunk(formData.username, formData.password));
//   };

//   // Redirige al usuario a la página principal si está autenticado
//   if (isAuthenticated) {
//     navigate('/');
//   }

//   return (
//     <LoginContainer>
//       <LoginForm onSubmit={handleSubmit}>
//         <Title>Inicia Sesión</Title>
//         {loginError && <ErrorMessage>{loginError}</ErrorMessage>}

//         <InputGroup>
//           <Label htmlFor="username">Nombre de usuario</Label>
//           <Input
//             type="text"
//             id="username"
//             name="username"
//             placeholder="Ingresa tu usuario"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </InputGroup>

//         <InputGroup>
//           <Label htmlFor="password">Contraseña</Label>
//           <Input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Ingresa tu contraseña"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </InputGroup>

//         <Button type="submit">Iniciar sesión</Button>
//         <div style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
//           <p><strong>Usuario:</strong> admin</p>
//           <p><strong>Contraseña:</strong> 12345</p>
//         </div>
//       </LoginForm>
//     </LoginContainer>
//   );
// };
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginThunk } from '../features/login/loginthunk';
import { RootState, AppDispatch } from '../app/store';
import { Button, LoginContainer, LoginForm, Title, InputGroup, Input, Label, ErrorMessage } from './LoginStyled';

interface FormData {
  username: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  // Obtén el estado de autenticación y el error de login
  const { loginError, isAuthenticated } = useSelector((state: RootState) => state.login);

  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk(formData.username, formData.password));
  };

  useEffect(() => {
    // Evitar redirección en caso de que isAuthenticated ya sea true
    if (isAuthenticated) {
      navigate('/');  // Redirige al dashboard
    }
  }, [isAuthenticated, navigate]);  // Dependencia solo de isAuthenticated

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Inicia Sesión</Title>
        {loginError && <ErrorMessage>{loginError}</ErrorMessage>}

        <InputGroup>
          <Label htmlFor="username">Nombre de usuario</Label>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="Ingresa tu usuario"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <Button type="submit">Iniciar sesión</Button>
        <div style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
          <p><strong>Usuario:</strong> admin</p>
          <p><strong>Contraseña:</strong> 12345</p>
        </div>
      </LoginForm>
    </LoginContainer>
  );
};

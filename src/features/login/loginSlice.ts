// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { ILoginInitialState, LoginInterface } from "../interfaces/interfaces";
// import { RootState } from "../../app/store";

// const urlBase = import.meta.env.VITE_API_URL+'/login';

// export const userLogin = createAsyncThunk('login/userLogin', async (data: LoginInterface) => {
//     try {
//         const response = (await fetch(urlBase, {
//             method: 'POST',
//             mode: 'cors',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 email: data.email,
//                 password: data.password
//             })
//         }));
//         if (!response.ok) {
//             throw new Error(`status: ${response.status}`)
//         } else {
//             const data = await response.json();
//             localStorage.setItem("token", data.token);
//         }

//     } catch (error) {
//         throw new Error('Login failed')
//     }
// })

// const initialState: ILoginInitialState = {
//     data: [],
//     status: 'idle',
//     error: null
// }


// const loginSlice = createSlice({
//     name: "login",
//     initialState,
//     reducers: {
//         resetStatus: (state) => {
//             state.status = 'idle';
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(userLogin.fulfilled, (state, action) => {
//                 state.status = 'fulfilled';
//                 state.error = null;
//             })
//             .addCase(userLogin.pending, (state, action) => {
//                 state.status = 'pending';
//                 state.error = null;
//             })
//             .addCase(userLogin.rejected, (state, action) => {
//                 state.status = 'rejected';
//                 state.error = 'true';
//             })
//     }

// });

// export default loginSlice.reducer;
// export const {resetStatus} = loginSlice.actions;
// export const getLoginStatus = (state:RootState) => state.login.status;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "false",
    currentUser: localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")!) : null,
    loginError: null,
};
  
  export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
      signIn(state, action) {
        state.isAuthenticated = true;
        state.currentUser = action.payload;
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
        state.loginError = null;
      },
      signOut(state) {
        state.isAuthenticated = false;
        state.currentUser = null;
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("currentUser");
        state.loginError = null;
      },
      setLoginError(state, action) {
        state.loginError = action.payload;
      },
    },
  });
  
  export const { signIn, signOut, setLoginError } = loginSlice.actions;
  export default loginSlice.reducer;
  

  


import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import Swal from "sweetalert2";

// export const loginAction = createAction('login', (data) => {

//     // const token = data; // Extrae el token del objeto de respuesta


//     // let usuario = {
//     //     // email: email,
//     //     // name: name,
//     //     data: token,
//     //     isLoggedIn: true
//     // }

//     // console.log(usuario);
//     // Guardar el token en el localStorage
//     localStorage.setItem('token', data); // Guardar el token directamente
//     return { payload: { token: data, isLoggedIn: true } }
// })


//http://localhost:8080/api/auth/current

// export const loadUser = createAsyncThunk("loadUser", async (_, { rejectWithValue }) => {




//     const token = localStorage.getItem("token");

//     try {
//         const response = await axios.get("http://localhost:8080/api/auth/current", {
//             headers: { Authorization: Bearer ${ token } },
// });
// return response.data;
//     } catch (error) {
//     return rejectWithValue(error.response ? error.response.data : "Unknown error");
// }
//   });//Trae al cliente autenticado.


export const loadUser = createAsyncThunk(
    "loadUser",
    async (_, { rejectWithValue }) => {



        try {

            const token = localStorage.getItem("token");

            console.log(token);

            if (token) {
                console.log("Token enviado en loadUser:", token);

            }
            const response = await axios.get(
                "http://localhost:8080/api/auth/current",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log(response.data);
            
            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response ? error.response.data : "Unknown error"
            );
        }
    }
);






export const logoutAction = createAction('logout', () => {
    // Remover el token del localStorage
    localStorage.removeItem('token');

    return {};
})
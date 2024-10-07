
import { createReducer } from "@reduxjs/toolkit"

import { address } from "framer-motion/client"
import { createAddress, loadUser, logoutAction } from "../actions/authAction"



const initialState = {
    user: {
        "id": 0,
        "firstName": "",
        "lastName": "",
        "email": "",
        "phoneNumbers": [
            "",
            ""
        ],
        "address": [
            {
                "id": 0,
                "nameStreet": "",
                "zipCode": "",
                "betweenStreets": "",
                "streetNumber": 0,
                "typeHome": "",
                "floorNumber": null,
                "apartmentNumber": null
            }
        ],
        "orders": [
            {
                "id": 0,
                "orderDate": "",
                "totalAmount": 0,
                "orderType": "",
                "orderStatusType": ""
            }
        ]

    },
    status: "idle",
    error: null,
    isLoggedIn: false

}

// const authenticationReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(loginAction, (state, action) => {
//             return {
//                 ...state,
//                 isLoggedIn: true,
//                 token: action.payload.token,
//                 status: "succeeded",
//                 loading: false,
//             }
//         })
//         // .addCase(loadUser, (state, action) => {
//         //     console.log("Usuario cargado:", action.payload);
//         //     const newState = {
//         //         ...state, // Mantenemos el estado anterior
//         //         isLoggedIn: true,
//         //         token: action.payload.token,  // Asignamos el nuevo token
//         //         email: action.payload.email,  // Asignamos el email del usuario
//         //         name: action.payload.name,    // Asignamos el nombre del usuario
//         //         // accounts: action.payload.accounts,  // Añadimos las cuentas al estado
//         //         // cards: action.payload.cards,
//         //         // loans: action.payload.loans,
//         //         phoneNumbers: action.payload.phoneNumbers,
//         //         orders: action.payload.orders,
//         //         address: action.payload.address,
//         //         status: "succeeded",          // La solicitud fue exitosa
//         //         loading: false,
//         //         // Ya no está cargando
//         //     };

//         //     console.log("Estado actualizado (fulfilled):", newState)

//         //     return newState
//         // })
//         .addCase(logoutAction, (state, action) => {
//             return {
//                 isLoggedIn: false,
//                 token: null,
//                 email: null,
//                 name: null,
//                 phoneNumbers: [],
//                 orders: [],
//                 address: [],
//                 status: "succeeded",
//                 loading: false,
//             }
//         })
// })


export const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loadUser.pending, (state) => {
            state.status = "loading";
        })
        .addCase(loadUser.fulfilled, (state, action) => {
            console.log(action.payload)
            
            return{
                ...state,
                user:action.payload,
                status:"success",
                isLoggedIn:true
            }
        })
        .addCase(loadUser.rejected, (state, action) => {

            return{
                ...state,
                status:"failed",
                error:action.payload
            }
        })

        .addCase(createAddress.fulfilled,(state,action)=>{
            console.log("Usuario cargado:", action.payload);
            return{
                ...state,
                address:action.payload.address,
                status:"success"
                

            }
        })
        .addCase(logoutAction, (state, action) => {

            return{
                ...state,
                status:"idle",
                user : initialState.user

            }
            // state.client = initialState.user

            

        })
})



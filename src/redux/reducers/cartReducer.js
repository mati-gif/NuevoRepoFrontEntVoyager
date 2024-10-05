import { createReducer } from "@reduxjs/toolkit";
import { saveCartProducts } from "../actions/cartActions";

const initialState = {
    productos:[
        
    

    ],
    status : "idle"
}

export const cartReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveCartProducts, (state,action) => {
            return{
                ...state,
                productos: action.payload,
                status : "success"

            }
        })})
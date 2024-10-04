import { createAction } from "@reduxjs/toolkit";

export const saveCartProducts = createAction("saveCartPorducts", (productos)=>{
    return {payload: productos}

})
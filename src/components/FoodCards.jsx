import React from "react";
import "../styles/foodCards.css";
import Button from "./Button";
import { Link } from "react-router-dom";

// Método para formatear los precios en USD
const formatPrice = (price) => {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const FoodCards = (props) => {
    return (
        <div className="card-container w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <div
                className="card rounded-[50px] border-2 border-yellow-300 bg-cover bg-center h-60"
                style={{
                    backgroundImage: `url(${props.backgroundImage})`,
                    backgroundClip: "border-box", // Asegura que la imagen y el borde se alineen.
                }}
            >
                <div className="card-front flex flex-col items-center justify-center rounded-[50px]">
                    <div className="h-full w-full flex flex-col items-center justify-center p-4">
                        <h3 id="textShadow" className="text-[40px] text-white text-center font-extrabold mb-2 border-b text-3d">
                            {props.name}
                        </h3>
                    </div>
                </div>
                <div className="card-back flex flex-col items-center gap-[10px] justify-center bg-white rounded-[50px] p-4">
                    <img src={props.typeIcon} alt="Category Icon" className="w-[50px] text-[#0F1D15]" />
                    <h3 className="text-[30px] text-[#0F1D15] font-bold">{props.name}</h3>
                    <p className="text-lg text text-center text-[#0F1D15]">{props.description}</p>
                    {/* Usamos el método formatPrice */}
                    <p className="text-red-500 text-xl font-bold">{formatPrice(props.price)}</p>
                    <div className="flex w-full justify-center gap-4 ">

                        <Button
                            text="Add to Cart"
                            backgroundColor="bg-[#E6BB4D]"
                            borderColor="border-[#0F1D15]"
                            arrowColor="text-[#0F1D15]"
                            onClick={props.onClick}

                        />
                        {/* <button className="  bg-[#E6BB4D] rounded-lg border-[#0F1D15] p-2 font-bold text-[#0F1D15] shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-out hover:bg-[#d4a639]">
                                Add to Cart
                            </button> */}

                        <Link to="/productDetails"> <div className=" bg-black text-yellow-500 px-[15px] py-[3px] rounded-lg  underline absolute top-2 right-6 text-xs text-center "><i class="fa-regular fa-star"></i><p>Revew</p></div></Link>



                        {/* <Button
                            text="Add to Cart"
                            backgroundColor="bg-[#E6BB4D]"
                            borderColor="border-[#0F1D15]"
                            arrowColor="text-[#0F1D15]"
                            onClick={props.onClick}
                        /> */}
                        {/* <button className="bg-[#E6BB4D] rounded-lg border-[#0F1D15] p-2 font-bold text-[#0F1D15] shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-out hover:bg-[#d4a639]">
                                make a review
                            </button> */}


                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCards;

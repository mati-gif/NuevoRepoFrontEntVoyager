import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveCartProducts } from '../redux/actions/cartActions';

const SendOrderForm = () => {
  const dispatch = useDispatch();
  const productsQuantity = useSelector((store) => store.cartReducer.productos);

  useEffect(() => {
    if (productsQuantity.length === 0) {
      dispatch(saveCartProducts()); // O lo que necesites pasar aquí
    }
  }, [dispatch, productsQuantity]);

  console.log(productsQuantity);

  return (
    <div>
      <form action="">
        <p className='text-white'>{productsQuantity.nameProduct}</p>
      </form>
    </div>
  );
};

export default SendOrderForm;
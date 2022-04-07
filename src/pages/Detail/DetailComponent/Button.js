import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../DetailComponent/Button.scss';
const Button = ({ colorSelectId, sizeSelectId }) => {
  const [amount, setAmount] = useState(1);
  const params = useParams();

  const addToCart = () => {
    fetch(`http://10.58.2.42:8000/carts`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('TOKEN'),
      },
      body: {
        product_id: params.id,
        color_id: colorSelectId,
        size_id: sizeSelectId,
        quantity: amount,
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      });
    console.log('장바구니에 담기');
  };
  return (
    <>
      <div className="button">
        <span>수량선택</span>
        <button
          className="amountBtn"
          onClick={() => {
            amount > 1 && setAmount(amount - 1);
          }}
        >
          -
        </button>
        <span className="counter">{amount}</span>

        <button
          className="amountBtn"
          onClick={() => {
            setAmount(amount + 1);
          }}
        >
          +
        </button>
      </div>
      <div className="btnContainer">
        <button id="wishBtn">wish</button>
        <button
          id="cartBtn"
          onClick={() => {
            addToCart();
          }}
        >
          장바구니
        </button>
        <button id="payBtn">바로구매</button>
      </div>
    </>
  );
};

export default Button;

import React from "react";
import "./QuantityInput.css";
import CartPage from "./../Cart/CartPage";

const QuantityInput = ({
  quantity,
  setQuantity,
  stock,
  CartPage,
  productId,
}) => {
  return (
    <>
      <button
        className="quantity_input_button"
        disabled={quantity <= 1}
        onClick={() => {
          CartPage
            ? setQuantity("decrease", productId)
            : setQuantity(quantity - 1);
        }}
      >
        -
      </button>
      <p className="quantity_input_count">{quantity}</p>
      <button
        className="quantity_input_button"
        disabled={quantity >= stock}
        onClick={() => {
          CartPage
            ? setQuantity("increase", productId)
            : setQuantity(quantity + 1);
        }}
      >
        +
      </button>
    </>
  );
};

export default QuantityInput;

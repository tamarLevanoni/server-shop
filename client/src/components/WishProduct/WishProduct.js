import React, { useContext } from "react";
import saleStamp from "./sale-stamp.png";
import PropTypes from "prop-types";
import "./WishProduct.css";
import { Link } from "react-router-dom";
import { WishListContext } from "../../contexts/context";
const WishProduct = (props) => {
  const { _id, srcImg, title, price, isSale, updateProduct, count } = props;
  const wishList = useContext(WishListContext);

  const validateSetCount = (newCount) => {
    let newWishList;
    if (newCount > 0) {
      newWishList = {
        ...wishList,
        [_id]: {
          ...wishList[_id],
          count: newCount,
        },
      };
    } else {
      newWishList = wishList;
      delete newWishList[_id];
    }
    localStorage.setItem("wishList", JSON.stringify(newWishList));
    updateProduct();
  };

  return (
    <div className="wish-product-card">
      <div className="wish-product-image">
        <Link to={`/products/${_id}`}>
          {isSale && <img className="saleStamp" src={saleStamp} alt="sale" />}
          <img src={srcImg} alt="" />
        </Link>
      </div>

      <div className="wish-product-info">
        <Link to={`/products/${_id}`}>
          <h5>{title}</h5>
        </Link>
        <h6 className="price">
          {isSale ? `${price / 2}$ instead of ${price}` : price}$
        </h6>
      </div>
      <div className="change-count">
        {count > 1 ? (
          <i
            className="fas fa-minus active"
            onClick={() => validateSetCount(count - 1)}
          ></i>
        ) : (
          <i className="fas fa-minus disabled" disabled></i>
        )}
        <span>{count}</span>
        <i
          className="fas fa-plus active"
          onClick={() => validateSetCount(count + 1)}
        ></i>
        <i
          className="fas fa-trash active"
          onClick={() => validateSetCount(0)}
        ></i>
      </div>
    </div>
  );
};

WishProduct.propTypes = {
  isSale: PropTypes.bool,
  srcImg: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
};

export default WishProduct;

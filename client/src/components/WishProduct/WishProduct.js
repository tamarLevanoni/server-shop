import React from "react";
import saleStamp from "./sale-stamp.png";
import PropTypes from "prop-types";
import "./WishProduct.css";
import { Link } from "react-router-dom";
const Product = (props) => {
  const { _id, srcImg, title, price, isSale } = props;

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
    </div>
  );
};

Product.propTypes = {
  isSale: PropTypes.bool,
  srcImg: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
};

export default Product;

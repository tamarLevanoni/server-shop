import React, { useEffect, useState } from "react";
import "./ProductPage.css";
const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({});
  const [wishList, setWishList] = useState({});
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/products/${match.params.id}`);
      const product = await response.json();
      console.log(product);
      setProduct(product);
    }
    fetchData();
  }, [match.params.id]);
  useEffect(() => {
    setWishList(JSON.parse(localStorage.getItem("wishList")));
  }, []);
  useEffect(() => {
    wishList && localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);

  function addToCart() {
    setWishList({
      ...wishList,
      [product._id]: {
        ...product,
        count: wishList[product._id] ? wishList[product._id].count + 1 : 1,
      },
    });
  }

  return (
    <section className="product">
      <div className="product__photo">
        <div className="photo-container">
          <div className="photo-main">
            <img src={product.image} alt="" />
          </div>
        </div>
      </div>
      <div className="product_info">
        <div className="title">
          <h1>{product.title}</h1>
        </div>
        <div className="price">
          <span>{product.price}$</span>
        </div>
        <button className="buy--btn" onClick={addToCart}>
          ADD TO CART
        </button>
      </div>
    </section>
  );
};

export default ProductPage;

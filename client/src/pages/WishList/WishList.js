import "./WishList.css";
import React, { useEffect, useState } from "react";
import WishProduct from "../../components/WishProduct/WishProduct";
import { WishListContext } from "../../contexts/context";
const WishList = ({ match }) => {
  const [wishList, setWishList] = useState({});

  useEffect(() => {
    setWishList(JSON.parse(localStorage.getItem("wishList")));
  }, []);
  const updateProduct = () => {
    setWishList(JSON.parse(localStorage.getItem("wishList")));
  };
  return (
    <div className="WishListProducts">
      <h1>My wish list</h1>
      {Object.values(wishList).map(({ _id, image, title, price, count }) => (
        <WishListContext.Provider value={wishList}>
          <WishProduct
            key={_id}
            _id={_id}
            srcImg={image}
            title={title}
            price={price}
            count={count}
            updateProduct={updateProduct}
          />
        </WishListContext.Provider>
      ))}
    </div>
  );
};

export default WishList;

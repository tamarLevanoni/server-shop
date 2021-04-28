import "./WishList.css";
import React, { useEffect, useState } from "react";
import WishProduct from "../../components/WishProduct/WishProduct";
const WishList = ({ match }) => {
  const [wishList, setWishList] = useState({});
  useEffect(() => {
    setWishList(JSON.parse(localStorage.getItem("wishList")));
  }, []);
  return (
    <div className="WishListProducts">
      <h1>My wish list</h1>
      {Object.values(wishList).map(({ _id, image, title, price }) => (
        <WishProduct
          key={_id}
          _id={_id}
          srcImg={image}
          title={title}
          price={price}
        />
      ))}
    </div>
  );
};

export default WishList;

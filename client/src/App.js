import "./App.css";
import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import WishList from "./pages/WishList/WishList";


const App = () => {

  return (
    <Router>
      <ul>
        <li className="li-Router">
          <Link to="/">
              Home
          </Link>
        </li>
        <li className="li-Router">
          <Link to="/about">
              About
          </Link>
        </li>
        <li className="li-Router">
          <Link to="/wishList">
          Wish List
          </Link>
        </li>
      </ul>
      <Switch>
        <Route path="/products/:id" component={ProductPage}></Route>
        <Route path="/wishList" component={WishList}></Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

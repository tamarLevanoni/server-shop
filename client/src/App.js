import "./App.css";
import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import { green, purple } from '@material-ui/core/colors';

const BootstrapButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

// const ColorButton = withStyles((theme) => ({
//   root: {
//     color: theme.palette.getContrastText(purple[500]),
//     backgroundColor: purple[500],
//     '&:hover': {
//       backgroundColor: purple[700],
//     },
//   },
// }))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

// const theme = createMuiTheme({
//   palette: {
//     primary: green,
//   },
// });

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <ul>
        <li className="li-Router">
          <Link to="/">
            <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin}>
              Home
            </BootstrapButton>
          </Link>
        </li>
        <li className="li-Router">
          <Link to="/about">
            <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin}>
              About
            </BootstrapButton>
          </Link>
        </li>
      </ul>
      <Switch>
        <Route path="/products/:id" component={ProductPage}></Route>
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
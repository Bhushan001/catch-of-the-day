import React from "react";
import { render } from "react-dom";
import "./css/style.css";
import { BrowserRouter, Match, Miss } from "react-router";
import StorePicker from "./components/StorePicker";
import App from "./components/App";
import NotFound from "./components/NotFound";

const Root = () => {
  // React Router Conf
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={StorePicker} />
        <Match exactly pattern="/store/:storeId" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  );
};


// Redering Root component in place of HTML element with Id `main`
render(<Root />, document.getElementById("main"));

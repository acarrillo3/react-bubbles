import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";

import PrivateFoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import ColorList from "./components/ColorList";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateFoute path="/bubble" component={BubblePage} />
        {/* <PrivateFoute path="/bubble/:id" component={ColorList} /> */}
      </div>
    </Router>
  );
}

export default App;

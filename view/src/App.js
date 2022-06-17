import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Appsetting from "./appsettings";

import Search from "./Search";
import Login from "./Login";
import AppSetting from "./appsettings";
const App = () => {
  return (
    <AppSetting>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/Search" exact element={<Search />} />
        </Routes>
      </Router>
    </AppSetting>
  );
};
export default App;

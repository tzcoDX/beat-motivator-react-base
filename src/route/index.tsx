import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Route exact path="/" component={Home} />
      </MainLayout>
    </BrowserRouter>
  );
};

export default Router;

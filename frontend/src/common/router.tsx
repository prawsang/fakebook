import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "common/routes/PrivateRoute";
import PublicRoute from "common/routes/PublicRoute";
import LoginPage from "modules/user/pages/LoginPage";
import RegisterPage from "modules/user/pages/RegisterPage";
import WelcomePage from "modules/user/pages/WelcomePage";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/login">
          <LoginPage />
        </PublicRoute>
        <PublicRoute path="/register">
          <RegisterPage />
        </PublicRoute>
        <PrivateRoute path="/">
          <WelcomePage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default AppRouter;

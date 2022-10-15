import { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";

const AdminPrivateRoute = ({ children, ...rest }) => {
  //   const isLoggedIn = () => {
  const token1 = sessionStorage.getItem("emailToken");
  const token2 = sessionStorage.getItem("passToken");
  //   };
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token1 && token2 ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/adminLogin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AdminPrivateRoute;

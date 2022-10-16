import { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  //   const isLoggedIn = () => {
  const mblDataP = sessionStorage.getItem("mblData");
  const pcDataP = sessionStorage.getItem("pcData");
  //   };
  return (
    <Route
      {...rest}
      render={({ location }) =>
        mblDataP || pcDataP ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

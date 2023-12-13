import React from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/utils";

function PrivateRoute({ children }) {
  const [currentUser, setCurrentUser] = React.useState({});
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);
  if (currentUser?.email === "" || currentUser === null) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;
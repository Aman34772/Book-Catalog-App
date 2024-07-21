import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

interface IProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  // get user from Redux State
  const { user, isLoading } = useAppSelector((state) => state.user);

  // get current location by React useLocation Hook
  const location = useLocation();

  // is loading...
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // checking...
  if (!user?.email) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }

  return children;
};

export default PrivateRoute;

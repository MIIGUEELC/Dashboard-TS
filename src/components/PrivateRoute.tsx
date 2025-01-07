import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

type Props = {
  children: React.ReactNode;
};

export const PrivateRoute = (props: Props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.login);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{props.children}</>;
};

import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom"; // Navigate is used as a route re-direct when called.
import Loading from "../components/Loading";

const ProtectedRoute = ({ children }) => {
  const { user, userLoading } = useAppContext();
  if (userLoading) return <Loading center={true} />;
  if (!user) {
    return <Navigate to="/landing" />;
  }

  return children;
};
export default ProtectedRoute;

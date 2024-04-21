import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  AuthContext,
  AuthContextProps,
  UserProfile,
} from "../Auth/AuthContext.tsx";
import Loader from "../components/Loader";
import { User } from "firebase/auth";

const IsUserAdministrator = (
  user: User | null,
  userProfile: UserProfile | null,
) => {
  if (!user) return false;
  if (!userProfile) return false;

  return userProfile.isSiteAdmin;
};

const AdminRoute = () => {
  const { user, userProfile, loading } = useContext(
    AuthContext,
  ) as AuthContextProps;

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (!IsUserAdministrator(user, userProfile)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;

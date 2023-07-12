import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ReactNode, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/');
    }
  }, [user, loading]);

  
  if (!user || loading) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
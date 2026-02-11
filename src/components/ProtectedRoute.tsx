import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
const user = supabase.auth.getUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

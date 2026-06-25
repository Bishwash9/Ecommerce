import { Navigate} from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = Number(payload?.exp);
        if (!exp) return false;
        return Date.now() < exp * 1000; // Convert exp to milliseconds
    }catch {
        return false;
    }
}

export const RouteGuard = () => {
    const { user } = useAuth();
    const token = localStorage.getItem('accessToken');
    const isLoggedIn = isTokenValid(token);

   if(isLoggedIn && user){
      return <Navigate to="/dashboard" replace />;
   }else {
    return <Navigate to="/" replace />;
   }

   
}
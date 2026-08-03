import { Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../Context/AuthContext";



export const RouteGuard = () => {
    const { user } = useAuth();
    const accessToken = localStorage.getItem('accessToken');
    

   return user && accessToken ? <Outlet /> : <Navigate to="/" replace />;

   
}
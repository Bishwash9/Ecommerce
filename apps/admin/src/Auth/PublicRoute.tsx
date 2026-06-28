import { Navigate, Outlet} from "react-router-dom";


const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;

    try{
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = Number(payload?.exp);
        if(!exp) return false;
        return Date.now() < exp * 1000; // Convert exp to milliseconds
    }catch {
        return false;
    }
};

export const PublicRoute = () => {
    //check if user is already logged in
    const token = localStorage.getItem('accessToken');
    const isLoggedIn = isTokenValid(token);

    if(isLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    //if user is not logged in, render the child routes so login page can be accessed
    return <Outlet />;
}
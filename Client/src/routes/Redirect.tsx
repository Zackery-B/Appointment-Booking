import { Navigate } from "react-router";

export default function Redirect() {
    // test if logged in ---------------------- not done 
    const isLoggedIn = false;

    return isLoggedIn
        ? <Navigate to="/dashboard" replace />
        : <Navigate to="/login" replace />;
}
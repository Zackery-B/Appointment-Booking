import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function Redirect() {
    const { user } = useAuth(); // Destructure auth object

    return (user != null) // test if logged in 
        ? <Navigate to="/dashboard" replace />
        : <Navigate to="/login" replace />;
}
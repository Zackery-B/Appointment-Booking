import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from 'react-router';
import "../styles/NavBar.css";

export default function NavBar() {
  const { user, logout} = useAuth(); // destructure auth object

  const location = useLocation();

  return (
    <nav className="NavBar">
      {(location.pathname != "/appointments" && user != null) ? <NavLink className="NavLink" to="/appointments">Appointments</NavLink> : ""}
      {(location.pathname != "/appointments/book" && user != null) ? <NavLink className="NavLink" to="/appointments/book">Book Appointments</NavLink> : ""}
      {(location.pathname != "/login" && user == null) ? <NavLink className="NavLink" to="/login">Login</NavLink> : ""}
      {user != null && <button onClick={logout}>Logout</button>}
    </nav>
  )
}

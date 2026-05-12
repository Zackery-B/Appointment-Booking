import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from 'react-router';
import "../styles/NavBar.css";

export default function NavBar() {
  const { user, logout} = useAuth(); // destructure auth object

  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate("/login");
  };

  return (
    <nav className="NavBar">
      {(user != null && user.role === 'client') ? (
      <>
        {(location.pathname != "/appointments") && <NavLink className="NavLink" to="/appointments">Appointments</NavLink>}
        {(location.pathname != "/appointments/book") && <NavLink className="NavLink" to="/appointments/book">Book Appointment</NavLink>}
      </>
      ) : ( // if not client, must be doctor 
      <>
        {(location.pathname != "/appointments") && <NavLink className="NavLink" to="/doctor/appointments">Appointments</NavLink>}
        {(location.pathname != "/doctor/time-slots") && <NavLink className="NavLink" to="/doctor/time-slots">Time Slots</NavLink>}
      </>
      )}
      {(location.pathname != "/login" && user == null) && <NavLink className="NavLink" to="/login">Login</NavLink>}
      {user != null && <button onClick={handleLogout}>Logout</button>}
    </nav>
  )
}

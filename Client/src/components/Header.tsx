import NavBar from "./NavBar";
import "../styles/Header.css";

export default function Header() {
    return(
    <header className="Header">
        <h1>Appointment Bookings</h1>
        <NavBar/>
    </header>
    )
}
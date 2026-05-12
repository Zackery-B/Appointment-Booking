import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { type Appointment } from "../types/types";

export default function AppointmentPage() {
    const { user } = useAuth(); // Destructure auth object
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState<[]>([]); // need a type ------------- not done 

    // on page load, make sure user is logged in then get appointments 
    useEffect(() => { 
        //if (user == null)  // removed for testing --------------------- testing 
            //navigate('/login');
        //else 
            getAppointments() 
    }, []); 

    function getAppointments(){
        fetch(`/api/appointments?userID=${user?.id}`) // user should not be null 
        .then((response) => response.json())
        .then((data) => {
            setAppointments(data.data) // store the data from answer 
        })
        .catch(error => {
            console.error(error);
        });
    }

    return(
    <section>
        <ul>
        {appointments.map((appointment) => (
            <li>
            {/*<appointmentDisplay 
                appointment={appointment}
                key={appointment.id}
            />*/}
            </li>
        ))}
        </ul>
    </section>
    )
}
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import DateTimeDisplay from "../components/DateTimeDisplay";
import { type Appointment } from "../types/types";

export default function AppointmentPage() {
    const { user } = useAuth(); // Destructure auth object
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState<Appointment[]>([]);  

    // on page load, make sure user is logged in then get appointments 
    useEffect(() => { 
        if (user == null) 
            navigate('/login');
        else 
            getAppointments() 
    }, []); 

    function getAppointments(){
        fetch(`/api/appointments?userID=${user?.id}`) // user should not be null 
        .then((response) => response.json())
        .then((rows) => {
            // make sure answer is not empty, then sort
            if(rows == null || rows.data.length !==0){
                // sort the data into a list of appointments 
                const sortedData:Appointment[] = rows.data.map((row:any) => ({
                    id: row.id,
                    status: row.status,
                    reason: row.reason,
                    details: row.details,
                    timeSlot: {
                        datetime: row.datetime,
                        doctorFirstName: row.doctorFirstName,
                        doctorLastName: row.doctorLastName,
                    }
                }));
                setAppointments(sortedData) // store the sorted data from the answer 
            }
        })
        .catch(error => {
            console.error(error);
        });
    }

    return(
    <section>
        {(appointments == null || appointments.length === 0) ? (
            <p>No appointments</p>
        ) : (
            <ul>
            {appointments.map((appointment) => (
                <li key={appointment.id}>
                    <p>{appointment.reason}</p>
                    <p>{appointment.status}</p>
                    <p>Dr. {appointment.timeSlot.doctorFirstName} {appointment.timeSlot.doctorLastName}</p>
                    <DateTimeDisplay datetime={appointment.timeSlot.datetime}/>
                </li>
            ))}
            </ul>
        )}
    </section>
    )
}
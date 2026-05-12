import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import DateTimeDisplay from "../components/DateTimeDisplay";
import { type Appointment } from "../types/types";

export default function DoctorAppointmentsPage() {
    const { user } = useAuth(); // Destructure auth object
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState<Appointment[]>([]);  

    // on page load, make sure user is logged in and a doctor, then get appointments 
    useEffect(() => { 
        if (user == null|| user.role != 'doctor') 
            navigate('/login');
        else 
            getDoctorAppointments() 
    }, []); 

    function getDoctorAppointments(){
        fetch(`/api/doctor/appointments?userID=${user?.id}`) // user should not be null 
        .then((response) => response.json())
        .then((rows) => {
            // make sure answer is not empty, then sort
            if(rows != null && rows.data.length !==0){
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

    // helper method to update the state of a appointment without making a new query 
    function updateStatus(id:Number, newStatus:string) {
        setAppointments(prev =>
            prev.map(appointment =>
                (appointment.id === id)
                ? { ...appointment, status: newStatus }
                : appointment
            )
        );
    }

    function handleAppointmentCancellation(){
        
    }

    return(
    <section>
        {(appointments == null || appointments.length === 0) ? (
            <p>No appointments</p>
        ) : (
            <ul>
            {appointments.map((appointment) => (
                <div> 
                    {(appointment.status == 'pending') ? ( // determine if confirm button is needed 
                        <button>Confirm</button>
                    ):(appointment.status == 'confirmed') && ( // determine if confirmed status is needed 
                        <span>Confirmed</span>
                    )}
                    
                    {(appointment.status == 'pending' || appointment.status == 'confirmed') ? ( // determine if cancel button is needed 
                        <button>Cancel</button>
                    ):( // if its not pending or confirmed, its canceled
                        <span>Canceled</span>
                    )}

                    <li key={appointment.id}>
                        <p>{appointment.reason}</p>
                        <p>{appointment.timeSlot.doctorFirstName} {appointment.timeSlot.doctorLastName}</p>
                        <DateTimeDisplay datetime={appointment.timeSlot.datetime}/>
                    </li>
                </div>
            ))}
            </ul>
        )}
    </section>
    )
}
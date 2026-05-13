import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import DoctorAppointmentCard from "../components/DoctorAppointmentCard";
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
                        doctorFirstName: row.clientFirstName,  // could rename type 
                        doctorLastName: row.clientLastName,
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

    // handle canceling an appointment
    function handleAppointmentCancellation(id:number){
        fetch(`/api/appointments/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "cancelled" })
        })
        .then((response) => {
            if(response.ok){
                updateStatus(id, 'canceled');
            }
            else   
                throw new Error(`***HTTP error, status: ${response.status}`); 
        });
    }

    // handle confirming an appointment
    function handleAppointmentConfirmation(id:number){
        fetch(`/api/appointments/${id}`, { 
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "confirmed" })
        })
        .then((response) => {
            if(response.ok){
                updateStatus(id, 'confirmed');
            }
            else   
                throw new Error(`***HTTP error, status: ${response.status}`); 
        });
    }

    return(
    <section>
        {(appointments == null || appointments.length === 0) ? (
            <p>No appointments</p>
        ) : (
            <ul>
            {appointments.map((appointment) => (
                <li key={String(appointment.id)}> 
                <DoctorAppointmentCard
                    appointment = {appointment}
                    confirmAppointment = {() => handleAppointmentConfirmation(appointment.id)}
                    cancelAppointment = {() => handleAppointmentCancellation(appointment.id)}
                />
                </li>
            ))}
            </ul>
        )}
    </section>
    )
}
import DateTimeDisplay from "../components/DateTimeDisplay";
import { type Appointment } from "../types/types";

type DoctorAppointmentCardProps ={
    appointment:Appointment;
    confirmAppointment: () => void;
    cancelAppointment: () => void;
}

export default function DoctorAppointmentCard({appointment, confirmAppointment,  cancelAppointment}:DoctorAppointmentCardProps) {
return(
    <>
    <div>
        {(appointment.status == 'pending') ? ( // determine if confirm button is needed 
            <button onClick={confirmAppointment}>
                Confirm
            </button>
        ):(appointment.status == 'confirmed') && ( // determine if confirmed status is needed 
            <span>Confirmed</span>
        )}
        
        {(appointment.status == 'pending' || appointment.status == 'confirmed') ? ( // determine if cancel button is needed 
            <button onClick={cancelAppointment}>
                Cancel
            </button>
        ):( // if its not pending or confirmed, its canceled
            <span>Canceled</span>
        )}
    </div>

    <div>
        <p>{appointment.reason}</p>
        <p>{appointment.timeSlot.doctorFirstName} {appointment.timeSlot.doctorLastName}</p>
        <DateTimeDisplay datetime={appointment.timeSlot.datetime}/>
    </div>
    </>
)}
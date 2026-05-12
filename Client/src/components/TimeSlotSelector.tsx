import { useState } from "react";
import type { ChangeEvent } from "react";
import TimeSlotDisplay from "./TimeSlotDisplay";
import type { TimeSlot, Doctor } from "../types/types";

type TimeSlotSelectorProps = {
    timeSlots: TimeSlot[];
    doctors: Doctor[]; 
    setSelectedSlot: (slot:TimeSlot|null) => void;
};


export default function TimeSlotSelector( {timeSlots, doctors, setSelectedSlot}: TimeSlotSelectorProps) {

    const [selectedDoctor, setSelectedDoctor] = useState(0); 

    function handleDoctorSelection(ev: ChangeEvent<HTMLSelectElement>){
        setSelectedDoctor(()=>{
            return Number(ev.target.value)
        })
    }

    return(
        (!timeSlots || timeSlots.length === 0) 
        ? (
            <p>No time slots available</p>
        ) : (
            <>
            <div>
                <label htmlFor="doctor">Filter by doctor</label>
                <select
                name="doctor"
                id="doctor"
                value={selectedDoctor}
                onChange={handleDoctorSelection}
                >
                    <option value={0}>Select a doctor</option>

                    {doctors.map((doctor:Doctor) => ( // add all doctors
                        <option value={String(doctor.id)}>{doctor.firstName} {doctor.lastName}</option>
                    ))}
                </select>
            </div>
            <div>
                <ul>
                {timeSlots.map((timeSlot) => (
                    ( selectedDoctor === 0  || selectedDoctor == timeSlot.doctorID) && (
                        <li>
                        <TimeSlotDisplay 
                            timeSlot={timeSlot}
                            setSelectedSlot={
                                (slot:TimeSlot) => {setSelectedSlot(slot)}
                            }
                            key={timeSlot.id}
                        />
                        </li>
                    )
                ))}
                </ul>
            </div>
            </>
        )
    )
}
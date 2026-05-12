import { useState } from "react";
import type { ChangeEvent } from "react";
import TimeSlotDisplay from "./TimeSlotDisplay";
import { type TimeSlot } from "../types/types";

type TimeSlotSelectorProps = {
    timeSlots: TimeSlot[];
    setSelectedSlot: (slot:TimeSlot|null) => void;
};


export default function TimeSlotSelector( {timeSlots, setSelectedSlot}: TimeSlotSelectorProps) {

    const [selectedDoctor, setSelectedDoctor] = useState(""); 

    function handleDoctorSelection(ev: ChangeEvent<HTMLSelectElement>){
        setSelectedDoctor(()=>{
            return ev.target.value
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
                    <option value="">Select a doctor</option>

                    {timeSlots.map((timeSlot) => ( // add all doctors with a time slot 
                        <option value={timeSlot.doctorLastName}>{timeSlot.doctorFirstName} {timeSlot.doctorLastName}</option>
                    ))}
                </select>
            </div>
            <div>
                <ul>
                {timeSlots.map((timeSlot) => (
                    ( selectedDoctor == "" || selectedDoctor == timeSlot.doctorLastName) // filter by last name 
                    ? (
                        <li>
                        <TimeSlotDisplay 
                            timeSlot={timeSlot}
                            setSelectedSlot={
                                (slot:TimeSlot) => {setSelectedSlot(slot)}
                            }
                            key={timeSlot.id}
                        />
                        </li>
                    ) : ( 
                        <></> // nothing
                    )
                ))}
                </ul>
            </div>
            </>
        )
    )
}
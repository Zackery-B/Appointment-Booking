import { useEffect } from "react";
import TimeSlotDisplay from "./TimeSlotDisplay";
import { type TimeSlot } from "../types/types";

type TimeSlotSelectorProps = {
    timeSlots: TimeSlot[];
    setSelectedSlot: (slot:TimeSlot|null) => void;
};


export default function TimeSlotSelector( {timeSlots, setSelectedSlot}: TimeSlotSelectorProps) {

    if (!timeSlots || timeSlots.length === 0) return (
        <p>No time slots available</p>
    );

    return(
        <ul>
        {timeSlots.map((timeSlot) => (
          <li>
            <TimeSlotDisplay 
                timeSlot={timeSlot}
                setSelectedSlot={
                    (slot:TimeSlot) => {setSelectedSlot(slot)}
                }
                key={timeSlot.id}
            />
          </li>
        ))}
        </ul>
    )
}
import { useEffect } from "react";
import { type TimeSlot } from "../types/types";

type TimeSlotSelectorProps = {
    timeSlots: TimeSlot[];
    selectedSlot: TimeSlot | null;
    setSelectedSlot: (slot:any) => void;
};


export default function TimeSlotSelector( {timeSlots, selectedSlot, setSelectedSlot}: TimeSlotSelectorProps) {
    console.log("this is time slots : " + timeSlots)
    
    if (!timeSlots || timeSlots.length === 0) return (
        <p>No time slots available</p>
    );

    return(
        <>
        <p>This is the selector</p>
        </>
    )
}
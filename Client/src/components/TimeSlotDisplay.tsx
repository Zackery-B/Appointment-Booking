import DateTimeDisplay from "./DateTimeDisplay";
import { type TimeSlot } from "../types/types";

type TimeSlotProps = {
    timeSlot: TimeSlot;
    setSelectedSlot: (slot:TimeSlot) => void;
};

export default function TimeSlotDisplay( {timeSlot, setSelectedSlot}:TimeSlotProps ) {

    return(
    <button type="button" onClick={()=>{setSelectedSlot(timeSlot)}}>
        <p>Dr. {timeSlot.doctorFirstName} {timeSlot.doctorLastName}</p>
        <DateTimeDisplay datetime={timeSlot.datetime}/>
    </button>
    )
}
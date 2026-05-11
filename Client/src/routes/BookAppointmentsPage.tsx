import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { useState, useEffect, type SubmitEvent} from "react";
import TimeSlotSelector from "../components/TimeSlotSelector";
import Drawer from "../components/Drawer";
import { type TimeSlot } from "../types/types";

export default function BookAppointmentPage() {
    const { user } = useAuth(); // Destructure auth object
    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot|null>(null);

    // make sure user is logged then in on page load
    useEffect(() => { 
        //if (user == null)  // removed for testing --------------------- testing 
            //navigate('/login');
        //else 
            getTimeSlots() 
    }, []); 


    function getTimeSlots(){
        fetch("/api/time-slots")
        .then((response) => response.json())
        .then((data) => {
            setTimeSlots(data.data) // store the data from answer 
        })
        .catch(error => {
            console.error(error);
        });
    }

    // handle form submission 
    function handleSubmit(submission: SubmitEvent<HTMLFormElement>){
        submission.preventDefault();

    }


    return(
    <section className = "BookAppointmentPage">
        <form onSubmit={handleSubmit}>
            <button type="button" onClick={() => setDrawerOpen(true)} > 
                {(selectedSlot == null) ? (
                    <p>Select time slot</p>
                ) : (
                    <>
                    <p>Dr. {selectedSlot.doctorFirstName} {selectedSlot.doctorLastName}</p>
                    <p>Time: {selectedSlot.datetime}</p>
                    </>
                )}
            </button>
            <button>Complete Appointment</button>
        </form>

        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <TimeSlotSelector
                timeSlots={timeSlots}
                setSelectedSlot={(slot:TimeSlot|null) => {
                    setSelectedSlot(slot);
                    setDrawerOpen(false); // auto-close on select
                }}
            />
        </Drawer>
    </section>
    )
}
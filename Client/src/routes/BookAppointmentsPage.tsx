import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import type { SubmitEvent, ChangeEvent} from "react";
import TimeSlotSelector from "../components/TimeSlotSelector";
import Drawer from "../components/Drawer";
import { type TimeSlot } from "../types/types";

export default function BookAppointmentPage() {
    const { user } = useAuth(); // Destructure auth object
    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot|null>(null);
    
    const [formData, setFormData] = useState({
        reason: "",
        details: "",
    });

    // on page load, make sure user is logged in then get time slots
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

    // updates form data when its changed in the form 
    function updateFormData(ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const changedName = ev.target.name;
        const newValue = ev.target.value;
        setFormData((prevData) => {
            return { ...prevData, [changedName]: newValue };
        });
    }

    // handle form submission 
    function handleSubmit(submission: SubmitEvent<HTMLFormElement>){
        submission.preventDefault();

    }


    return(
    <section className = "BookAppointmentPage">
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="reason">Reason</label>
                <select
                name="reason"
                id="reason"
                value={formData.reason}
                onChange={updateFormData}
                >
                    <option value="">Select a reason for the appointment</option>
                    <option value="client">Client</option>
                    <option value="doctor">Doctor</option>
                </select>
            </div>
            <div>
                <textarea 
                name="details" 
                id="details"
                value={formData.details}
                onChange={updateFormData}
                ></textarea>
            </div>
            <div>
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
            </div>
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
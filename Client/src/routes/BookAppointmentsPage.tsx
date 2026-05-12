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
        details: ""
    });
    const [error, setError] = useState("");

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

        if (formData.reason == "" )
            setError("Please select a reason for your appointment.");
        else if (selectedSlot == null)
            setError("Please select a time slot.");
        else { // no errors 

            const data = {
                userID: user?.id, // user should not be null 
                reason: formData.reason,
                details: formData.details,
                timeSlotID: selectedSlot.id
            }

            // make request to api to book appointment
            fetch("/api/appointments/book",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then((response) => { // manage api response 
                if (!response.ok)
                    throw new Error(`***HTTP error, status: ${response.status}`); 
                else
                    navigate('/appointments');
            })
            .catch(error => {
                console.error(error);
                setError("Error: Something went wrong."); 
            });
        }
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
                    <option value="General checkup">General checkup</option>
                    <option value="Follow-up visit">Follow-up visit</option>
                    <option value="New symptom">New symptom</option>
                    <option value="Ongoing condition review">Ongoing condition review</option>
                    <option value="Prescription renewal">Prescription renewal</option>
                    <option value="Test results discussion">Test results discussion</option>
                    <option value="Referral request">Referral request</option>
                    <option value="Injury or pain">Injury or pain</option>
                    <option value="Mental health concern">Mental health concern</option>
                    <option value="Vaccination or immunization">Vaccination or immunization</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div>
                <label htmlFor="details">Details</label>
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
        {(error !== "") && <div className="error">{error}</div>}

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
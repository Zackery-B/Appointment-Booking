import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { useState } from "react";
import TimeSlotSelector from "../components/TimeSlotSelector";
import Drawer from "../components/Drawer";

function handleSubmit(){}

export default function BookAppointmentPage() {
    const { user } = useAuth(); // Destructure auth object
    const navigate = useNavigate();

    // make sure user is logged in 
    if (user == null) navigate('/login');

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    return(
    <section className = "BookAppointmentPage">
        <form onSubmit={handleSubmit}>

        </form>

        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <TimeSlotSelector
                selectedSlot={selectedSlot}
                setSelectedSlot={(slot:any) => {
                    setSelectedSlot(slot);
                    setDrawerOpen(false); // auto-close on select
                }}
            />
        </Drawer>
    </section>
    )
}
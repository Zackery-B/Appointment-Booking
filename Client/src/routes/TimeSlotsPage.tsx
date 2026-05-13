import { useState, useEffect } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useNavigate } from 'react-router';
import { useAuth } from "../contexts/AuthContext";

export default function TimeSlotsPage() {
    const { user } = useAuth(); // Destructure auth object
    const navigate = useNavigate();

    // on page load, make sure user is logged in and a doctor
    useEffect(() => { 
        if (user == null|| user.role != 'doctor') 
            navigate('/login');
    }, []); 
    

    const [formData, setFormData] = useState({
        datetime: "",
    });

    const [error, setError] = useState(false);

    // updates form data when its changed in the form 
    function updateFormData(ev: ChangeEvent<HTMLInputElement>) {
        const changedName = ev.target.name;
        const newValue = ev.target.value;
        setFormData((prevData) => {
            return { ...prevData, [changedName]: newValue };
        });
    }

    // manage login attempt 
    function handleSubmit(submission: SubmitEvent<HTMLFormElement>){
        submission.preventDefault();
        
        if (formData.datetime == ""){
            setError(true);
        }
        else {
            // make call to api
            fetch("/api/time-slots",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then((response) => { // manage api response 
                if (!response.ok)
                    throw new Error(`***HTTP error, status: ${response.status}`); 
                else{
                    setFormData(() => { // make the datetime field empty 
                        return { datetime: "" };
                    });
                }
            })
            .catch(error => {
                console.error(error);
                setError(true); 
            });
        }
    }

    return(
    <section className="LoginPage">
        <form onSubmit={handleSubmit}>
            <div>
                <h2>Add time slot</h2>
            </div>
            <div>
                <p>This page is a placeholder to make adding time slots simpler.</p>
                <p>Please enter date and time in YYYY-MM-DD HH:MM:SS format without extra spacing.</p>
            </div>
            <div>
                <label htmlFor="datetime">Date and Time</label>
                <input
                type="text"
                name="datetime"
                id="datetime"
                value={formData.datetime}
                onChange={updateFormData}
                />
            </div>
            <div>
                <button>Add time slot</button>
            </div>
            {error && <div className="error">Error</div>}
        </form>
    </section>
    )
}
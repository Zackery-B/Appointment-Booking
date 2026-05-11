import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useNavigate } from 'react-router';

export default function MakeAccountPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: ""
    });

    const [error, setError] = useState(false);

    // updates form data when its changed in the form 
    function updateFormData(ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const changedName = ev.target.name;
        const newValue = ev.target.value;
        setFormData((prevData) => {
            return { ...prevData, [changedName]: newValue };
        });
    }

    // manage login attempt 
    function handleSubmit(submission: SubmitEvent<HTMLFormElement>){
        submission.preventDefault();
        
        if ( Object.values(formData).some(value => value === "")) // make sure no form value is empty 
        {
            setError(true);
        }
        else {
            
            // make request to api to validate login 
            fetch("http://localhost:3001/user/signup",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then((response) => { // manage api response 
                if (!response.ok)
                    throw new Error(`***HTTP error, status: ${response.status}`); 
                else
                    navigate('/login');
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
                <h2>Make account</h2>
            </div>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={updateFormData}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={updateFormData}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                type="text"
                name="email"
                id="email"
                value={formData.email}
                onChange={updateFormData}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={updateFormData}
                />
            </div>
            <div>
                <label htmlFor="role">Role</label>
                <select
                name="role"
                id="role"
                value={formData.role}
                onChange={updateFormData}
                >
                <option value="client">Client</option>
                <option value="doctor">Doctor</option>
                </select>
                <p>This is a placeholder solution.</p>
            </div>
            <div>
                <button>Make Account</button>
            </div>
            {error && <div className="error">Account creation failed</div>}
        </form>
    </section>
    )
}
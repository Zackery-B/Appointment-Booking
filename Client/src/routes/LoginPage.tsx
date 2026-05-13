import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useNavigate, Link } from 'react-router';
import { useAuth } from "../contexts/AuthContext";
//import "../styles/LoginPage.css";

export default function LoginPage() {

    const { login } = useAuth(); // Destructure needed pieces of auth object

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
        
        if (formData.email == "" || formData.password == ""){
            setError(true);
        }
        else {
            
            // make request to api to validate login 
            fetch("/api/user/login",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then((response) => { // manage api response 
                if (!response.ok)
                throw new Error(`***HTTP error, status: ${response.status}`); 

                return response.json();
            })
            .then((data) => {  // manage received data 
                
                let userData = data.user;

                login(userData); // mark user as logged in
                
                if(userData.role == 'doctor')
                    navigate('/doctor/appointments');
                else
                    navigate('/appointments');
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
                <h2>Login to view your appointments</h2>
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
                <button>Log In</button>
            </div>
            <div>
                <p>Don't have a account ?</p>
                <Link to="/signup">Make one</Link>
            </div>
            {error && <div className="error">Login failed</div>}
        </form>
    </section>
    )
}
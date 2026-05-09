import { useRouteError, isRouteErrorResponse, NavLink } from "react-router";
//import "../styles/ErrorPage.css";

export default function ErrorPage() {
    const error = useRouteError();

    let message: string;

    if (isRouteErrorResponse(error)) 
        message = error.statusText;
    else if (error instanceof Error)
        message = error.message;
    else 
        message = `An unexpected error occurred: ${error?.toString()}`;

    return(
    <section className = "ErrorPage">
        <h2>A error has occurred</h2>
        <p>{message}</p>
        <NavLink className="NavLink" to="/login">Back to Login</NavLink>
    </section>
    )
}
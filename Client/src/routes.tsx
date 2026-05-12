import type { RouteObject } from "react-router";
import Frame from "./Frame";
import ErrorPage from "./routes/ErrorPage";
import Redirect from "./routes/Redirect";
import LoginPage from "./routes/LoginPage";
import SignupPage from "./routes/SignupPage";
import AppointmentPage from "./routes/AppointmentsPage";
import BookAppointmentPage from "./routes/BookAppointmentsPage";
import DoctorAppointmentsPage from "./routes/DoctorAppointmentsPage";

const routes: RouteObject[] = [
    { 
        path: "/",
        element: <Frame/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Redirect/>
            },
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "/signup",
                element: <SignupPage/>
            },
            {
                path: "/appointments",
                element: <AppointmentPage/>
            },
            {
                path: "/appointments/book",
                element: <BookAppointmentPage/>
            },
            {
                path: "/doctor/appointments",
                element: <DoctorAppointmentsPage/>
            }
        ]
    }
]

export default routes;

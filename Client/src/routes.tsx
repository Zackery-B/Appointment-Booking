import type { RouteObject } from "react-router";
import Frame from "./Frame";
import ErrorPage from "./routes/ErrorPage";
import Redirect from "./routes/Redirect";
import LoginPage from "./routes/LoginPage";
import SignupPage from "./routes/SignupPage";

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
            }
        ]
    }
]

export default routes;

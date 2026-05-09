import type { RouteObject } from "react-router";
import Frame from "./Frame";
import ErrorPage from "./routes/ErrorPage";
import LoginPage from "./routes/LoginPage";
import Redirect from "./routes/Redirect";

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
            }
        ]
    }
]

export default routes;

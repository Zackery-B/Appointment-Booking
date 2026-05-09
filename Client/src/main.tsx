import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes";

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

createRoot(document.getElementById('root')!).render(
  //<AuthProvider>
    <StrictMode>
    <RouterProvider router={router} />
    </StrictMode>
  //</AuthProvider>
)

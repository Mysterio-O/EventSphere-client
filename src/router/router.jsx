import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import AddEvent from "../pages/AddEvent/AddEvent";
import PrivateRoute from "../routes/PrivateRoute"
import Events from "../pages/AllEvents/Events";
import MyEvents from "../pages/MyEvents/MyEvents";
import UpdateEvent from "../pages/UpdateEvent/UpdateEvent";
import Page404 from "../pages/Page404";
export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        errorElement: <Page404 />,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/auth/login',
                Component: Login
            },
            {
                path: '/auth/register',
                Component: Register
            },
            {
                path: '/add-event',
                element: <PrivateRoute>
                    <AddEvent />
                </PrivateRoute>
            },
            {
                path: '/events',
                element: <PrivateRoute>
                    <Events />
                </PrivateRoute>
            },
            {
                path: '/my-event',
                element: <PrivateRoute>
                    <MyEvents />
                </PrivateRoute>
            },
            {
                path: '/updateEvent/:id',
                element: <PrivateRoute>
                    <UpdateEvent />
                </PrivateRoute>
            }
        ]
    }
]) 
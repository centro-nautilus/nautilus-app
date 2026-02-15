import { createBrowserRouter, Navigate } from "react-router";
import { NautilusLayout } from "../nautilus/layouts/NautilusLayout";
import { HomePage } from "../nautilus/pages/home/HomePage";
import { BookAppointmentPage } from "../nautilus/pages/bookAppointment/BookAppointmentPage";
import { AuthLayout } from "../auth/layouts/authLayout";
import { LoginPage } from "../auth/pages/login/LoginPage";
import { DoctorLayout } from "../doctor/layout/DoctorLayout";
import { DashboardPage } from "../doctor/pages/home/DashboardPage";
import { AdminLayout } from "../admin/layout/AdminLayout";
import { PanelPage } from "../admin/pages/PanelPage";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { SchedulePage } from "../doctor/pages/schedule/SchedulePage";
import { AgendaPage } from "../doctor/pages/agenda/AgendaPage";

export const appRoutes = createBrowserRouter([
    {
        path: '/',
        element: <NautilusLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'agendar',
                element: <BookAppointmentPage />
            }
        ]
    },
    {
        path: '/auth',
        element: <PublicRoutes>
            <AuthLayout />
        </PublicRoutes>,
        children: [
            {
                index: true,
                element: <LoginPage />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes allowedRole="doctor">
            <DoctorLayout />
        </PrivateRoutes>,
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: 'agenda',
                element: <AgendaPage />
            },
            {
                path: 'schedule',
                element: <SchedulePage />
            }
        ]
    },
    {
        path: '/panel',
        element: <PrivateRoutes allowedRole="admin">
            <AdminLayout />
        </PrivateRoutes>,
        children: [
            {
                index: true,
                element: <PanelPage />
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to='/' />
    }
])
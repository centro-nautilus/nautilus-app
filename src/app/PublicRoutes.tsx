import type { ReactNode } from "react"
import { AuthStore } from "../auth/store/auth.store"
import { Navigate } from "react-router"

export const PublicRoutes = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, role } = AuthStore()
    return (
        isAuthenticated
            ? role === 'admin'
                ? <Navigate to={'/panel'} />
                : role === 'doctor' 
                    ? <Navigate to={'/dashboard'} />
                    : children
            : children
    )
}
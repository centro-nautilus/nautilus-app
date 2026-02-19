
import { Spinner } from "../../../nautilus/components/ui/Spinner"
import { useProfile } from "../../hooks/useProfile"



export const DashboardPage = () => {

    const { profile, isLoading } = useProfile()

    
    if(isLoading) return <Spinner /> 
    if(!profile) return <p>No hay usuario</p>
    return <h1>Bienvenido {profile.doctor[0].name}</h1>
    
}
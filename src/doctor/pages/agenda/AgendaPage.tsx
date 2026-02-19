import { Spinner } from "../../../nautilus/components/ui/Spinner"
import { useProfile } from "../../hooks/useProfile"

export const AgendaPage = () => {
    const { profile, isLoading } = useProfile()
    if(isLoading) return <Spinner /> 
    return <h1>agenda de {profile?.doctor[0].name}</h1>
}
import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../actions/get-users.action"
import { AuthStore } from "../../auth/store/auth.store"

export const PanelPage = () => {
    const { token } = AuthStore()
    const { data = [], error, isLoading } = useQuery({
        queryKey: ['user', token],
        queryFn: getUsers, // No necesitas el async/await extra aquí, getUsers ya devuelve una promesa
        retry: false,
        enabled: !!token
    });


    if (isLoading) return <div>Cargando usuarios...</div>;
    if (error) return <div>Error al cargar usuarios. Por favor inicia sesión de nuevo.</div>;

    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
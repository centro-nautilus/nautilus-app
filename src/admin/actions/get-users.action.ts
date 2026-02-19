import { nautilusApi } from "../../api/nautilus.api"

export const getUsers = async () => {
    const { data } = await nautilusApi.get('/users');
    return data; 
}
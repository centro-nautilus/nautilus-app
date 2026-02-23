import { nautilusApi } from "../../api/nautilus.api";

export const logoutUser = async () => {
    try {
        await nautilusApi.post('/auth/logout')
    } catch (err) {
        console.log(err)
        throw err
    }
}
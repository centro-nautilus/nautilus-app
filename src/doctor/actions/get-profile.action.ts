import { nautilusApi } from "../../api/nautilus.api"

export const getProfile = async () => {
    try {
        const response = await nautilusApi.get('/auth/profile')
        return response.data
    } catch (err) {
        throw err
    }
}
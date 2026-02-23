import { nautilusApi } from "../../api/nautilus.api"

export const getSchedules = async () => {
    try {
        const response = await nautilusApi.get('/schedules')
        return response.data
    } catch (err) {
        throw err
    }
}
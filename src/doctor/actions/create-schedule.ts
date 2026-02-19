import { nautilusApi } from "../../api/nautilus.api"

export const createSchedule = async (payload: { day_of_week: number, start_time: string, end_time: string }) => {
    try {
        const response = await nautilusApi.post('/schedules', payload)
        return response.data
    } catch (err) {
        throw err
    }
}
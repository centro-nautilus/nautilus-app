import { nautilusApi } from "../../api/nautilus.api"

export const getAppointments = async (doctorId: string) => {
    try {
        const response = await nautilusApi.get(`appointments?doctorId=${doctorId}`)
        return response.data
    } catch (err) {
        throw err
    }
}
import { nautilusApi } from "../../api/nautilus.api"

export const ChangeAppointmentStatus = async ({ appointmentId, payload }: { appointmentId: string, payload: { appointment_status: string } }) => {
    try {
        const response = await nautilusApi.patch(`/appointments/${appointmentId}`, payload)
        return response.data
    } catch (err) {
        throw err
    }
}
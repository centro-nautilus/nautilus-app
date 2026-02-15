import { nautilusApi } from "../../api/nautilus.api";


export type AppointmentStatus =
    | "confirmed"
    | "pending"
    | "cancelled"
    | "completed"

export interface UpdateAppointmentParams {
    id: string
    status: AppointmentStatus
}

export const updateAppointmentStatus = async ({ id, status }: UpdateAppointmentParams) => {
 
    try {
        const response = await nautilusApi.patch(`appointments/${id}`, { appointment_status: status })
        return response.data;
    } catch (err) {
        console.log(err)
        throw err
    }
}
import { useState } from "react"
import type { AppointmentSchemaType } from "../schemas/appointment.schemas"
import { registerAppointment } from "../actions/register-appointment"
import toast from "react-hot-toast"

export const useFormSubmit = (id: string) => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (data: AppointmentSchemaType) => {
        try {
            setIsSubmitting(true)
            await registerAppointment(data, id)
            toast.success("Cita agendada!");
        } catch (error) {
            toast.error("Error al agendar");
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        isSubmitting,
        onSubmit
    }
}
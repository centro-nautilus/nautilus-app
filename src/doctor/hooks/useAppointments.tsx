import { useMutation, useQuery } from "@tanstack/react-query";
import { getAppointments } from "../actions/get-appointments.action";
import { ChangeAppointmentStatus } from "../actions/change-appointment-status.action";
import { queryClient } from "../../app/queryClient";
import type { Appointments } from "../interfaces/appointments.interface";
import toast from "react-hot-toast";



export const useAppointments = (doctorId: string) => {

    const { data: appointments, isLoading } = useQuery({
        queryKey: ['appointments', doctorId],
        queryFn: () => getAppointments(doctorId),
        enabled: !!doctorId,
        select: (appointments: Appointments[]) => {
            const grouped: Record<string, Appointments[]> = {}

            appointments
                .filter(a => a.appointment_status !== 'cancelled')
                .sort((a, b) =>
                    new Date(a.appointment_date).getTime() -
                    new Date(b.appointment_date).getTime()
                )
                .forEach(appointment => {
                    const date = appointment.appointment_date.split('T')[0]
                    if (!grouped[date]) grouped[date] = []
                    grouped[date].push(appointment)
                })

            return grouped
        }
    })

    const { mutate } = useMutation({
        mutationFn: ChangeAppointmentStatus,
        onMutate: async ({ appointmentId, payload }) => {
            // 1. Cancelar queries salientes para no sobrescribir el estado optimista
            await queryClient.cancelQueries({ queryKey: ['appointments', doctorId] });

            // 2. Guardar el snapshot de la lista actual
            const previousAppointments = queryClient.getQueryData<Appointments[]>(['appointments', doctorId]);

            // 3. Actualizar el caché de forma optimista
            if (previousAppointments) {
                queryClient.setQueryData(['appointments', doctorId], (old: Appointments[]) => {
                    // Mapeamos el array actual y solo modificamos el que coincide con el ID
                    return old.map((item) =>
                        item.id === appointmentId
                            ? { ...item, ...payload }
                            : item
                    );
                });
            }

            // 4. Retornar el snapshot para revertir si hay error
            return { previousAppointments };
        },
        onError: (_err, _variables, context) => {
            if (context?.previousAppointments) {
                queryClient.setQueryData(['appointments', doctorId], context.previousAppointments);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments', doctorId] });
        },
    });
    const cancelAppointment = (appointmentId: string) => {
        mutate({ appointmentId, payload: { appointment_status: 'cancelled' } })
        toast.success('Se cancelo la cita correctamente', {className: 'py-2', position: 'bottom-right'})
    }

    const confirmAppointment = (appointmentId: string) => {
        mutate({ appointmentId, payload: { appointment_status: 'confirmed' } })
        toast.success('Se confirmo la cita correctamente', {className: 'py-2', position: 'bottom-right'})
    }

    const completeAppointment = (appointmentId: string) => {
        mutate({ appointmentId, payload: { appointment_status: 'completed' } })
        toast.success('Se completo la cita correctamente', {className: 'py-2', position: 'bottom-right'})
    }

    return {
        appointments,
        isLoading,
        cancelAppointment,
        confirmAppointment,
        completeAppointment
    }
}
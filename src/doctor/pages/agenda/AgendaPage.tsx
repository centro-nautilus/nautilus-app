import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { getAppointments, type AppointmentInterface } from "../../actions/get-appointment-action"
import { AuthStore } from "../../../auth/store/auth.store"
import { Spinner } from "../../../nautilus/components/ui/Spinner"
import { Alert } from "../../../nautilus/components/ui/Alert"
import { IoMdClose } from "react-icons/io"
import { MdCheck } from "react-icons/md"
import { updateAppointmentStatus } from "../../actions/update-appointment-status.action"

export const monthName = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export const AgendaPage = () => {
    const { doctor_id } = AuthStore()
    const { data: appointments = {}, isLoading } = useQuery({
        queryKey: ['appointments'],
        queryFn: () => getAppointments(doctor_id!),
        select: (appointments) => {
            const appointmentsNotCancelled = appointments.filter(appointment => appointment.appointment_status !== 'cancelled')
            const appointmentsByDate = appointmentsNotCancelled.reduce<Record<string, AppointmentInterface[]>>((acc, appointment) => {
                const [date] = appointment.appointment_date.split('T');

                if (!acc[date]) acc[date] = [];
                acc[date].push(appointment);

                return acc;
            }, {});

            const sortedDates = Object.keys(appointmentsByDate).sort((a, b) =>
                a.localeCompare(b)
            );

            const sortedAppointmentsByDate = sortedDates.reduce<Record<string, AppointmentInterface[]>>((acc, date) => {
                const sortedAppointments = appointmentsByDate[date].sort(
                    (a, b) =>
                        new Date(a.appointment_date).getTime() -
                        new Date(b.appointment_date).getTime()
                );

                acc[date] = sortedAppointments;
                return acc;
            }, {});

            return sortedAppointmentsByDate;
        }
    })

    const queryClient = useQueryClient()

    const { mutate, isPending, variables } = useMutation({
        mutationFn: updateAppointmentStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'], exact: false })
        }
    })

    const appointmentStatus = { 'completed': 'Completado', 'pending': 'Pendiente', 'cancelled': 'Cancelado', 'confirmed': 'Confirmado' }
    const statusStyles = {
        'pending': 'bg-orange-100 text-orange-600 border border-orange-200 font-semibold',
        'confirmed': 'bg-emerald-100 text-emerald-600 border border-emerald-200 font-semibold',
        'completed': 'bg-blue-100 text-blue-600 border border-blue-200 font-semibold',
        'cancelled': 'bg-red-100 text-red-600 border border-red-200 font-semibold',
    };
    return <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Agenda</h1>
        {isLoading && <Spinner />}
        {!isLoading && !appointments && <Alert variant="warning" message="No hay citas agendadas" />}
        {!isLoading && appointments && <div className="flex flex-col gap-4">
            {
                Object.keys(appointments).map(appointmentDate => {

                    const [year, month, day] = appointmentDate.split('-')

                    return <div key={appointmentDate} className="flex flex-col gap-2">
                        <h2 className="font-bold">{day} de {monthName[+month - 1]}, {year}</h2>
                        <div className="flex flex-col gap-4">
                            {
                                appointments[appointmentDate].map(appointment => {
                                    return <div className="p-4 bg-white flex gap-4 rounded-xl border border-gray-300 " key={appointment.id}>
                                        <span className="border-r pr-4 font-semibold border-gray-300">{appointment.appointment_date.slice(11, 16)}</span>
                                        <div className="flex justify-between flex-1">
                                            <div className="flex flex-col ">
                                                <p className="capitalize text-lg">{appointment.patient.name}
                                                    <span className={`text-xs px-3 mx-2 py rounded-full ${statusStyles[appointment.appointment_status]}`}>
                                                        {appointmentStatus[appointment.appointment_status]}
                                                    </span>
                                                </p>
                                                <div className="flex gap-2 items-center">
                                                    <p className="text-gray-600 text-sm">+56 9 {appointment.phone_number_snapshot}</p>
                                                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                                    <p className="capitalize text-gray-600 text-sm">{appointment.address_snapshot}</p>
                                                </div>
                                                {appointment.comment && <p className="italic text-gray-600 text-sm">"{appointment.comment}"</p>}
                                            </div>
                                            <div className={`flex gap-2 self-start ${appointment.appointment_status === 'completed' && 'hidden'}`}>
                                                <button 
                                                    className={`text-green-500 cursor-pointer hover:bg-green-100 p-1 rounded-md transition-all ${appointment.appointment_status === 'confirmed' && 'hidden'}`}
                                                    onClick={() => mutate({id: appointment.id, status: 'confirmed'})}
                                                ><MdCheck className="size-6" /></button>
                                                <button 
                                                    className="text-red-500 cursor-pointer hover:bg-red-100 p-1 rounded-md transition-all"
                                                    onClick={() => mutate({id: appointment.id, status: 'cancelled'})}
                                                ><IoMdClose className="size-6" /></button>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                })
            }
        </div>}
    </div>
}
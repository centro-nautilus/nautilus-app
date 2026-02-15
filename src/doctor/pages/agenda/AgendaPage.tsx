import { useQuery } from "@tanstack/react-query"

import { getAppointments, type AppointmentInterface } from "../../actions/get-appointment-action"
import { AuthStore } from "../../../auth/store/auth.store"
import { Spinner } from "../../../nautilus/components/ui/Spinner"
import { Alert } from "../../../nautilus/components/ui/Alert"
import { IoMdClose } from "react-icons/io"
import { MdCheck } from "react-icons/md"

export const AgendaPage = () => {
    const { doctor_id } = AuthStore()
    const { data: appointments = {}, isLoading } = useQuery({
        queryKey: ['appointments'],
        queryFn: () => getAppointments(doctor_id!),
        select: (appointments) => {
            const appointmentsByDate = appointments.reduce<Record<string, AppointmentInterface[]>>((acc, appointment) => {
                const [date] = appointment.appointment_date.split('T');

                if (!acc[date]) acc[date] = [];
                acc[date].push(appointment);

                return acc;
            }, {});

            Object.keys(appointmentsByDate).map(appointmentsDate => {
                appointmentsByDate[appointmentsDate].sort((a, b) => {
                    return new Date(a.appointment_date).getTime() - new Date(b.appointment_date).getTime()
                })
            })

            return appointmentsByDate
        }
    })

    return <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Agenda</h1>
        {isLoading && <Spinner />}
        {!isLoading && !appointments && <Alert variant="warning" message="No hay citas agendadas" />}
        {!isLoading && appointments && <div className="flex flex-col gap-4">
            {
                Object.keys(appointments).map(appointmentDate => {
                    const date = new Date(appointmentDate)
                    const day = date.getDate()
                    const month = date.getMonth()
                    const year = date.getFullYear()
                    console.log(['M', 'MA','MIE','J','V','S','D'])
                    return <div key={appointmentDate} className="flex flex-col">
                        <h2 className="font-bold">{day} {month} {year}</h2>
                        <div className="flex flex-col gap-4">
                            {
                                appointments[appointmentDate].map(appointment => {
                                    return <div className="p-4 bg-white flex gap-4 rounded-xl border border-gray-300 " key={appointment.id}>
                                        <span className="border-r pr-4 font-semibold border-gray-300">{appointment.appointment_date.slice(11, 16)}</span>
                                        <div className="flex justify-between flex-1">
                                            <div className="flex flex-col ">
                                                <p className="capitalize text-lg">{appointment.patient.name}</p>
                                                <div className="flex gap-2 items-center">
                                                    <p className="text-gray-600 text-sm">+56 9 {appointment.phone_number_snapshot}</p>
                                                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                                    <p className="capitalize text-gray-600 text-sm">{appointment.address_snapshot}</p>
                                                </div>
                                                {appointment.comment && <p className="italic text-gray-600 text-sm">"{appointment.comment}"</p>}
                                            </div>
                                            <div className="flex gap-2 self-start">
                                                <button className="text-green-500 cursor-pointer hover:bg-green-100 p-1 rounded-md transition-all"><MdCheck className="size-6"/></button>
                                                <button className="text-red-500 cursor-pointer hover:bg-red-100 p-1 rounded-md transition-all"><IoMdClose className="size-6"/></button>
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
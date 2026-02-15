import { FiPhone, FiUser } from "react-icons/fi"
import { MdOutlineLocationOn, MdOutlineSchedule } from "react-icons/md"
import type { AppointmentInterface } from "../actions/get-appointment-action"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAppointmentStatus } from "../actions/update-appointment-status.action"

interface TodayAppointmentProps {
    appointments: AppointmentInterface[]
}

export const TodayAppointment = ({ appointments }: TodayAppointmentProps) => {

    const queryClient = useQueryClient()

    const { mutate, isPending, variables } = useMutation({
        mutationFn: updateAppointmentStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todayAppointments'], exact: false })
        }
    })
    const generarLinkWaze = (address: string) => {
        if (!address) return "#";
        const addressEncoded = encodeURIComponent(address);
        return `https://waze.com/ul?q=${addressEncoded}&navigate=yes`;
    };
    return <div className="flex flex-col gap-4">
        {
            appointments.map(appointment => {
                const isThisPending = isPending && variables?.id === appointment.id
                const linkWaze = generarLinkWaze(appointment.address_snapshot);
                const schedule = String(appointment.appointment_date).slice(11, 16)
                return <div className="flex flex-col gap-4 bg-white border border-gray-200 rounded-xl p-8 ">
                    <div className="flex gap-6 border-b pb-4 border-gray-400">
                        <MdOutlineSchedule className="size-14 p-3 text-[#21B1C4] bg-[#E8F9F9] rounded-full" />
                        <div className="flex flex-col gap-1">
                            <p className="font-bold text-lg">{schedule} hrs</p>
                            <div className="flex flex-col gap text-gray-500">
                                <div className="flex gap-2 items-center">
                                    <FiUser className="size-4" />
                                    <p className="text-black capitalize">{appointment.patient.name}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <FiPhone className="size-4" />
                                    <p>+56 {appointment.phone_number_snapshot[0]} {appointment.phone_number_snapshot.slice(1, 5)} {appointment.phone_number_snapshot.slice(5)}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <MdOutlineLocationOn className="size-4" />
                                    <p className="capitalize">{appointment.address_snapshot}</p>
                                </div>
                                <p className="italic">"{appointment.comment}"</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col md:flex-row">
                        <a
                            href={linkWaze}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1"
                        >
                            <button className="px-4 py-2 bg-[#F5F8FA] flex-1 rounded-xl border border-gray-300 cursor-pointer hover:bg-[#e2e6e9]">
                                Ver en Waze
                            </button>
                        </a>
                        <button
                            disabled={isThisPending}
                            className={`cursor-pointer px-4 py-2 flex-1 rounded-xl text-white 
                                ${isThisPending ? "bg-gray-400 cursor-not-allowed" : "bg-[#2BAB6B] hover:bg-[#289e63]"}
                            `}
                            type="button"
                            onClick={() => mutate({ id: appointment.id, status: 'completed' })}
                        >Completar</button>
                    </div>
                </div>
            })
        }
    </div>
}
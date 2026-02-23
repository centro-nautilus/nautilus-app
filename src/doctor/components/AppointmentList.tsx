import { IoMdClose } from "react-icons/io";
import { MdCheck } from "react-icons/md";
import type { Appointments } from "../interfaces/appointments.interface";
import { useState } from "react";
import { Modal } from "./Modal";

interface AppointmentListProps {
    appointments: Record<string, Appointments[]>
    date: string
    confirmAppointment: (appointmentId: string) => void,
    cancelAppointment: (appointmentId: string) => void
}

export const AppointmentList = ({ appointments, date, confirmAppointment, cancelAppointment }: AppointmentListProps) => {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [appointmentIdSelected, setAppointmentIdSelected] = useState('')

    const buttonStyle: Record<string, string> = {
        'pending': 'bg-orange-200 border border-orange-400 rounded-xl px-2 text-sm  flex items-center text-orange-700 capitalize',
        'confirmed': 'bg-blue-200 border border-blue-400 rounded-xl px-2 text-sm  flex items-center text-blue-700 capitalize',
        'completed': 'bg-green-200 border border-green-400 rounded-xl px-2 text-sm  flex items-center text-green-700 capitalize'
    }
    const statusText: Record<string, string> = {
        pending: 'Pendiente',
        confirmed: 'Aceptada',
        completed: 'Completada'
    }
    return <div className="flex flex-col gap-2">
        {isModalVisible && <Modal appointmentIdSelected={appointmentIdSelected} cancelAppointment={cancelAppointment} setIsModalVisible={setIsModalVisible} />}
        {
            appointments[date].map(appointment => {

                return <div className="p-4 bg-white rounded-md flex flex-col gap-3 md:flex-row md:justify-between border border-gray-200">
                    <div className="flex gap-4">
                        <p className="font-semibold border-r pr-4 border-gray-400">{appointment.appointment_date.slice(11, 16)}</p>
                        <div className="flex flex-col">
                            <div className="flex gap-2 ">
                                <p className="md:hidden">{appointment.patient.name}</p>
                                <p className="hidden md:flex">{appointment.patient.name} - {appointment.patient.rut}</p>
                                <p className={buttonStyle[appointment.appointment_status]}>{statusText[appointment.appointment_status]}</p>
                            </div>
                            <p className="md:hidden">{appointment.patient.rut}</p>
                            <div className="flex flex-col mb-2 md:flex-row md:gap-2 md:items-center">
                                <p className="text-gray-600">+56 {appointment.phone_number_snapshot}</p>
                                <span className="w-1 h-1 rounded-full bg-gray-700 hidden md:flex"></span>
                                <p className="text-gray-600">{appointment.address_snapshot}</p>
                            </div>
                            {appointment.comment && <p className="italic text-gray-600">"{appointment.comment}"</p>}
                        </div>
                    </div>
                    <div className="flex gap-2 md:items-center">

                        <button 
                            className={`
                                ${['completed', 'confirmed'].includes(appointment.appointment_status) && 'hidden'} 
                                bg-green-400 py-2 hover:bg-green-100 hover:text-white  cursor-pointer p-1 flex-1 flex justify-center rounded-md md:items-center md:bg md:bg-white
                            `}
                            onClick={() => confirmAppointment(appointment.id)}
                        >
                            <MdCheck className="text-white font-bold size-4 md:size-5 md:text-green-400" />
                        </button>

                        <button 
                            className={`
                                ${appointment.appointment_status === 'completed' && 'hidden'} 
                                bg-red-400 py-2 hover:bg-red-100 hover:text-white  cursor-pointer p-1 flex-1 flex justify-center rounded-md md:bg-white   
                            `}
                            onClick={() => {
                                setAppointmentIdSelected(appointment.id)
                                setIsModalVisible(true)
                            }}
                        >
                            <IoMdClose className="text-white font-bold size-4 md:size-5 md:text-red-400" />
                        </button>
                    </div>
                </div>
            })
        }
    </div>
}
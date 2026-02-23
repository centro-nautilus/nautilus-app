
import { FiPhone, FiUser } from "react-icons/fi"
import { Spinner } from "../../../nautilus/components/ui/Spinner"
import { useAppointments } from "../../hooks/useAppointments"
import { useProfile } from "../../hooks/useProfile"
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineSchedule } from "react-icons/md";


export const DashboardPage = () => {

    const { profile, isLoading } = useProfile()
    const doctorId = profile?.doctor?.[0]?.id
    const { appointments, isLoading: isAppointmentLoading, completeAppointment } = useAppointments(doctorId || '')
    const today = new Date()
    const todayString = today.toLocaleDateString('sv-SE')
    if (isLoading || isAppointmentLoading) return <Spinner />
    if (!doctorId) return <p>No doctor found</p>
    if (!profile) return <p>No hay usuario</p>
    if (!appointments) return <p>No hay citas</p>

    const appointmentsToday = appointments[todayString]?.filter(appointment => appointment.appointment_status === 'confirmed') || []

    return <div className="flex flex-col gap-4">
        <div className="flex flex-col gap">
            <h1 className="text-2xl font-bold">Tus citas de hoy</h1>
            <p className="font-md text-gray-600">Visualiza las citas pendientes para hoy</p>
        </div>

        {appointmentsToday.length === 0 && <div className="bg-white border-2 border-[#E4EEFA] rounded-md p-4 flex flex-col gap-2 items-center ">
            <MdOutlineSchedule className="size-12 text-[#21B1C4]" />
            <p className="text-center text-lg font-semibold">No tienes citas para hoy</p>
            <p className="text-sm text-center text-gray-600">Puedes revisar tu agenda y aceptar citas de tus pacientes</p>
        </div>}
        <div className="flex flex-col gap-4">
            {
                appointmentsToday.map(appointment => {
                    return <div className="p-4 bg-white border border-gray-200 rounded-md flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold text-lg">{appointment.appointment_date.slice(11, 16)} hrs</p>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <FiUser className="text-gray-600" />
                                    <p>{appointment.patient.name} - {appointment.patient.rut}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiPhone className="text-gray-600" />
                                    <p className="text-gray-600">+56 9 {appointment.phone_number_snapshot}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <SlLocationPin className="text-gray-600" />
                                    <p className="text-gray-600">{appointment.address_snapshot}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2">
                            <button className="bg-[#F5F8FA] flex-1 py-2 rounded-md border border-gray-200 cursor-pointer">Ver en waze</button>
                            <button onClick={() => completeAppointment(appointment.id)} className="bg-[#2BAB6B] text-white flex-1 py-2 rounded-md border border-gray-200 cursor-pointer">Completar</button>
                        </div>
                    </div>
                })
            }
        </div>
    </div>

}
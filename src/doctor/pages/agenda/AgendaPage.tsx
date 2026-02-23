import { Spinner } from "../../../nautilus/components/ui/Spinner"
import { useProfile } from "../../hooks/useProfile"
import { useAppointments } from "../../hooks/useAppointments"
import { FiCalendar } from "react-icons/fi"
import { AppointmentList } from "../../components/AppointmentList"



export const AgendaPage = () => {
    const { profile, isLoading: isProfileLoading } = useProfile()

    const doctorId = profile?.doctor?.[0]?.id
    const { appointments, isLoading: isAppointmentsLoading, confirmAppointment, cancelAppointment } = useAppointments(doctorId || '')
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    if (isProfileLoading) return <Spinner />
    if (!doctorId) return <p>No doctor found</p>
    if (isAppointmentsLoading) return <Spinner />
    if (!appointments) return <p>No hay citas</p>

    const daysOfAppointment = Object.keys(appointments)
    return <div className="flex flex-col gap-4">
        <div className="flex flex-col gap">
            <h1 className="text-2xl font-bold">Agenda</h1>
            <p className="font-md text-gray-600">Gestiona tus citas</p>
        </div>
        {!isAppointmentsLoading && daysOfAppointment.length === 0 && <div className="bg-white border-2 border-[#E4EEFA] rounded-md p-4 flex flex-col gap-2 items-center ">
            <FiCalendar className="size-12 text-[#21B1C4]" />
            <p className="text-center text-lg font-semibold">No tienes citas pendientes</p>
            <p className="text-sm text-center text-gray-600">Espera a que un paciente solicite una cita</p>
        </div>}
     
        {
            daysOfAppointment.map(date => {
                const [year, month, day] = date.split('-')
                return <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <i><FiCalendar className="text-[#21B1C4]" /></i>
                        <h1 className="font-bold">{day} {months[+month - 1]} {year}</h1>
                    </div>
                    <AppointmentList appointments={appointments} date={date} confirmAppointment={confirmAppointment} cancelAppointment={cancelAppointment} />
                </div>
            })
        }
    </div>
}